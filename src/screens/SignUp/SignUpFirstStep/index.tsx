import React, { useState } from 'react';
import BackButton from '../../../components/BackButton';
import {Container, Header, Steps, Title, Subtitle, Form, FormTitle} from './styles';
import { useNavigation } from '@react-navigation/native';
import Bullet from '../../../components/Bullet';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup'

const SignUpFirstStep = () => {
   const navigation = useNavigation<any>()

   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [driverLicense, setDriveLicense] = useState('')

   const handleBack = () => {
      navigation.goBack()
   }

   const handleNextStep = async () => {
      try {
         const schema = Yup.object().shape({
            driverLicense: Yup.string().required('CNH é obrigatória'),
            email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
            name: Yup.string().required('Nome obrigatório')
         })
         const data = {name, email, driverLicense}
         await schema.validate(data)
         navigation.navigate('SignUpSecondStep', {user: data})
      } catch(error) {
         if (error instanceof Yup.ValidationError) {
            Alert.alert('Opa', error.message)
         } else {
            Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credenciais')
         }
      }
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
                  <FormTitle>1. Dados</FormTitle>
                  <Input iconName='user' placeholder='Nome' value={name} onChangeText={setName} />
                  <Input iconName='mail' placeholder='E-mail' keyboardType='email-address' value={email} onChangeText={setEmail} />
                  <Input iconName='credit-card' placeholder='CNH' keyboardType='numeric' value={driverLicense} onChangeText={setDriveLicense} />
               </Form>
               <Button title='Próximo' onPress={handleNextStep} />
            </Container>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
}

export default SignUpFirstStep;