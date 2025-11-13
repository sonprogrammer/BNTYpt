export const saveAccessToken = (token: string) => {
    localStorage.setItem('accessToken', token)
}

export const getAccessToken = () => {
    const token = localStorage.getItem('accessToken')
    return token
}