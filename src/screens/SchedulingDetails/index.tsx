import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, StatusBar } from 'react-native';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import {Container, Header, CarImages, Content, Details, Description, Rent, Period, Price, Brand, Name, Accessories, RentPeriod, CalendarIcon, DateInfo, DateTitle, DateValue, RentalPrice, RentalPriceLabel, RentalPriceDetails, RentalPriceQuota, RentalPriceTotal, Footer} from './styles';
import Button from '../../components/Button';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import {format, parseISO} from 'date-fns';
import api from '../../services/api';

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

const SchedulingDetails = () => {
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const route = useRoute();
    const {car, dates} = route.params as Params;
    const[loading, setLoading] = useState<boolean>()

    const handlePressConfirmRental = async () => {
        try {
            setLoading(true);
            const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
            const unavailable_dates = [...schedulesByCar.data.unavailable_dates, ...dates];
            setLoading(false);
            try {//poderia usar o post
                setLoading(true);
                await api.post(`/schedules_byuser/`, {
                    user_id: 1,
                    car,
                    startFormatted: format(parseISO(dates[0]), 'dd/MM/yyyy'),
                    endFormatted: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
                })//fiz o post para incluir no banco o meu id e as informações de agendamento
                const res = await api.put(`/schedules_bycars/${car.id}`, {
                    id: car.id,
                    unavailable_dates
                });
                if (res) {
                    setLoading(false);
                    navigation.navigate('Confirmation', {title: 'Carro alugado!', message: `Agora você só precisa ir\naté a concessionário da RENTX\npegar o automóvel`, nextScreenRoute: 'Home'});
                }
            } catch(error) {
                setLoading(false);
                Alert.alert('Não foi possível confirmar o agendamento');
                console.log(error)
            }
        } catch(error) {
            setLoading(false);
            Alert.alert('Não foi possível confirmar o agendamento');
            console.log(error)
        }
    }

    const handleBack = () => {
        navigation.goBack();
    }

    const rentTotal = car.price * dates.length;

    useEffect(() => {
        setRentalPeriod({
            startFormatted: format(parseISO(dates[0]), 'dd/MM/yyyy'),
            endFormatted: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
        })
    }, [])

    return (
        <Container>
            <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
            <CarImages>
                <ImageSlider imagesUrl={car.photos}/>
            </CarImages>
            <Content>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {car.price}</Price>
                    </Rent>
                </Details>
                <Accessories>
                {car.accessories.map((accessory) => (
                        <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                    ))}
                </Accessories>
                <RentPeriod>
                    <CalendarIcon>
                        <Feather name='calendar' size={RFValue(24)} color={theme.colors.shape} />
                    </CalendarIcon>
                    <DateInfo>
                        <DateTitle>de</DateTitle>
                        <DateValue>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <Feather name='chevron-right' size={RFValue(10)} color={theme.colors.text} />
                    <DateInfo>
                        <DateTitle>até</DateTitle>
                        <DateValue>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentPeriod>
                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ {car.price} x{dates.length} diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                {loading ? <Button enabled={true} loading={true} title='Aguarde...' color={theme.colors.success} onPress={handlePressConfirmRental} /> : <Button title='Alugar agora' color={theme.colors.success} onPress={handlePressConfirmRental} />}
            </Footer>
        </Container>
    )
}

export default SchedulingDetails;