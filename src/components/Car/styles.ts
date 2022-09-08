import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled(RectButton)`
    width: 100%;
    margin: 16px 0px;
    height: 126px;
    padding: 17px;
    background-color: ${({theme}) => theme.colors.background_secondary};
    flex-direction: row;
    justify-content: space-between;
`

export const Details = styled.View`
    padding: 7px;
`

export const Brand = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    padding-bottom: 4px;
    text-transform: uppercase;
`

export const Name = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.title};
    line-height: ${RFValue(16)}px;
`

export const About = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 16px;
`

export const Rent = styled.View`
    padding-right: 24px;
`

export const Period = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    text-transform: uppercase;
`

export const Price = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.main};
    line-height: ${RFValue(16)}px;
    padding-top: 4px;
`

export const Type = styled.View`
    
`

export const CarImage = styled.Image`
    width: 160px;
    height: 92px;
    padding-right: 7px;
`