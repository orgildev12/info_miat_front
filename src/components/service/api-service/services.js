import functions from "../functions";
import { ApiService } from "../ApiService";
import { GetTimeCookie, SetTimeCookie } from "../CookieService";
const CORE_DICT = 'ME_CORE_DICTIONARY';
export const getDicts = async ({ dic_code, parentValue, parentDicCode }) => {
    if (dic_code) {
        let resp = functions.error;
        const unique_key = `${CORE_DICT}.${dic_code}${parentValue ? '.' + (parentValue + parentDicCode) : ''}`;
        if (await GetTimeCookie(unique_key) != null) {
            resp = await GetTimeCookie(unique_key);
            return resp;
        } else {
            await ApiService("gp040099", { dic_code, parentValue, parentDicCode }).then(
                res => {
                    resp = res;
                    SetTimeCookie(unique_key, res)
                }).catch((err) => {
                    resp.message = functions.getInfoRespError(err);
                })
            return resp;
        }
    }
}
/**
 * @param  {string} process_code
 * @param  {object} data
 * @param  {} showLoading
 */
export const send = async (process_code, data, showLoading) => {
    let resp = functions.error;
    if (showLoading) {
        showLoading(true);
    }
    await ApiService(process_code, data)
        .then((res) => {
            resp = res;
        })
        .catch((res) => {
            resp.message = res;
        });
    if (showLoading) {
        showLoading(false);
    }
    return resp;
};
