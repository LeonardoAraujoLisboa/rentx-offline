import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${({theme}) => theme.colors.background_primary};
`

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.header};
    width: 100%;
    height: ${RFPercentage(37)}px;
    padding: ${getStatusBarHeight() + 36}px 25px 0px 32px;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background_secondary};
    font-family: ${({theme}) => theme.fonts.secundary_600};
    font-size: ${RFValue(30)}px;
    line-height:${RFValue(34)}px ;
    padding-top: 41px;
`

export const SubTitle = styled.Text`
    color: ${({theme}) => theme.colors.background_secondary};
    font-family: ${({theme}) => theme.fonts.secundary_400};
    font-size: ${RFValue(15)}px;
    line-height:${RFValue(34)}px ;
    padding-top: 18px;
    padding-bottom: 34px;
`

export const Content = styled.View`
    padding: 24px 25px 29px 32px;
    flex: 1;
`

export const Apointements = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const AppointementsTitle = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(18)}px;
`

export const AppointmentsQuantity = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.secundary_500};
    font-size: ${RFValue(15)}px;
    line-height: ${RFValue(16)}px;
`

export const CarWrapper = styled.View`

`

export const CarFooter = styled.View`
    align-items: center;
    padding: 0px 24px;
    height: 40px;
    justify-content: space-between;
    background-color: ${({theme}) => theme.colors.background_secondary};
    flex-direction: row;
    margin-top: -14px;
`

export const CarFooterTitle = styled.Text`
    color: ${({theme}) => theme.colors.text_detail};
    font-family: ${({theme}) => theme.fonts.secundary_500};
    font-size: ${RFValue(10)}px;
    line-height: ${RFValue(10)}px;
    text-transform: uppercase;
    letter-spacing: 1px;
`

export const CarFooterPeriod = styled.View`
    flex-direction: row;
    align-items: center;
`

export const CarFooterDate = styled.Text`
    color: ${({theme}) => theme.colors.title};
    font-family: ${({theme}) => theme.fonts.primary_400};
    font-size: ${RFValue(13)}px;
    line-height: ${RFValue(15)}px;
`
