import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StatusBar, StyleSheet } from 'react-native';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import {Container, Header, CarImages, Details, Description, Rent, Period, Price, Brand, Name, Accessories, About, Footer, OfflineInfo} from './styles';
import Button from '../../components/Button';
import {Car} from '../../database/model/Car'
import {CarDTO} from '../../dtos/CarDTO'
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {useTheme} from 'styled-components'
import api from '../../services/api';
import {useNetInfo} from '@react-native-community/netinfo'

interface Params {
    car: Car;
}

const CarDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute()//sao infromações que estao vindo da minha rota
    const {car} = route.params as Params
    const theme = useTheme()
    const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)
    const netInfo = useNetInfo()

    const scrollY = useSharedValue(0)
    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y
        console.log(event.contentOffset.y);
        
    })

    const headerStyleAnimated = useAnimatedStyle(() => {
        return {
            height: interpolate(scrollY.value, 
                [0, 200], 
                [200,70],
                Extrapolate.CLAMP
            )
        }
    })

    const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollY.value, 
                [0, 150], 
                [1, 0],
                Extrapolate.CLAMP
            )
        }
    })

    const handlePressConfirmRental = () => {
        navigation.navigate('Scheduling', {
            car
        })
    }

    const handleBack = () => {
        navigation.goBack();
    }

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
            <StatusBar barStyle='dark-content' translucent backgroundColor={'transparent'}/>
            <Animated.View style={[headerStyleAnimated, styles.header, {backgroundColor: theme.colors.background_secondary}]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                        <ImageSlider imagesUrl={!!carUpdated.photos ? carUpdated.photos : [{id: car.thumbnail, photo: car.thumbnail}]}/>
                    </CarImages>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView contentContainerStyle={{paddingHorizontal: 24, paddingTop: getStatusBarHeight() + 220}} showsVerticalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16}/* esse ultimo é pra animação nao trepidar */ >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>R$ {car.name}</Name>
                    </Description>
                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>R$ {netInfo.isConnected === true ? car.price : '...'}</Price>
                    </Rent>
                </Details>
                {carUpdated.accessories && <Accessories>
                    {carUpdated.accessories.map((accessory) => (
                        <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
                    ))}
                </Accessories>}
                <About>
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button title='Escolher o período do aluguel' onPress={handlePressConfirmRental} enabled={netInfo.isConnected === true} />
                {
                    netInfo.isConnected === false && 
                    <OfflineInfo>
                        Conecte-se a Internet para ver mais detalhes e agendar o seu carro
                    </OfflineInfo>
                }
            </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        zIndex: 1
    }
})

export default CarDetails;