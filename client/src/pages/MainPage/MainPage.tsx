import React, { useState } from 'react'
import { AddPhotoComponent, CalendarComponent, LogoutModalComponent, QrcodeComponent } from '../../components'

import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import AddMemeberComponent from './AddMemeberComponent'
const apiUrl = process.env.REACT_APP_API_URL;



const MainPage = () => {
  const [addMemeber, setAddMember] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)



  const getUserPtCount = async() => {
    try {
      const res = await axios.get(`${apiUrl}/api/chat/pt/${user.objectId}`)

      if(res.data.success){
        setUser((prevState: any) => ({ ...prevState, ptCount: res.data.message }));

      }
      
    } catch (error) {
      console.error(error)
    }
  }
  
  useEffect(() => {
    getUserPtCount()
  },[])


  const handleClick = () => {
    setAddMember(true)
  }

  const closeModal = () => {
    setAddMember(false)
  }
  return (
    <div className='h-full flex flex-col items-center'>
      {user.role === 'trainer' ? (
        <>
          <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}트레이너님</h1>
        <AddPhotoComponent onClick={handleClick} />
        {addMemeber && <AddMemeberComponent closeModal={closeModal}/>}
        </>
      ) : (
        <h1 className='absolute top-[30%] text-xl font-bold'>{user.name}님의 남은 pt횟수 : {user.ptCount}</h1>
      )}
      <QrcodeComponent role={user.role}/>
    </div>
  )
}

export default MainPage
