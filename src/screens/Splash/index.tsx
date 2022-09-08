/* import React from 'react';
import {Container} from './styles';
import { Button, StyleSheet, Dimensions } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';

const WIDTH = Dimensions.get('window').width

const Splash = () => {
    const animation = useSharedValue(0) *//* essa função ele é usada para poder compartilhar valores das animações */

    /* const animatedStyles = useAnimatedStyle(() => { */ /* isso é a função q faz animar e vc tem q passar essa constante no local q vc quer dar a animação */
       /*  return {
            transform: [
                {
                    translateX: withTiming(animation.value, { */
                        /* duration: 3000, */ /* ai é o tempo q dura/demora para que a animação ocorra(termine) */
                        /* easing: Easing.bezier(.01, 1.07, 1, -1) */ /* tem varias coisas dentro do easing, mas o bezier é o q permite voce criar a sua propria maneira de como a animação vai se comportar. Voce pode ver o que colocar dentro do bezier no site q esta nos meus favoritos*/
                    /* })
                } *//* esse withTiming faz com que a transição nao seja um salto e faça com que seja suave*/
            /*] 
        }
    }) */

   /*  const handleAnimationPosition = () => {
        animation.value = Math.random() * (WIDTH - 100)//tirei 100 pra descontar a largura da caixa
    }

   return (
      <Container>
        <Animated.View style={[styles.box, animatedStyles]} /> */{/* animated.view é o view do proprio pode ser animated.text q é um texto animado e ai vai. Uma caracteristica de animação, cada mudança q voce fizer vc tem q recarregar a aplicação */}
       {/*  <Button title='Mover' onPress={handleAnimationPosition} />
      </Container>
   );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red'
    }
})

export default Splash; */}

/* tem que baixar a lib do splash e ir la em app.json e adicionar o que ta em splash, no meu figma tem um layoult para adicionar o svg para deixar no meio  */

import React, { useEffect } from 'react';
import {Container} from './styles';
import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import Animated, {useSharedValue, useAnimatedStyle, withTiming, interpolate, Extrapolate, runOnJS} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const splashAnimation = useSharedValue(0) // do 0 -> até 50

    const navigation = useNavigation<any>()

    const brandStyle = useAnimatedStyle(() => {
        return  {
            opacity: interpolate(splashAnimation.value, 
                [0, 50], /* consegue interpolar as etapas da sua animação */
                [1, 0], /* e ai vc coloca o valor de cada etapa q vc colocou no array de cima */
                Extrapolate.CLAMP /* isso é pra ele nunca ultrapassar o limite */
                /* RESUMINDO QUANDO O VALOR DO SPLASH FOR 0 A OPACIDADE VAI SER 1 E ASSIM POR DIANTE E O INTERPOLATE FAZ ISSO GRADATIVAMENTE*/
            ),
            transform: [{
                translateX: interpolate(splashAnimation.value, 
                [0, 50],
                [0, -50],
                Extrapolate.CLAMP
            )
            }]
        }
    })

    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value, 
                [0, 50],
                [0, 1],
                Extrapolate.CLAMP
            ),
            transform: [{
                translateX: interpolate(splashAnimation.value, 
                [0, 50],
                [-50, 0],
                Extrapolate.CLAMP
            )
            }]
        }
    })

    const startApp = () => {
        navigation.navigate('SignIn')
    }

    useEffect(() => {
        splashAnimation.value = withTiming(50, {duration: 1000}, () => {
            'worklet'/* para que possa navegar quando terminar a animação */
            runOnJS(startApp)() 
        })
    }, [])

   return (
      <Container>
        <Animated.View style={[brandStyle, {position: 'absolute'}]}>
            <BrandSvg width={80} height={50} />
        </Animated.View>
        <Animated.View style={[logoStyle, {position: 'absolute'}]}>
            <LogoSvg width={180} height={20} />
        </Animated.View>
      </Container>
   );
}

export default Splash;