import { atom, selector } from "recoil"
import { getUserFromLocalStorage } from "../utils/localStorage"

const defaultUser = getUserFromLocalStorage()


export const userState = atom({
    key: 'userState',
    default: defaultUser ??{
        kakaoId: null,
        id: null,
        email: null,
        name: null,
        role: null as string | null,
        objectId: null as string | null, 
        _id: null as string | null ,
        ptCount: null as number | null
    }
})

export const accessTokenState = atom<string | null>({
    key: 'accessTokenState',
    default: null
})

export const userRoleSelector = selector<string | null>({
    key: "userRoleSelector",
    get: ({ get }) => {
      const user = get(userState);
      return user.role;
    },
  });