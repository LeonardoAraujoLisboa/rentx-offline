import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './app.stack.routes';
import { useAuth } from '../hooks/auth';
import AppTabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';


const routes = () => {
   const {user} = useAuth()

   return (
      <NavigationContainer>
          {user ? <AppTabRoutes /> : <AuthRoutes />}
      </NavigationContainer>
   );
}

export default routes;