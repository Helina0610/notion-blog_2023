import { getDatabaseItems } from '@/cms/notionClient';
import CardSection from '@/components/intro/CardSection';
import { HeroSection } from '@/components/intro/HeroSection';
import { ParseDatabaseItemsType, parseDatabaseItems  } from '@/utils/parseDatabaseItems';
import { GetStaticProps } from 'next';
import React from 'react'

interface HomeProps {
  databaseItems : ParseDatabaseItemsType[]
}

const Home = ({databaseItems}:HomeProps) => {
  return (
    <div>
        <HeroSection/>
        <CardSection cardItems={databaseItems}/>
    </div>
  )
}

export default Home;

export const getStaticProps : GetStaticProps<HomeProps> = async () => {
  if(!process.env.DATABASE_ID) throw new Error('DATABASE_ID is not undifibed');
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID)
  
  const parseDataes = parseDatabaseItems(databaseItems)
  console.log("parseDataes :>>",parseDataes)
  const parseDatabaseItemJSON = JSON.parse(JSON.stringify(parseDataes))
  return{
    props : {
      databaseItems : parseDatabaseItemJSON
    }
  }
}