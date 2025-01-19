import axios from 'axios'
import { GetCookie, RemoveCookie } from './CookieService'
import functions from './functions'

export const SERVER_HOST = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_SERVER_URL : process.env.REACT_APP_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: SERVER_HOST
})

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME
const NOT_AUTH = process.env.REACT_APP_NOT_AUTH

export const ApiService = (process_code, data) => {
    return sendApiService('POST', '/api/v1/unauth', data, process_code);
}

export const sendApiService = (method, url, data, process_code) => {
    const options = {
        method: method,
        url,
        ...(data?._download && { responseType: 'blob' }),
        headers: {
            'Content-Type': 'application/json', //'application/octet-stream'
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + GetCookie(TOKEN_NAME),
            'pc': process_code,
            'language': localStorage.getItem('i18nextLngMeCoreBack') || 'mn'
        }
    }

    if (process_code !== "lo000002") {
        localStorage.setItem('sessionTimer', new Date());
    }

    options.data = data;
    const onSuccess = function (response) {
        // if (basicOptions !== null) return response
        RemoveCookie(NOT_AUTH);
        if (data?._download) {
            return response.data;
        }
        if (response?.data && response?.data.response_code) {
            if (response.data.response_code === "RC000000") {
                let data = response.data.response;
                if (data) {
                    if (data.next_page_url) {
                        data.total = data.to + 1;
                    } else if (data.prev_page_url) {
                        data.total = data.to;
                    } else if (data.data) {
                        data.total = data.data?.length;
                    }
                    if (data.custmsg && data.custmsg.length > 0) {
                        localStorage.setItem('ME_CUSTMSGDATA', JSON.stringify({ show: true, data: data.custmsg }));
                    }
                }
                return data;
            }
        }

        return Promise.reject(response)

    }

    const onError = function (error) {
        console.error(error);
        if (error.data && error.data.response) {
            return Promise.reject(error.data.response)
        }

        if (data?._download) {
            error.response = { data: 'Файл татахад алдаа гарлаа.' }
        }
        return Promise.reject(functions.getInfoRespError(error.response || error.message))
    }

    return axiosInstance(options).then(onSuccess).catch(onError)
}
