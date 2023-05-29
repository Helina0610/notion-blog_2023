import { getDatabaseItems } from '@/cms/notionClient';
import { GetStaticProps } from 'next';
import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index;

export const getStaticProps : GetStaticProps = async () => {
  if(!process.env.DATABASE_ID) throw new Error('DATABASE_ID is not undifibed');
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID)
  // console.log("databaseItems :>>",databaseItems)
  return{
    props : {}
  }
}