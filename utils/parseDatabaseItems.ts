import { getDatabaseItems } from "@/cms/notionClient";
import {PageObjectResponse , MultiSelectPropertyItemObjectResponse} from "@notionhq/client/build/src/api-endpoints"

export interface ParsedDatabaseItemType {
    id : string;
    cover : string;
    icon : PageObjectResponse['icon'];
    tags : MultiSelectPropertyItemObjectResponse['multi_select']
    published : string;
    decsription : string;
    title : string;
}

// getDatabaseItems 함수의 리턴값이 response.result 이므로
//ReturnType<typeof getDatabaseItems>  : 함수(getDatabaseItems)를 타입으로 바꿔줌
//Awaited<ReturnType<typeof getDatabaseItems>> : getDatabaseItems 는 promise 를 가지고 있음,
// databaseItems 는 promise 의 결과값을 가져옴 -> promise 를 벗겨줘야 함
export const parseDatabaseItems = (items : Awaited<ReturnType<typeof getDatabaseItems>>) => {
    const parseItems = items.reduce<ParsedDatabaseItemType[]>((acc, item) => {
        //items 는 Array<PageObjectResponse | PartialPageObjectResponse>; 
        // PartialPageObjectResponse 는 Object, id 만 가지고 있음 
        // item에 properties 가 없으면 PartialPageObjectResponse 타입이므로 타입가드 해줘야함
        if(!('properties' in item)) return acc; //acc 스킵
        const {id, icon, cover} = item;
  
        const {태그, 작성일, 설명, 이름} = item.properties

        const parsedCover = cover?.type === "file" ? cover.file.url : cover?.external.url ?? ""
        // cover?.type === "external" ? cover.external.url : ""
        // ?? "" null 일 경우
        console.log(item.properties)
        const published = (작성일.type === "date" ? 작성일.date?.start : "" ) ?? "";

        const decsription = (설명.type === "rich_text" ? 설명.rich_text[0]?.plain_text : "") ?? "";
        
        const title = (이름.type === "title" ? 이름.title[0]?.plain_text : "") ?? "";

        const tags = 태그.type === "multi_select" ? 태그.multi_select : [];

        const parseResult:ParsedDatabaseItemType = {
            id,
            icon,
            cover : parsedCover,
            published,
            decsription,
            title,
            tags,        
        };
        //새로운 배열을 만들어서 넘겨준다
        return [
            ...acc //새로운 배열
            , parseResult 
        ]
    } , []);
    return parseItems;
}

// recode<string, number>
// const recode = {
//    string : 1,
//}