import { ApiService, GetTimeCookie, SetTimeCookie } from "../components";
import { ME_CORE_CACHE } from "../constants/token.const";

export const getMenuModules = async () => {

    let resp = { status: 'error' };
    if (await GetTimeCookie(`${ME_CORE_CACHE}.gp030099`) != null) {
        resp = await GetTimeCookie(`${ME_CORE_CACHE}.gp030099`);
        return resp;
    } else {
        await ApiService("gp030099").then(
            res => {
                resp = res;
                SetTimeCookie(`${ME_CORE_CACHE}.gp030099`, res, 1000 * 60 * 20)
            }).catch((err) => {
                resp.message = err;
            })
        return resp;
    }
}

export const getCacheMenuModules = async () => {
    let data = await GetTimeCookie(`${ME_CORE_CACHE}.gp030099`);
    if (data == null) {
        data = [];
    }
    return data;
}