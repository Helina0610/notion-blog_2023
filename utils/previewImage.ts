import axios from "axios";
import got from "got";
import lqip from "lqip-modern";
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from "notion-types";
import { ParsedDatabaseItemType } from "./parseDatabaseItems";
import { getPageImageUrls } from "notion-utils";
import { defaultMapImageUrl } from "react-notion-x";

//got 13버전으로 다시 해보기
export const makePreviewImage =async (url:string) => {

  const buffer = await axios.get(url, {
    responseType : "arraybuffer",
  });
  const bufferBody = Buffer.from(buffer.data , "binary");

  //lqip 가 가능한 파일확장자가 제한되어 있음 => try/catch 사용
  try {
    const {metadata : {dataURIBase64, originalHeight, originalWidth}} = await lqip(bufferBody);

    const result : PreviewImage = {
      dataURIBase64,
      originalHeight,
      originalWidth,
    }
    return result;

  } catch (error) {
    return null;
  }

};

export type MakePreviewImage = Awaited<ReturnType<typeof makePreviewImage>>

//Promise.all 공부 
export const insertPreviewImage =async (databaseItems:ParsedDatabaseItemType[]) => {
  const previewImage = Promise.all(databaseItems.map(async(item) => {
    const {cover} = item;

    const previewImage = await makePreviewImage(cover);

    return {
      ...item,
      previewImage
    }
  }));

  return previewImage; 
}

export const insertPreviewImageToRecordMap =async (recordMap:ExtendedRecordMap) : Promise<PreviewImageMap> => {
  const urls = getPageImageUrls(recordMap, {
    mapImageUrl : defaultMapImageUrl
  });

  const PreviewImageMap = await Promise.all(
    urls.map(async (url) => [url, await makePreviewImage(url)])
  );

  return Object.fromEntries(PreviewImageMap);
}