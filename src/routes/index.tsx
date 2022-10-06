import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackRoutes from './app.stack.routes';
import { useAuth } from '../hooks/auth';
import AppTabRoutes from './app.tab.routes';
import AuthRoutes from './auth.routes';
import LoadAnimation from '../components/LoadAnimation';


const routes = () => {
   const {user, loading} = useAuth()

   return (
      loading ? <LoadAnimation /> :   
      <NavigationContainer>
          {user.id ? <AppTabRoutes /> : <AuthRoutes />}
      </NavigationContainer>
   );
}

export default routes;