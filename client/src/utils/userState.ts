import { atom } from "recoil"
import { getUserFromLocalStorage } from "./localStorage"

const defaultUser = getUserFromLocalStorage()

export const userState = atom({
    key: 'userState',
    default: defaultUser && defaultUser.token ? defaultUser :{
        kakaoId: null,
        email: null,
        name: null,
        role: null as string | null,
        token: null as string | null, 
    }
})
