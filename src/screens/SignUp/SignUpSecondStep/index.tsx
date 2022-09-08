import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import {Container, Header, Steps, Title, Subtitle, Form, FormTitle} from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Bullet from '../../../components/Bullet';
import { useTheme } from 'styled-components';
import Button from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import PasswordInput from '../../../components/PasswordInput';
import api from '../../../services/api';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}

const SignUpFirstStep = () => {
   const navigation = useNavigation<any>()
   const theme = useTheme()
   const route = useRoute()

   const {user} = route.params as Params

   const [password, setPassword] = useState('')
   const [passwordConfirm, setPasswordConfirm] = useState('')

   const handleBack = () => {
      navigation.goBack()
   }

   const handleRegister = async () => {
    if (!password || !passwordConfirm) {
        return Alert.alert('Informe a senha e a confirmação dela.')
    }
    if (password !== passwordConfirm) {
        return Alert.alert('As senhas não são iguais.')
    }
    const data = {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
    }
    await api.post('users', data).then(() => {
        navigation.navigate('Confirmation', {title: 'Conta Criada!', message: `Agora é só fazer login\ne aproveitar`, nextScreenRoute: 'SignIn'})
    }).catch((error) => {
        console.log(error);
        Alert.alert('Opa', 'Não foi possível cadastrar')
    })
   }

   return (
      <KeyboardAvoidingView behavior='position' enabled>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
               <Header>
                  <BackButton onPress={handleBack} />
                  <Steps>
                     <Bullet active />{/* esse ta verdadeiro */}
                     <Bullet />
                  </Steps>
               </Header>
               <Title>
                  Crie sua{'\n'}conta
               </Title>
               <Subtitle>
                  Faça seu cadastro de{'\n'}forma rápida e fácil
               </Subtitle>
               <Form>
                  <FormTitle>2. Senha</FormTitle>
                  <PasswordInput iconName='lock' placeholder='Senha' value={password} onChangeText={setPassword} />
                  <PasswordInput iconName='lock' placeholder='Repetir Senha' value={passwordConfirm} onChangeText={setPasswordConfirm} />
               </Form>
               <Button title='Cadastrar' color={theme.colors.success} onPress={handleRegister} />
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}

export default SignUpFirstStep;