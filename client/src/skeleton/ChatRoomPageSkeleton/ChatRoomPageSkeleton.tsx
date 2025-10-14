import { Avatar, Skeleton } from '@mui/material'
import React from 'react'

const ChatRoomPageSkeleton = () => {
  return (
    <div className='p-5 w-full flex flex-col gap-3'>
      <div className='flex w-full gap-3'>

        <Skeleton variant="circular" width={80} height={80}>
          <Avatar />
        </Skeleton>
        <Skeleton sx={{ flex: '1' }} />
      </div>
      <div className='flex w-full gap-3'>
        <Skeleton sx={{ flex: '1' }} />
        <Skeleton variant="circular" width={80} height={80}>
          <Avatar />
        </Skeleton>
      </div>
    </div>
  )
}

export default ChatRoomPageSkeleton
