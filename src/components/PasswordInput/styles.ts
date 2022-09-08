import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import {TextInput} from 'react-native'

interface ContainerProps {
    isFocused: Boolean;
}

export const Container = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`

export const IconContainer = styled.View<ContainerProps>`
    height: 56px;
    width: 55px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background_secondary};
    ${({isFocused, theme}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
    margin-right: 2px;
`

export const InputText = styled(TextInput)<ContainerProps>`//tem q fazer isso pra ele entender as propriedades (o rest)
    width: 200px;
    background-color: ${({theme}) => theme.colors.background_secondary};
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    padding: 0px 23px;
    ${({isFocused, theme}) => isFocused && css`
        border-bottom-width: 2px;
        border-bottom-color: ${theme.colors.main};
    `};
`