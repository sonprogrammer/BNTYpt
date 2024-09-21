import { atom } from "recoil"

export const userState = atom({
    key: 'userState',
    default: {
        kakaoId: null,
        name: null,
        role: null as string | null,
    }
})
