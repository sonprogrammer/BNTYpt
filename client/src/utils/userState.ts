import { atom, selector } from "recoil"
import { getUserFromLocalStorage } from "./localStorage"
import { getAccessToken } from "./accessToken"

const defaultUser = getUserFromLocalStorage()
const accessToken = getAccessToken()


export const userState = atom({
    key: 'userState',
    default: defaultUser && accessToken ? defaultUser :{
        kakaoId: null,
        id: null,
        email: null,
        name: null,
        role: null as string | null,
        token: null as string | null, 
        objectId: null as string | null, 
        _id: null as string | null ,
        ptCount: null as number | null
    }
})

export const userRoleSelector = selector<string | null>({
    key: "userRoleSelector",
    get: ({ get }) => {
      const user = get(userState);
      return user.role;
    },
  });