import React, { useReducer } from "react";
import { initialState, msgReducer } from "./MsgReducer";
import { FibaMsgContext } from "./FibaMsgContext";

export const FibaMsgContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(msgReducer, initialState);
    return <FibaMsgContext.Provider value={[state, dispatch]}>{children}</FibaMsgContext.Provider>;
};
