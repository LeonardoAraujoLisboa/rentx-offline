import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Alert, StatusBar } from 'react-native';
import BackButton from '../../components/BackButton';
import {Container, Header, Title, RentalPeriod, DateInfo, DateTitle, DateValue, Content, Footer} from './styles';
import { useTheme } from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg'
import Button from '../../components/Button';
import Calendar, { DayProps } from '../../components/Calendar';
import generateInterval from '../../components/Calendar/generateInterval';
import {format, parseISO} from 'date-fns';
import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
    startFormatted: string;
    endFormatted: string;
}

interface Params {
    car: CarDTO;
}


const Scheduling = () => {
    const theme = useTheme();
    const navigation = useNavigation<any>();
    const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const [markedDates, setMarkedDates] = useState<any>({} as any);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const route = useRoute()
    const {car} = route.params as Params;

    const handlePressConfirmRental = () => {
        if (rentalPeriod.startFormatted) {
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            })
        }
    }

    const handleBack = () => {
        navigation.goBack();
    }

    const handleChangeDate = (date: DayProps) => {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;
        if(start.timestamp > end.timestamp) {
            start = end;
            end = start;
        }
        setLastSelectedDate(end);
        const interval = generateInterval(start, end);
        setMarkedDates(interval);
        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];
        setRentalPeriod({
            startFormatted: format(parseISO(firstDate), 'dd/MM/yyyy'),
            endFormatted: format(parseISO(endDate), 'dd/MM/yyyy')
        })
        
    }     

    return (
        <Container>
            {console.log('ola', Object.keys(markedDates))}
            <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
            <Header>
                <BackButton color={theme.colors.background_secondary} onPress={handleBack} />
                <Title>Escolha uma{'\n'}data de início e{'\n'}fim do aluguel</Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>de</DateTitle>
                        <DateValue select={rentalPeriod.startFormatted ? true : false/* ai invés disso tudo, poderia passar => !!rentalPeriod.startFormatted */}>{rentalPeriod.startFormatted}</DateValue>
                    </DateInfo>
                    <ArrowSvg />
                    <DateInfo>
                        <DateTitle>até</DateTitle>
                        <DateValue select={rentalPeriod.endFormatted ? true : false}>{rentalPeriod.endFormatted}</DateValue>
                    </DateInfo>
                </RentalPeriod>
            </Header>
            <Content>
                <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
            </Content>
            <Footer>
                <Button enabled={rentalPeriod.startFormatted ? false : true} title='Confirmar' onPress={handlePressConfirmRental} />
            </Footer>
        </Container>
    );
}

export default Scheduling;