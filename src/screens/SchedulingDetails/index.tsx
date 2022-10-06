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
import { useNetInfo } from '@react-native-community/netinfo';

interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

const SchedulingDetails = () => {
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod)

    const theme = useTheme();
    const netInfo = useNetInfo()
    const navigation = useNavigation<any>();
    const route = useRoute();
    const {car, dates} = route.params as Params;
    
    const[loading, setLoading] = useState<boolean>()

    const rentTotal = Number(dates.length * car.price)

    const handlePressConfirmRental = async () => {
        try {
            setLoading(true);
            try {//poderia usar o post
                setLoading(true);
                await api.post(`rentals`, {
                    user_id: 1,
                    car_id: car.id,
                    start_date: new Date(dates[0]),
                    end_date: new Date(dates[dates.length - 1]),
                    total: rentTotal
                }).then(() => {
                    navigation.navigate('Confirmation', {title: 'Carro alugado!', message: `Agora você só precisa ir\naté a concessionário da RENTX\npegar o automóvel`, nextScreenRoute: 'Home'});
                }) //fiz o post para incluir no banco o meu id e as informações de agendamento
                setLoading(false);
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

    useEffect(() => {
        setRentalPeriod({
            startFormatted: format(parseISO(dates[0]), 'dd/MM/yyyy'),
            endFormatted: format(parseISO(dates[dates.length - 1]), 'dd/MM/yyyy')
        })
    }, [])

    useEffect(() => {
        async function fetchCarUpdated() {
            const res = await api.get(`/cars/${car.id}`)
            setCarUpdated(res.data)
        }
        if (netInfo.isConnected === true) {
            fetchCarUpdated()
        }
    }, [netInfo.isConnected])

    return (
        <Container>
            <StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
            <Header>
                <BackButton onPress={handleBack} />
            </Header>
            <CarImages>
            <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]}/>
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
                {carUpdated.accessories && <Accessories>
                    {carUpdated.accessories.map((accessory) => (
                        <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                    ))}
                </Accessories>}
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