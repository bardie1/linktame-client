const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return localStorage.getItem("user");
}

const clearSession = () => {
    localStorage.clear();
}

export const sessionService = {
    setUser,
    getUser,
    clearSession
}