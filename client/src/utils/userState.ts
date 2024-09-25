import { atom } from "recoil"
import { getUserFromLocalStorage } from "./localStorage"

// export const userState = atom({
//     key: 'userState',
//     default:  {
//         kakaoId: null,
//         email: null,
//         name: null,
//         role: null as string | null,
//         token: null as string | null,
//     }
// })
export const userState = atom({
    key: 'userState',
    default: getUserFromLocalStorage() || {
        kakaoId: null,
        email: null,
        name: null,
        role: null as string | null,
        token: null as string | null,
    }
})
