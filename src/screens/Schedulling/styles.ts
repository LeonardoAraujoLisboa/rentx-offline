import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface DateValueProps {
    select: boolean;
}

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.header};
    width: 100%;
    height: ${RFPercentage(46)}px;
    padding: ${getStatusBarHeight() + 36}px 25px 0px 32px;
`

export const Title = styled.Text`
    color: ${({theme}) => theme.colors.background_secondary};
    font-family: ${({theme}) => theme.fonts.secundary_600};
    font-size: ${RFValue(34)}px;
    line-height: ${RFValue(34)}px;
    padding-top: 41px;
`

export const RentalPeriod  = styled.View`
    padding: 32px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const DateInfo = styled.View`

`

export const DateTitle  = styled.Text`
    text-transform: uppercase;
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
`

export const DateValue = styled.Text<DateValueProps>`
    ${({select, theme}) => select ? css`
        color: ${theme.colors.background_secondary};
        font-size: ${RFValue(15)}px;
        font-family: ${theme.fonts.primary_500};
        padding-top: 9px;
    ` : css`
        margin-top: 27px;
        width: 104px;
        height: 1px;
        background-color: ${theme.colors.text};
    `}
`
export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        paddingTop: 32
    },
    showsVerticalScrollIndicator: false
})`

`

export const Footer = styled.View`
    padding: 0px 24px ${getBottomSpace() + 24}px 24px;
    margin-top: 32px;
`
