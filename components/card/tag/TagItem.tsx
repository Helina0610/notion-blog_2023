import { COLOR_TABLE } from '@/const/const';
import { ParsedDatabaseItemType } from '@/utils/parseDatabaseItems'
import Link from 'next/link';
import React from 'react'

interface TagItemPros {
  tagItem : ParsedDatabaseItemType['tags'][number]
  //배열의 아이템을 가져올 땐 [number]
}

const TagItem = ({tagItem} : TagItemPros) => {
  const {name, color} = tagItem;
  return (
    <li>
      <Link href={`/tags/${name.toLocaleLowerCase()}`}>
        <a className=' hover:underline px-2 py-1 rounded-full font-light' style={{backgroundColor : COLOR_TABLE[color]}}>{name}</a>
      </Link>
    </li>
  )
}

export default TagItem