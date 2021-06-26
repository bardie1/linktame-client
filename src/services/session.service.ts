const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return localStorage.getItem("user");
}

export const sessionService = {
    setUser,
    getUser,
}