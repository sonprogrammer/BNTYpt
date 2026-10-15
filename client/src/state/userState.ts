import { atom, selector } from "recoil"
interface UserState {
  kakaoId?: string 
  objectId: string | null
  email?: string
  name: string | null
  role: string | null
  ptCount: number | null
}

export const userState = atom<UserState>({
    key: 'userState',
    default: {
        kakaoId: undefined, 
        email: undefined,
        name: null,
        role: null ,
        objectId: null,
        ptCount: null
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