import React from 'react'
import CardItem from './CardItem';
import { ParseDatabaseItemsType  } from '@/utils/parseDatabaseItems';


interface CardListProps {
	cardItems : ParseDatabaseItemsType[]
}
export const CardList = ({cardItems} : CardListProps) => {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
			{
				cardItems.map((cardItem) => (
					<CardItem key={cardItem.id} cardItem={cardItem} />
				))
			}
		</ul>
  )
}

export default CardList;