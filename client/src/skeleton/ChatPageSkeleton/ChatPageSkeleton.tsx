import { Skeleton } from '@mui/material'
import React from 'react'

const ChatPageSkeleton = () => {
  return (
    <div className='flex flex-col gap-2 p-5'>
      <Skeleton variant='rectangular' height={120}/>
      <Skeleton variant='rectangular' height={120}/>
      <Skeleton variant='rectangular' height={120}/>
      <Skeleton variant='rectangular' height={120}/>
      <Skeleton variant='rectangular' height={120}/>
    </div>
  )
}

export default ChatPageSkeleton
