import React, {createContext, useState, useContext, ReactNode, useEffect} from 'react'
import api from '../services/api';
import {database} from '../database'
import {User as ModelUser} from '../database/model/User'

interface User {
    id: string;//id do watermelon
    user_id: string;//id da api
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string
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
    const [data, setData] = useState<User>({} as User)

    const signIn = async ({email, password}: SignCredentials) => {
        try {
            const res = await api.post('/session',  {
                email,
                password
            })
            console.log(res.data);
            const {token, user} = res.data
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                await userCollection.create((newUser) => {
                    newUser.user_id = user.id
                    newUser.name = user.name
                    newUser.email = user.email
                    newUser.driver_license = user.driver_license
                    newUser.avatar = user.avatar
                    newUser.token = token
                })
            })
            setData({...user, token})
        } catch(error) {
            throw new Error(`${error}`)
        }
    }

    useEffect(() => {
        async function loadUserData() {
            const userCollection = database.get<ModelUser>('users')
            const res = await userCollection.query().fetch()
            console.log('#### USUÁRIO LOGADO ####');
            console.log(res);
            if(res.length > 0) {//entao é pq o usuario ta logado
                const userData = res[0]._raw as unknown as User;//isso é para eu foçar uma tipagem, so colocando User ele da erro ai eu coloco unknow e dps o User
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setData(userData)
            }
        }
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{user: data, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth, AuthProviderProps}