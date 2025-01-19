import React from "react";
import { useLoading } from "./hooks/useLoading";
export const LoadingSpin = () => {
    let element = <div className="k-loading-mask" style={{zIndex: 100000}}>
        <span className="k-loading-text">Loading</span>
        <div className="k-loading-image"></div>
        <div className="k-loading-color"></div>
    </div>;
    const { loadingState } = useLoading();
    return loadingState.show ? element : null;
}
