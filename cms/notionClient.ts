import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionAPI } from "notion-client";

export const notionClient = new Client({
    auth : process.env.NOTION_TOKEN
});

interface DatabaseQueryOption {
  filter? : {
    tagName? : string,

  }
}

export const getDatabaseItems = async (daatabaseId : string, option? : DatabaseQueryOption) => {
  const response = await notionClient.databases.query({
    database_id : daatabaseId,
    // filter : {
    //   property : "공개",
    //   checkbox : {
    //     equals : true,
    //   },
    // },
    filter : {
      and : [
        {
          property : "공개",
          checkbox : {
            equals : true
          },
        },
        {
          property : "태그",
          multi_select : {
            contains : option?.filter?.tagName ?? "",
          }
        }
      ]
    },
    sorts : [
      {
        property : "작성일",
        direction : "descending"
      }
    ]
  });
  return response.results
}

export const getSearchItems =async (query:string) => {
  const response = await notionClient.search({
    query,
    filter : {
      property : "object",
      value : "page"
    },
    sort : {
      direction : "descending",
      timestamp : "last_edited_time"
    }
  })

  return response.results as (PageObjectResponse | PartialPageObjectResponse )[];
}

export const unofficialNotionclient = new NotionAPI();

export const getPageContent = async (pageId : string) => {
  const response = await unofficialNotionclient.getPage(pageId);

  return response;
}


