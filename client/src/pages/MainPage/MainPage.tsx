import React, { useState } from 'react'
import { AddPhotoComponent, CalendarComponent, LogoutModalComponent, QrcodeComponent } from '../../components'

import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'



const MainPage = () => {
  const [user] = useRecoilState(userState)
  console.log('user', user)



  
  
  return (
    <div className='h-full flex flex-col items-center'>
      {user.role === 'trainer' ? (
        <>
          <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}트레이너님</h1>
        </>
      ) : (
        <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}님의 남은 pt횟수</h1>
      )}
      <QrcodeComponent role={user.role}/>
    </div>
  )
}

export default MainPage
