const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return localStorage.getItem("user");
}

const getUserAsObj = () => {
    let u = localStorage.getItem("user");
    if (u) {
        return JSON.parse(u);
    } else {
        return null;
    }
}

const clearSession = () => {
    localStorage.clear();
}

export const sessionService = {
    setUser,
    getUser,
    clearSession,
    getUserAsObj
}