import React from 'react'
import { AuthProvider, AuthProviderProps } from './auth'
/* import { Batata } from './auth' *//* se eu tiver um outro hook aqui */

const AppProvider = ({children}: AuthProviderProps) => {
    return (
        <AuthProvider>
            {/* <Batata> eu faria assim se tivesse outro ai eu to centralizando td em um arquivo e la no app eu so chamo esse*/}
                {children}
            {/* </Batata> */}
        </AuthProvider>
    )
}

export {AppProvider}