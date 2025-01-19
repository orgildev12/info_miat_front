import Cookie from "universal-cookie";

const EXPIRE_TIME = 1000 * 60 * 5
const FIBA_CACHE = "ME_CORE_CACHE"
const cookie = new Cookie();

const currentTime = () => {
    return Date.now()
}

export function GetCookie(key) {
    return cookie.get(key);
}
export function SetCookie(key, value, options = null) {
    cookie.set(key, value, options || { path: '/' });
}
export function RemoveCookie(key) {
    cookie.remove(key);
}

export function GetTimeCookie(key) {
    const data = getFibaCache()
    if (data && data[key]) {
        if (data[key].expiry <= currentTime()) {
            delete data[key]
            return null
        } else {
            return data[key].data
        }
    } else {
        return null
    }
}

export function SetTimeCookie(key, value, time) {
    const item = {
        expiry: new Date().getTime() + (time ?? EXPIRE_TIME),
        data: value
    }
    const data = getFibaCache()
    data[key] = item
    localStorage.setItem(FIBA_CACHE, JSON.stringify(data));
}

const getFibaCache = () => {

    let fibaCache = {
        data: {},
        nextCleanup: new Date().getTime() + EXPIRE_TIME
    }

    try {
        const data = localStorage.getItem(FIBA_CACHE)
        if (data) {
            fibaCache = JSON.parse(data)
        }
    }
    catch (e) {
        console.error(e.message)
    }

    return fibaCache
}
