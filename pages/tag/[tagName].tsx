import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react'
import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import { getAllTags } from '@/utils/getAllTags';
import { ParseDatabaseItemsType, parseDatabaseItems } from '@/utils/parseDatabaseItems';

interface TagPageProps {
  databaseItmes : ParseDatabaseItemsType[]
}
const TagePage = ({databaseItmes}:TagPageProps) => {
  return (
    <div>TagName</div>
  )
}

export default TagePage;

interface TagPageParams extends ParsedUrlQuery {
  tagName : string
}

export const getStaticProps : GetStaticProps<TagPageProps,TagPageParams> = async ({params}) => {
  const {tagName} = params!;
  if(!process.env.DATABASE_ID) throw new Error('DATABASE_ID is not undifibed');
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID,{
    filter  : {
      tagName : tagName[0].toUpperCase() + tagName.slice(1),
    }
  });

  const parsedDatabaseItems = parseDatabaseItems(databaseItems)

  return {
    props : {
      databaseItmes : parsedDatabaseItems
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