export {}

declare global{
    interface Window{
        Kakao?: {
            init: (appKey: string) => void
            isInitialized: () => boolean
            Auth: {
                authorize: (options: {
                    redirectUri: string
                    throughTalk?: boolean
                    state?: string
                }) => void
            }
        }
    }
}