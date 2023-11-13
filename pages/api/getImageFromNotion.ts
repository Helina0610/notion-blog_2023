import { getPageItem } from "@/cms/notionClient";
import { parseDatabaseItems } from "@/utils/parseDatabaseItems";
import axios from "axios";
import got from "got";
import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, pageId } = req.query;

  if (!type) throw new Error("type is required");
  if (!pageId) throw new Error("pageId is required");

  const pageItem = await getPageItem(pageId.toString());

  const parsedPageItem = parseDatabaseItems([pageItem])[0];

  const { cover, icon } = parsedPageItem;

  let url = "";

  switch (type) {
    case "cover":
      url = cover;
      break;

    case "icon":
      if (icon?.type === "emoji") {
        url = "";
        break;
      }
      url = (icon?.type === "file" ? icon.file.url : icon?.external.url) ?? "";
      break;
  }

  const content = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const bufferBody = Buffer.from(content.data , "binary");

  const contentHeader = content.headers["content-type"];
  if (!contentHeader) throw new Error("content header is not exist");

  res.setHeader("Content-Type", contentHeader);
  res.send(bufferBody);
}