import { createContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider(props) {
    const [token, setToken] = useState(null);
    return <AuthContext.Provider value={{token, setToken}}>{props.children}</AuthContext.Provider>
}

export default AuthContext;