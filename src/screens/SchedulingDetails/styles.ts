import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background_secondary};
`

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: ${getStatusBarHeight() + 36}px;
    padding-left: 32px;
`

export const CarImages = styled.View`
    padding-top: ${getStatusBarHeight()}px;
`

export const Content  = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 24,
        alignItems: 'center'
    },
    showsVerticalScrollIndicator: false
})`
`

export const Details  = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
`

export const Description  = styled.View`

`

export const Rent  = styled.View`

`

export const Period  = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    text-transform: uppercase;
    padding-bottom: 4px;
`

export const Price  = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.main};
    line-height: ${RFValue(27)}px;
`

export const Brand  = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    padding-bottom: 4px;
    text-transform: uppercase;
    padding-bottom: 4px;
`

export const Name = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.title};
    line-height: ${RFValue(27)}px;
`

export const About = styled.Text`
    padding-top: 23px;
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.primary_400};
    color: ${({theme}) => theme.colors.text};
    line-height: ${RFValue(21)}px;
    text-align: justify;
`

export const Accessories = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-right: -8px;
`

export const Footer = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.background_secondary};
    padding: 24px 24px ${getBottomSpace() + 24}px;
`

export const RentPeriod = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 16px;
    border-bottom-width: 1px;
    border-bottom-color: ${({theme}) => theme.colors.line};
` 

export const CalendarIcon = styled.View`
    width: 48px;
    height: 48px;
    background-color: ${({theme}) => theme.colors.main};
    justify-content: center;
    align-items: center;
` 

export const DateInfo = styled.View`

` 

export const DateTitle = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    text-transform: uppercase;
` 

export const DateValue = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.title};
    line-height: ${RFValue(18)}px;
`

export const RentalPrice = styled.View`
    width: 100%;
    padding-top: 16px;
`

export const RentalPriceLabel = styled.Text`
    font-size: ${RFValue(10)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.text_detail};
    line-height: ${RFValue(10)}px;
    text-transform: uppercase;
    padding-bottom: 8px;
`

export const RentalPriceDetails = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`

export const RentalPriceQuota = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.title};
    line-height: ${RFValue(18)}px;
`

export const RentalPriceTotal = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({theme}) => theme.fonts.secundary_500};
    color: ${({theme}) => theme.colors.success};
    line-height: ${RFValue(26)}px;
    text-transform: uppercase;
`
