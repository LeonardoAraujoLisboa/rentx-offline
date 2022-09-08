import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import BackButton from '../../components/BackButton';
import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import {Container, Header, Title, SubTitle, Content, Apointements, AppointementsTitle, AppointmentsQuantity, CarWrapper, CarFooter, CarFooterTitle, CarFooterPeriod, CarFooterDate} from './styles';
import {AntDesign} from '@expo/vector-icons'


interface CarProps {
    id: string;
    user_id: string;
    fuel_type: string;
    car: CarDTO;
    startFormatted: string;
    endFormatted: string;
}

const MyCars = () => {
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState<boolean>();
    const theme = useTheme();
    const navigation = useNavigation<any>()

    const getAllCars = async () => {
        try {
            setLoading(true);
            const res = await api.get(`schedules_byuser?user_id=1`);
            console.log(res.data)
            setCars(res.data);
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
    }, [])

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
                                    <CarFooterDate>{item.startFormatted}</CarFooterDate>
                                    <AntDesign name='arrowright' size={20} color={theme.colors.text_detail} style={{marginHorizontal: 10}} />
                                    <CarFooterDate>{item.endFormatted}</CarFooterDate>
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