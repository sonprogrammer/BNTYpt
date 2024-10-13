import { atom } from "recoil"
import { getUserFromLocalStorage } from "./localStorage"

const defaultUser = getUserFromLocalStorage()

export const userState = atom({
    key: 'userState',
    default: defaultUser && defaultUser.token ? defaultUser :{
        kakaoId: null,
        id: null,
        email: null,
        name: null,
        role: null as string | null,
        token: null as string | null, 
        objectId: null as string | null,  // objectId 필드 추가
        _id: null as string | null 
    }
})
