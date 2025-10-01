import React, { useState } from 'react'
import { QrcodeComponent } from '../../components'

import axios from 'axios'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import AddMemeberComponent from './AddMemeberComponent'
import { StyledPtAddBtn } from './style'
const apiUrl = process.env.REACT_APP_API_URL;



const MainPage = () => {
  const [addMemeber, setAddMember] = useState<boolean>(false)
  const [user, setUser] = useRecoilState(userState)



  const getUserPtCount = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/chat/pt/${user.objectId}`)

      if (res.data.success) {
        setUser((prevState: any) => ({ ...prevState, ptCount: res.data.message }));

      }

    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserPtCount()
  }, [])


  const handleClick = () => {
    setAddMember(true)
  }

  const closeModal = () => {
    setAddMember(false)
  }
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      {user?.role === 'trainer' ? (
        <div className='flex flex-col gap-2 items-center'>
          <h1 className=' text-xl font-bold'>{user.name}트레이너님</h1>
          <QrcodeComponent role={user.role} />
          <StyledPtAddBtn onClick={handleClick}>PT추가</StyledPtAddBtn>
          {addMemeber && <AddMemeberComponent closeModal={closeModal} />}
        </div>
      ) : (
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-xl font-bold'>{user.name}님</h1>
          <h1 className='text-xl font-bold'>남은 pt횟수 : <span className='text-red-700'>{user.ptCount}</span></h1>
          <QrcodeComponent role={user.role} />
        </div>
      )}
    </div>
  )
}

export default MainPage
