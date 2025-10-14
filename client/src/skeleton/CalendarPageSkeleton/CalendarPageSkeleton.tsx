import { Skeleton } from '@mui/material'


const CalendarPageSkeleton = () => {
  return (
    <div className='flex flex-col items-center p-5'>
      <Skeleton variant='text' height={80} width={300} sx={{marginBottom: '12px'}}/>
      <Skeleton variant='rectangular' height={'300px'} width={300}/>
    </div>
  )
}

export default CalendarPageSkeleton
