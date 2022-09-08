import React, {createContext, useState, useContext, ReactNode} from 'react'
import api from '../services/api';

interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignCredentials {
    email: string;
    password: string;
}

interface AuthContextData {
    user: User;
    signIn: (credentials: SignCredentials) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [data, setData] = useState<AuthState>({} as AuthState)

    const signIn = async ({email, password}: SignCredentials) => {
        const res = await api.post('/session',  {
            email,
            password
        })
        console.log(res.data);
        const {token, user} = res.data
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setData({token, user})
    }

    return (
        <AuthContext.Provider value={{user: data.user, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)
    
    return context
}

export { AuthProvider, useAuth, AuthProviderProps}