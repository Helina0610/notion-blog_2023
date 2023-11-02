import React from 'react'
import { CardList } from '../card/CardList'
import { ParsedDatabaseItemType  } from '@/utils/parseDatabaseItems';
import { Pagination } from '../common/Pagination';
import { ITEMS_PER_PAGE } from '@/const/const';


interface CardSectionProps {
	cardItems : ParsedDatabaseItemType[];
}

export const CardSection = ({cardItems} : CardSectionProps) => {
  return (
    <section>
			<div className='max-w-5xl -w-4/5 mx-auto flex flex-col gap-6 py-8'>
				<h3 className='font-bold text-3xl'>Post</h3>

				<CardList cardItems={cardItems}/>
        <Pagination totalPage={Math.ceil(cardItems.length / ITEMS_PER_PAGE) }/>
			</div>
    </section>
  )
}

export default CardSection;
