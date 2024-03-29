import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const LoadingSpinner = () => {
  return (
    <span className='animate-spin'>
      <AiOutlineLoading3Quarters size={'4rem'} color='gray'/>
    </span>
  )
}

export default LoadingSpinner
