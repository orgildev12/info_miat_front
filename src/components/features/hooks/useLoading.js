import { useContext } from 'react';
import { LoadingContext } from '../store/LoadingContext';
import { HIDE_CONFIRM, SHOW_CONFIRM } from "../store/Reducer";

export const useLoading = () => {
    const [loadingState, dispatch] = useContext(LoadingContext);

    const showLoading = (isLoading, loadingType = 'kendo') => {
        dispatch({
            type: isLoading ? SHOW_CONFIRM : HIDE_CONFIRM,
            payload: {
                text: loadingType
            }
        });
        return new Promise((res, rej) => {});
    };

    return { showLoading, loadingState };
}
