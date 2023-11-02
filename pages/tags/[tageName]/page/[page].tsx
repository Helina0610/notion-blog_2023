import React from 'react'
import TagPage, { TagPageProps } from '..'
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getDatabaseItems } from '@/cms/notionClient';
import { parseDatabaseItems } from '@/utils/parseDatabaseItems';
import { ITEMS_PER_PAGE } from '@/const/const';
import { getAllTags } from '@/utils/getAllTags';



export const TageWithPage = ({databaseItems, tagName , totalLength} : TagPageProps) => {
  return (
    <TagPage databaseItems={databaseItems} tagName={tagName} totalLength={totalLength}/>
  )
}

interface TagPageParams extends ParsedUrlQuery {
  tagName : string;
  page : string;
}

export const getStaticProps : GetStaticProps< TagPageProps, TagPageParams > =async ({params}) => {
  const {tagName} = params!;
  const pascalTagName = tagName[0].toUpperCase() + tagName.slice(1);

  if(!process.env.DATABASE_ID) throw new Error("DATABASE_ID is not defined");
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID,{
    filter : {
      tagName : pascalTagName,
    },
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems.slice(0,ITEMS_PER_PAGE));

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

  const pagesBytag = tags.reduce<Record<string,number>>((acc, cur) => {
    return acc;
  }, {})
  return {
    paths : [],
    fallback : "blocking",
  };
}