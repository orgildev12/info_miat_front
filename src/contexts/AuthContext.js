import React, { useContext, useState } from "react";
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ user: null, loading: true, server_ip: '', txn_date: '' });

    function isAuth() {
        return true;
    }

    const value = {
        auth,
        isAuth,
        setAuth
    };


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;