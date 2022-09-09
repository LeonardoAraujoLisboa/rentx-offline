import React, { useState, useEffect } from 'react';
import {Container, Header, Title, SubTitle, Footer, Form} from './styles';
import { StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Button from '../../components/Button'
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { useTheme } from 'styled-components';
import * as Yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

/* import {database} from '../../database'//isso é so pra ter certeza q esta tudo funcionando */

const SignIn = () => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const theme = useTheme()
   const navigation = useNavigation<any>()
   const {signIn} = useAuth()

   const handleSignIn = async () => {
      try {
         const schema = Yup.object().shape({
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            password: Yup.string().required('A senha é obrigatória')
         })
         await schema.validate({email, password})
         signIn({email, password})
      } catch (error) {
         if (error instanceof Yup.ValidationError) {
            Alert.alert('Opa', error.message)//esse error.message vai mostrar as mensagens q eu escrevi ai em cima
         } else {
            Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
         }
      }
   }

   const handleNewAccount = () => {
      navigation.navigate('SignUpFirstStep')
   }

   /* useEffect(() => {
      async function loadData() {
         const usersCollection = database.get('users')
         const users = usersCollection.query().fetch()
         console.log(users)//tem que mostrar os logs das tabelas. No final retornar um vetor vazio, pois nao tem nenhum usuário cadastrado na aplicação
      }
      loadData()
   }, [])//isso é so pra ter certeza q esta tudo funcionando */

   return (
      <KeyboardAvoidingView behavior='position' enabled>{/* esse dai é para quando abrir o teclado os outros campos flutuarem, ou seja, subirem para q o usuário ainda consiga ver td */}
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{/* envolvi no container para pode clicar em qualquer lugar, esse TouchableWithoutFeedback é a mesma coisa de um toque na tela normal so que sem o feedback (sem aquela opacidade) */}
            <Container>
               <StatusBar barStyle={'dark-content'} backgroundColor='transparent' />
               <Header>
                  <Title>Estamos{'\n'}quase lá</Title>
                  <SubTitle>Faça seu login para começar{'\n'}uma experiência incrível</SubTitle>
               </Header>
               <Form>
                  <Input iconName='mail' placeholder='E-mail' keyboardType='email-address' autoCorrect={false} autoCapitalize='none' value={email} onChangeText={(value) => setEmail(value)} />
                  <PasswordInput iconName='lock' placeholder='Senha' value={password} onChangeText={(value) => setPassword(value)} />
               </Form>
               <Footer>
                  <Button title="Login" onPress={handleSignIn} enabled={true} loading={false} />
                  <Button title="Criar conta gratuita" onPress={handleNewAccount} enabled={true} loading={false} light color={theme.colors.background_secondary} />
               </Footer>
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}

export default SignIn;