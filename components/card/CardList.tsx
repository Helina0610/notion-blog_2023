import React from 'react'
import CardItem from './CardItem';
import { ParseDatabaseItemsType  } from '@/utils/parseDatabaseItems';


interface CardListProps {
	cardItems : ParseDatabaseItemsType[]
}
export const CardList = ({cardItems} : CardListProps) => {
  return (
    <ul className='flex flex-col gap-8'>
			{
				cardItems.map((cardItem) => (
					<CardItem key={cardItem.id} cardItem={cardItem} />
				))
			}
		</ul>
  )
}

export default CardList;