import React from 'react'
import { useNavigation } from '@react-navigation/core'
import BackButton from '../../components/BackButton'
import {Container, Header, HeaderTop, HeaderTitle, LogoutButton, PhotoContainer, Photo, PhotoButton, Content, Options, Option, OptionTitle} from './styles'
import { useTheme } from 'styled-components'
import {Feather} from '@expo/vector-icons'

const Profile = () => {
    const theme = useTheme()
    const navigation = useNavigation()

    const handleBack = () => {
        navigation.goBack()
    }

    const handleSignOut = () => {

    }

    return (
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
            <Content>
                <Options>
                    <Option>
                        <OptionTitle>Dados</OptionTitle>
                    </Option>
                    <Option>
                        <OptionTitle>Trocar senha</OptionTitle>
                    </Option>
                </Options>
            </Content>
        </Container>
    )
}

export default Profile