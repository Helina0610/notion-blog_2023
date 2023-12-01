import { getPageContent } from '@/cms/notionClient'
import { PageHead } from '@/components/layout/PageHead';
import NotionPageRenderer from '@/components/notion/NotionPageRenderer';
import { GetStaticProps } from 'next'
import { ExtendedRecordMap } from 'notion-types'
import React from 'react'

interface AboutPageProps {
  recordMap : ExtendedRecordMap;
}

const AboutPage = ({recordMap} : AboutPageProps) => {
  return (
    <div>
      <PageHead  title='About'/>
      <NotionPageRenderer recordMap={recordMap}/>
    </div>
  )
}

export default AboutPage

export const getStaticProps : GetStaticProps =async () => {
  const profileId = process.env.PROFILE_ID;

  if(!profileId) throw new Error("PROFILE_ID is not defined");

  const recordMap = await getPageContent(profileId);

  return {
    props : {
      recordMap
    },
    revalidate : 300
  }
}