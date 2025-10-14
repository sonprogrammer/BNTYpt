import { Skeleton } from '@mui/material'
import React from 'react'

const NotePageSkeleton = () => {
  return (
    <div className='p-5 grid grid-cols-3 gap-5'>
      <Skeleton variant='rectangular' height={300}/>
      <Skeleton variant='rectangular' height={300}/>
      <Skeleton variant='rectangular' height={300}/>
      <Skeleton variant='rectangular' height={300}/>
      <Skeleton variant='rectangular' height={300}/>
      <Skeleton variant='rectangular' height={300}/>
    </div>
  )
}

export default NotePageSkeleton
