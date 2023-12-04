import Head from 'next/head'
import { useRouter } from 'next/router';
import React from 'react'

const DEFAULT_TITLE = "HJ Blog";
const DEFAULT_DESCRIPTION = "Notion API Blog";
const DEFAULT_KEYWORDS =  "Nextjs, Notion, Blog, Typescript, React, Tailwindcss, Notion API, Notion API Blog, swr, pretendard";
const DEFAULT_IMAGE = `/api/og?title=${DEFAULT_TITLE}`;
const DEFAULT_AUTHOR = "HJ";
const DEFAULT_URL = "https://notion-blog-eight-nu-90.vercel.app";

interface PageHeadProps {
  title? : string;
  description? : string;
  keywords? : string;
  image? : string;
}

//Partial<type> </type> => 인터페이스의 모든 파라미터가 ? 일 때 사용

export const PageHead = ({title, description, keywords, image} : PageHeadProps) => {

  const { asPath } = useRouter(); 
  

  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
  const pageDescription = description ?? DEFAULT_DESCRIPTION;
  const pageKeywords = keywords ? `${keywords}, ${DEFAULT_KEYWORDS}` : DEFAULT_KEYWORDS;
  const pageImage = `${process.env.SITE_URL ?? DEFAULT_URL}${image ?? DEFAULT_IMAGE }`;
  const pageUrl = `${process.env.SITE_URL ?? DEFAULT_URL}${asPath}`;


  //메타 사용시 큰 따옴표로 해, 작은따음표는 인식 못함
  return (
   <Head>
    <title>{pageTitle}</title>
    <meta name='description' content={pageDescription} />
    <meta name='keywords' content={pageKeywords} />
    <meta name='author' content={DEFAULT_AUTHOR} />
    {/* canonical */}
    <link rel="canonical" href={pageUrl} />

    {/* og tags*/}
    
    <meta property="og:type" content="website" />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={pageImage} />
    <meta property="og:image:alt" content={pageTitle} />
    <meta property="og:url" content={pageUrl} />
    <meta property="og:site_name" content={pageTitle} />

    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/*twiter tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={DEFAULT_AUTHOR} />
    <meta name="twitter:creator" content={DEFAULT_AUTHOR} />
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content={pageImage} />
    <meta name="twitter:image:alt" content={pageTitle} />



   </Head>
  )
}
