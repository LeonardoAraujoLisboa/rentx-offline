import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.header};
    padding-top: ${getStatusBarHeight() + 66}px;
`

export const Content = styled.View`
    padding-top: 27px;
    justify-content: center;
    align-items: center;
`

export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    font-family: ${({theme}) => theme.fonts.secundary_600};
    color: ${({theme}) => theme.colors.background_secondary};
    line-height: 32px;
    padding-top: 40px;
    padding-bottom: 25px;
`

export const Message = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.primary_400};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: 25px;
    text-align: center;
    padding-bottom: 80px;
`

export const Footer = styled.View`
    padding-bottom: ${getBottomSpace() + 46}px;
`
