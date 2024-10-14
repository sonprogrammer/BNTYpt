import React, { useState } from 'react'
import { AddPhotoComponent, CalendarComponent, LogoutModalComponent, QrcodeComponent } from '../../components'

import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import AddMemeberComponent from './AddMemeberComponent'



const MainPage = () => {
  const [addMemeber, setAddMember] = useState<boolean>(false)
  const [user] = useRecoilState(userState)
  
  
  const handleClick = () => {
    setAddMember(true)
  }
  return (
    <div className='h-full flex flex-col items-center'>
      {user.role === 'trainer' ? (
        <>
          <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}트레이너님</h1>
        <AddPhotoComponent onClick={handleClick} />
        {addMemeber && <AddMemeberComponent />}
        </>
      ) : (
        <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}님의 남은 pt횟수</h1>
      )}
      <QrcodeComponent role={user.role}/>
    </div>
  )
}

export default MainPage
