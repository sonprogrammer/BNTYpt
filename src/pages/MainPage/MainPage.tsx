import React, { useState } from 'react'
import { CalendarComponent, QrcodeComponent } from '../../components'



const MainPage = () => {
  return (
    <div className='h-full flex flex-col items-center'>
      <QrcodeComponent />
    </div>
  )
}

export default MainPage
