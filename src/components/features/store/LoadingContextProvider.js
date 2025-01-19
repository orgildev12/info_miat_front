import React, { useReducer } from "react";
import { initialState, reducer } from "./Reducer";
import { LoadingContext } from "./LoadingContext";

export const LoadingContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <LoadingContext.Provider value={[state, dispatch]}>
            {children}
        </LoadingContext.Provider>
    );
};
