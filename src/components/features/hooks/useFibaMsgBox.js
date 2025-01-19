import { useContext } from "react";
import { FibaMsgContext } from "../store/FibaMsgContext";
import { CONFIRM_BOX, HIDE_CONFIRM, SHOW_CONFIRM, SUCCESS_BOX, INFO_BOX, WARNING_BOX, ERROR_BOX } from "../store/MsgReducer";

let resolveCallback;
export const useFibaMsgBox = () => {
    const [msgBoxState, dispatch] = useContext(FibaMsgContext);
    const onConfirm = () => {
        closeConfirm();
        resolveCallback(true);
    };

    const onCancel = () => {
        closeConfirm();
        resolveCallback(false);
    };

    const confirm = (text) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text,
                type: CONFIRM_BOX,
                icon: 'fiba-i-confirmation',
                color: 'primary'
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const success = (text, body) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text,
                type: SUCCESS_BOX,
                icon: 'fiba-i-success',
                color: 'green',
                body,
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const info = (text) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text,
                type: INFO_BOX,
                icon: 'fiba-i-warning',
                color: 'primary'
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const warn = (text) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text,
                type: WARNING_BOX,
                icon: 'fiba-i-warning',
                color: 'orange'
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const error = (text) => {
        dispatch({
            type: SHOW_CONFIRM,
            payload: {
                text,
                type: ERROR_BOX,
                icon: 'fiba-i-error',
                color: 'red'
            },
        });
        return new Promise((res, rej) => {
            resolveCallback = res;
        });
    };

    const closeConfirm = () => {
        dispatch({
            type: HIDE_CONFIRM,
        });
    };

    return { confirm, success, info, warn, error, onConfirm, onCancel, msgBoxState };
}
