import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import CarDetails from '../screens/CarDetails';
import Schedulling from '../screens/Schedulling';
import SchedulingDetails from '../screens/SchedulingDetails';
import Confirmation from '../screens/Confirmation';
import MyCars from '../screens/MyCars';

const {Navigator, Screen} = createStackNavigator();

const AppStackRoutes = () => {
    return (
        <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
            <Screen name='Home' component={Home} />
            <Screen name='CarDetails' component={CarDetails} />
            <Screen name='Scheduling' component={Schedulling} />
            <Screen name='SchedulingDetails' component={SchedulingDetails} />
            <Screen name='Confirmation' component={Confirmation} />
            <Screen name='MyCars' component={MyCars} />
        </Navigator>
    )
}

export default AppStackRoutes