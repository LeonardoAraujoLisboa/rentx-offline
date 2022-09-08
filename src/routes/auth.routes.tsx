import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Confirmation from '../screens/Confirmation';
import Splash from '../screens/Splash';
import SignUpFirstStep from '../screens/SignUp/SignUpFirstStep';
import SignUpSecondStep from '../screens/SignUp/SignUpSecondStep';

const {Navigator, Screen} = createStackNavigator();

const AuthRoutes = () => {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
            <Screen name='Splash' component={Splash} />
            <Screen name='SignUpFirstStep' component={SignUpFirstStep} />
            <Screen name='SignUpSecondStep' component={SignUpSecondStep} />
            <Screen name='Confirmation' component={Confirmation} />
        </Navigator>
    )
}

export default AuthRoutes