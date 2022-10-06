import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import BackButton from '../../components/BackButton';
import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';
import api from '../../services/api';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import {Container, Header, Title, SubTitle, Content, Apointements, AppointementsTitle, AppointmentsQuantity, CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate} from './styles';
import {AntDesign} from '@expo/vector-icons'
import {Car as ModelCar} from '../../database/model/Car'
import {format, parseISO} from 'date-fns'

interface DataProps {
    id: string;
    car: ModelCar;
    start_date: string;    
    end_date: string;   
    fuel_type: string; 
}

const MyCars = () => {
    const [cars, setCars] = useState<DataProps[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const theme = useTheme();
    const navigation = useNavigation<any>()
    const screenIsFocus = useIsFocused()

    const getAllCars = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/rentals`);
            const dataFormatted = res.data.map((data: DataProps) => {
                return {
                    id: data.id,
                    car: data.car,
                    start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                    end_date: format(parseISO(data.end_date), 'dd/MM/yyyy')
                }
            })
            setCars(dataFormatted);
            setLoading(false);
        } catch(error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        getAllCars();
    }, [screenIsFocus])

   return (
      <Container>
          <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
            <Header>
                <BackButton color={theme.colors.background_secondary} onPress={handleBack} />
                <Title>Seus agendamentos, estão aqui.</Title>
                <SubTitle>Conforto, segurança e praticidade.</SubTitle>
            </Header>
            <Content>
                {loading ? <LoadAnimation /> : 
                <>
                    <Apointements>
                        <AppointementsTitle>Agendamentos feitos: </AppointementsTitle>
                        <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
                    </Apointements>
                    <FlatList data={cars} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} renderItem={({item}) => (
                        <CarWrapper>
                            <Car data={item.car} icon={getAccessoryIcon(item.fuel_type)} />
                            <CarFooter>
                                <CarFooterTitle>Período</CarFooterTitle>
                                <CarFooterPeriod>
                                    <CarFooterDate>{item.start_date}</CarFooterDate>
                                    <AntDesign name='arrowright' size={20} color={theme.colors.text_detail} style={{marginHorizontal: 10}} />
                                    <CarFooterDate>{item.end_date}</CarFooterDate>
                                </CarFooterPeriod>
                            </CarFooter>
                        </CarWrapper>
                    )} />
                </>
                }
            </Content>
      </Container>
   );
}

export default MyCars;