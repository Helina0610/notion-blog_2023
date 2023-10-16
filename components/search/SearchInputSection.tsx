import { useRouter } from 'next/router'
import React, { useState , useEffect} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export const SearchInputSection = () => {
  const [value,setValue] = useState('');
  const {push , query} = useRouter();
  const searchQuery= query.query?.toString();
  const onsubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 페이지 이동 막음

    const trimmedValue = value.trim(); //공백있으면 안됨, 띄어쓰기
    if(!trimmedValue) return;

    push(`/search?query=${trimmedValue}`); //페이지 이동
  };

  useEffect(()=>{
    setValue(searchQuery ?? "");
  },[searchQuery])

  return (
    <div>
      <section className='bg-black'>
        <div className='w-4/5 max-w-5xl mx-auto py-16'>
          <form className='relative' onSubmit={onsubmit}>
            <input type='text' className='w-full outline-none p-2 text-xl rounded-xl ' onChange={(e)=>setValue(e.target.value)} value={value}></input>
            <button type='submit' className='absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-200 rounded-xl'>
              <AiOutlineSearch size={"1.5rem"} color='gray'/>
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
