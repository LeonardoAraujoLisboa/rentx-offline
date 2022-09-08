import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    width: 109px;
    height: 92px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.colors.background_primary};
    margin-top: 8px;
    margin-right: 8px;
    min-width: 26%;
    flex: 1;
`

export const Name = styled.Text`
    font-family: ${({theme}) => theme.fonts.primary_500};
    font-size: ${RFValue(13)}px;
    line-height: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text};
    padding-top: 14px;
`
