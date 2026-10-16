import type { ReactNode } from "react"
import { useRecoilValue } from "recoil"
import { BeatLoader } from "react-spinners"
import { useAxiosInterceptor } from "../../hooks/useAxiosInterceptor"
import { isAuthLoadingState } from "../../state/userState"

export const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  useAxiosInterceptor()
  const isAuthLoading = useRecoilValue(isAuthLoadingState)
  if (isAuthLoading) {
    return (
      <div role="status" className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#111111]">
        <BeatLoader color="#ef4444" size={10} />
        <p className="text-sm text-gray-400">로그인 정보를 확인하고 있어요.</p>
      </div>
    )
  }
  return <>{children}</>
}