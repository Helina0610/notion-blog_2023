import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import { getDatabaseItems } from "@/cms/notionClient";
import { getAllTags } from '@/utils/getAllTags';
import { parseDatabaseItems , ParsedDatabaseItemType } from '@/utils/parseDatabaseItems';
import TagHeroSection from '@/components/tags/TagHeroSection';
import CardSection from "@/components/intro/CardSection";
import { ITEMS_PER_PAGE } from '@/const/const';

export interface TagPageProps {
  databaseItems : ParsedDatabaseItemType[],
  tagName : string,
  totalLength : number,
}
const TagPage = ({databaseItems, tagName , totalLength }:TagPageProps) => {
  return (
    <div>
      <TagHeroSection title={`#${tagName}`}/>
      <CardSection cardItems={databaseItems} totalLength={totalLength} />

    </div>
  );
};

export default TagPage;

interface TagPageParams extends ParsedUrlQuery {
  tagName : string;
  page : string;
}

export const getStaticProps : GetStaticProps< TagPageProps, TagPageParams > =async ({params}) => {
  const {tagName, page} = params!;
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  if(!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID,{
    filter : {
      tagName : pascalTagName,
    },
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(
    (parseInt(page) - 1) * ITEMS_PER_PAGE,
    parseInt(page) * ITEMS_PER_PAGE
  ));

  return {
    props : {
      databaseItems : parsedDatabaseItems,
      tagName : pascalTagName,
      totalLength : databaseItems.length
    }
  }
}



export const getStaticPaths : GetStaticPaths =async () => {
  if(!process.env.DATABASE_ID) throw new Error('DATABASE_ID is not undifibed');
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);
  const tags = getAllTags(databaseItems);
  const paths = tags.map(({ name: tagName }) => ({
    params: {
      tagName: tagName.toLowerCase(),
    },
  }));

  return {
    paths,
    fallback : "blocking"
  }
}