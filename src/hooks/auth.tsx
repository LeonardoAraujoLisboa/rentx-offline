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
    signOut: () => Promise<void>;
    updateUser: (user: User) => Promise<void>;
    loading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider = ({children}: AuthProviderProps) => {
    const [data, setData] = useState<User>({} as User)
    const [loading, setLoading] = useState<boolean>(false)

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
            /* const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                const dataUser = await userCollection.create((newUser) => {
                    newUser.user_id = user.id
                    newUser.name = user.name
                    newUser.email = user.email
                    newUser.driver_license = user.driver_license
                    newUser.avatar = user.avatar
                    newUser.token = token
                })
            const userData = dataUser._raw as unknown as User
            setData(userData)
            }) quando eu rodar a aplicação, caso dê erro faça isso*/
        } catch(error) {
            throw new Error(`${error}`)
        }
    }

    /* as 3 funções salvam as informções localmente */

    const signOut = async () => {
        try {
            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                const userSelected = await userCollection.find(data.id)
                await userSelected.destroyPermanently()
            })
            setData({} as User)
        } catch(error) {
            throw new Error(`${error}`)
        }
    }

    const updateUser = async (user: User) => {
        try {
            const userCollection = database.get<ModelUser>('users')
            await database.write(async () => {
                const userSelected = await userCollection.find(user.id)
                await userSelected.update((userData) => {
                    userData.name = user.name,
                    userData.driver_license = user.driver_license,
                    userData.avatar = user.avatar
                })
            })
            setData(user)
        } catch(error) {
            throw new Error(`${error}`)
        }
    }

    useEffect(() => {
        async function loadUserData() {
            setLoading(true)
            const userCollection = database.get<ModelUser>('users')
            const res = await userCollection.query().fetch()
            console.log('#### USUÁRIO LOGADO ####');
            console.log(res);
            if(res.length > 0) {//entao é pq o usuario ta logado
                const userData = res[0]._raw as unknown as User;//isso é para eu foçar uma tipagem, so colocando User ele da erro ai eu coloco unknow e dps o User
                api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
                setData(userData)
                setLoading(false)
            }
        }
        loadUserData()
    }, [])

    return (
        <AuthContext.Provider value={{user: data, signIn, signOut, updateUser, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth, AuthProviderProps}