import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StatusBar, StyleSheet } from 'react-native';
import Accessory from '../../components/Accessory';
import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import {Container, Header, CarImages, Details, Description, Rent, Period, Price, Brand, Name, Accessories, About, Footer} from './styles';
import Button from '../../components/Button';
import {CarDTO} from '../../dtos/CarDTO'
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import {useTheme} from 'styled-components'

interface Params {
    car: CarDTO;
}

const CarDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute()//sao infromações que estao vindo da minha rota
    const {car} = route.params as Params
    const theme = useTheme()

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

    return (
        <Container>
            <StatusBar barStyle='dark-content' translucent backgroundColor={'transparent'}/>
            <Animated.View style={[headerStyleAnimated, styles.header, {backgroundColor: theme.colors.background_secondary}]}>
                <Header>
                    <BackButton onPress={handleBack} />
                </Header>
                <Animated.View style={sliderCarsStyleAnimation}>
                    <CarImages>
                        <ImageSlider imagesUrl={car.photos}/>
                    </CarImages>
                </Animated.View>
            </Animated.View>
            <Animated.ScrollView contentContainerStyle={{paddingHorizontal: 24, paddingTop: getStatusBarHeight() + 220}} showsVerticalScrollIndicator={false} onScroll={scrollHandler} scrollEventThrottle={16}/* esse ultimo é pra animação nao trepidar */ >
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
                <About>
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                    {car.about}
                </About>
            </Animated.ScrollView>
            <Footer>
                <Button title='Escolher o período do aluguel' onPress={handlePressConfirmRental} />
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