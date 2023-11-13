import { getDatabaseItems, getPageContent } from "@/cms/notionClient";
import NotionPageRenderer from "@/components/notion/NotionPageRenderer";
import { insertPreviewImageToRecordMap } from "@/utils/previewImage";
import { GetStaticPaths, GetStaticProps } from "next";
import { ExtendedRecordMap } from "notion-types";
import { ParsedUrlQuery } from "querystring";

interface DetailBlogPageProps {
  recordMap : ExtendedRecordMap;
}

const DetailBlogPage = ({recordMap}: DetailBlogPageProps) => {
  return (
    <div>
      <NotionPageRenderer recordMap={recordMap} />
    </div>
  )
}

export default DetailBlogPage;

interface DetailBlogPageParams extends ParsedUrlQuery{
  pageId : string;
}

export const getStaticProps : GetStaticProps<  DetailBlogPageProps,   DetailBlogPageParams  > = async ({params}) => {
  const {pageId} = params!;
  const recordMap = await getPageContent(pageId);
  const previewImage = await insertPreviewImageToRecordMap(recordMap);
  return {
    props : {
      recordMap : {
        ...recordMap,
        preview_images : previewImage,
      }
    },
    revalidate : 300 //생명수명 유저가 나간 뒤 5분을 세고 5분동안 다른 유저가 들어오면 새롭게 빌드한 페이지 보여줌 
  }
}



export const getStaticPaths : GetStaticPaths =async () => {
  if(!process.env.DATABASE_ID) throw new Error('DATABASE_ID is not undifibed');
  const databaseItems = await getDatabaseItems(process.env.DATABASE_ID);

  const paths = databaseItems.map(({ id: pageId }) => ({
    params: {
      pageId,
    },
  }));

  return {
    paths,
    fallback : "blocking"
  }
}


