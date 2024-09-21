import React, { useState } from 'react'
import { CalendarComponent, LogoutModalComponent, QrcodeComponent } from '../../components'
import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'



const MainPage = () => {
  const [user] = useRecoilState(userState)
  console.log('user', user)
  

  return (
    <div className='h-full flex flex-col items-center'>
      <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}님의 남은 pt횟수</h1>
      <QrcodeComponent />
    </div>
  )
}

export default MainPage
