import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { accessTokenState } from '../state/userState'
import socket from '../socket'



export function SocketConnection() {
  const accessToken = useRecoilValue(accessTokenState)
  useEffect(() => {
    if (!accessToken) {
      socket.disconnect()
      socket.auth = {}
      return
    }
    socket.auth = { token: accessToken }
    socket.connect()
    return () => {
      socket.disconnect()
    }
  }, [accessToken])
  return null
}