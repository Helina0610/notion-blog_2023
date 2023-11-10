import exp from 'constants'
import React from 'react'
import { ParsedDatabaseItemType  } from '@/utils/parseDatabaseItems';
import Link from 'next/link';
import Image from 'next/image';
import { describe } from 'node:test';
import IconRenderer from './IconRenderer';
import TagList from './tag/TagList';
import { DEFAULT_BLUR_BASE64 } from '@/const/const';

interface CardItemProps {
	cardItem : ParsedDatabaseItemType
}

export const CardItem = ({cardItem} : CardItemProps) => {
	const {cover,decsription,icon,id,published, tags,title, previewImage} = cardItem
  return (
    <li className='rounded-3xl overflow-hidden shadow-lg group flex  flex-col'>
        <Link href={`blog/${id}`}>
					<a className=' flex-grow'>
						<div className='relative aspect-[1.3/1]'>
							<Image src={cover} alt={title} layout='fill' className=' group-hover:scale-105 translate-transform' placeholder='blur' blurDataURL={previewImage?.dataURIBase64 ?? DEFAULT_BLUR_BASE64}/>
						</div>
						<div className='p-6 flext flex-col gap-4 '>
							<h4 className='font-bold text-2xl group-hover:text-blue-600 transition-colors flex flex-row items-center gap-1'>
								<IconRenderer icon={icon} alt={title}/>
								{title}
							</h4>
							{ decsription ? (<p className='font-medium text-gray-600'>{decsription}</p>) : null}
							<time className='font-medium text-gray-700'>{published}</time>
						</div>
					</a>
				</Link>
        { tags.length > 0 ? <TagList tags={tags}/> : null}
    </li>
  )
}
export default CardItem;