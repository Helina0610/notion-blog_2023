import { SearchInputSection } from '@/components/search/SearchInputSection';
import SearchResultSection from '@/components/search/SearchResultSection';
import React from 'react'
//클라이언트사이드
const Search = () => {
  return (
    <div>
      <SearchInputSection/>
      <SearchResultSection/>
    </div>
  )
}

export default Search;