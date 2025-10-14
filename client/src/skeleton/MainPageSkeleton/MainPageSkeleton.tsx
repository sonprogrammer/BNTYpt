import React from 'react'
import { Skeleton, Stack } from '@mui/material';

const MainPageSkeleton = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <Stack spacing={1} padding={2} alignItems={'center'} height={'full'} >
        <Skeleton variant="text" width={'80%'} height={50}/>
        <Skeleton variant="text" width={'80%'} height={'50px'}/> 
        <Skeleton variant="rectangular" height={300} width={300} /> 
        <Skeleton variant="rounded" height={40} width={300} /> 
      </Stack>
    </div>
  )
}

export default MainPageSkeleton
