import React, { useState } from 'react'
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import BackButton from '../../components/BackButton'
import {Container, Header, HeaderTop, HeaderTitle, LogoutButton, PhotoContainer, Photo, PhotoButton, Content, Options, Option, OptionTitle, Section} from './styles'
import { useTheme } from 'styled-components'
import {Feather} from '@expo/vector-icons'
import Input from '../../components/Input'
import PasswordInput from '../../components/PasswordInput'
import { useAuth } from '../../hooks/auth'

const Profile = () => {
    const theme = useTheme()
    const navigation = useNavigation()
    const {user} = useAuth()

    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')

    const handleBack = () => {
        navigation.goBack()
    }

    const handleSignOut = () => {

    }

    return (
        <KeyboardAvoidingView behavior='position' enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut} >
                                <Feather name='power' size={24} color={theme.colors.shape} />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/79610402?v=4'}} />
                            <PhotoButton onPress={() => {}}>
                                <Feather name='camera' size={24} color={theme.colors.shape} />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{marginBottom: useBottomTabBarHeight()}}>
                        <Options>
                            <Option active={option === 'dataEdit' ? true : false} onPress={() => setOption('dataEdit')}>
                                <OptionTitle active={option === 'dataEdit' ? true : false}>Dados</OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit' ? true : false} onPress={() => setOption('passwordEdit')}>
                                <OptionTitle active={option === 'passwordEdit' ? true : false}>Trocar senha</OptionTitle>
                            </Option>
                        </Options>
                        {
                        option === 'dataEdit' ? 
                        <Section>
                            <Input iconName='user' placeholder='Nome' autoCorrect={false} defaultValue={user.name} />
                            <Input iconName='mail' editable={false} defaultValue={user.email} />
                            <Input iconName='credit-card' placeholder='CNH' keyboardType='numeric' defaultValue={user.driver_license} />
                        </Section> : 
                        <Section>
                            <PasswordInput iconName='lock' placeholder='Senha atual' />
                            <PasswordInput iconName='lock' placeholder='Nova senha' />
                            <PasswordInput iconName='lock' placeholder='Repetir senha' />
                        </Section>
                        }
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default Profile