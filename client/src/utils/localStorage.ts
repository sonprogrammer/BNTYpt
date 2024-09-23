export const saveUserToLocalStorage = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
}

export const getUserFromLocalStorage = () =>{
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}