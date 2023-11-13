import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import Image from 'next/image';
import React from 'react'

interface IconRendererProps {
	icon : PageObjectResponse['icon'],
	// icon : ParseDatabaseItemType['icon']
  alt : string;
  proxyIconUrl? : string,
}
export const IconRenderer = ({icon, alt ,proxyIconUrl} : IconRendererProps) => {
	if(!icon) return null;
	
	if(icon.type === "emoji") return <span>{icon.emoji}</span>

	const iconURL = icon.type === "file" ? icon.file.url : icon.external.url
  return (
    <Image src={ proxyIconUrl ??iconURL} alt={`${alt} icon`} width={28} height={28} className=' rounded-full' />
  )
}

export default IconRenderer;
