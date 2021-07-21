const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
}

const getUser = () => {
    return localStorage.getItem("user");
}

const setDeviceType = (device: string) => {
    localStorage.setItem("device", device);
}


const getDeviceType = () => {
    return localStorage.getItem("device");
}

const getUserAsObj = () => {
    let u = localStorage.getItem("user");
    if (u) {
        return JSON.parse(u);
    } else {
        return null;
    }
}

const identifyDeviceType = () => {
    const ua = navigator.userAgent;
    console.log(ua);
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }
    if (
      /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }
    return "desktop";
  };

const clearSession = () => {
    localStorage.clear();
}

export const sessionService = {
    setUser,
    getUser,
    clearSession,
    getUserAsObj,
    getDeviceType,
    setDeviceType,
    identifyDeviceType,
}