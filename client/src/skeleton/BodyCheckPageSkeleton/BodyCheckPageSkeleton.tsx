import { Skeleton } from '@mui/material'


const BodyCheckPageSkeleton = () => {
  return (
    <div className='grid grid-cols-3 w-full gap-5 h-full p-5'>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
        <Skeleton variant='rounded' sx={{borderRadius: '16px'}} height={300}/>
    </div>
  )
}

export default BodyCheckPageSkeleton
