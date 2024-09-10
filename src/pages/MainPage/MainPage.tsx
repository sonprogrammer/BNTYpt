import React, { useState } from 'react'
import { CalendarComponent, LogoutModalComponent, QrcodeComponent } from '../../components'



const MainPage = () => {
  return (
    <div className='h-full flex flex-col items-center'>
      <h1 className='absolute top-[30%] text-xl font-bold'>user님의 남은 pt횟수</h1>
      <QrcodeComponent />
    </div>
  )
}

export default MainPage
