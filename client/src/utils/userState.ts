import { atom } from "recoil"
import { getUserFromLocalStorage } from "./localStorage"

export const userState = atom({
    key: 'userState',
    default: getUserFromLocalStorage() || {
        kakaoId: null,
        name: null,
        role: null as string | null,
    }
})
