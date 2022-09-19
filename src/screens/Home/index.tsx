import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import Car from '../../components/Car';
import LoadAnimation from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';
import getAccessoryIcon from '../../utils/getAccessoryIcon';
import {Container, Header, HeaderContent, TotalCars, CarList} from './styles';
/* import {useNetInfo} from '@react-native-community/netinfo' */
/* import {RectButton, PanGestureHandler esse ultimo identifica quando o usuario ta clicando e tentando arrastar} from 'react-native-gesture-handler' */

const Home = () => {
  /*  const theme = useTheme(); */
   /* const netInfo = useNetInfo() */
   const navigation = useNavigation<any>();
   const [cars, setCars] = useState<CarDTO[]>([]);
   const [loading, setLoading] = useState(Boolean)

   /* const positionX = useSharedValue(0)
   const positionY = useSharedValue(0) */

   /* const myCarsButtonStyles = useAnimatedStyle(() => {
      return  {
         transform: [
            {translateX: positionX.value},
            {translateY: positionY.value}
         ]
      }
   }) */

   /* const onGestureEvent = useAnimatedGestureHandler({
      onStart(event, ctx: any) {//ctx -> contexto
         ctx.positionX = positionX.value
         ctx.positionY = positionY.value
      },
      onActive(event, ctx: any) {
         positionX.value = ctx.positionX + event.translationX
         positionY.value = ctx.positionX + event.translationY
      },
      onEnd() { */
         /* positionX.value = withSpring(0) *///fazendo isso eu to fazendo com que o botao volte pro lugar original
         /* positionY.value = withSpring(0) */
     /*  }
   }) */

   const handlePress = (car: CarDTO) => {
      navigation.navigate('CarDetails', {car})
   }

   const getCars = async (isMounted: boolean) => {
      try {
         setLoading(true);
         const res = await api.get('/cars');
         if(isMounted) {
            setCars(res.data);//TEM QUE ENVOLVER EM TODOS OS ESTADOS
            setLoading(false);
         }
         console.log('ola', res)
      } catch(error) {
         if(isMounted) {
            setLoading(false);
         }
         console.log(error);
      }
   }

   /* const handleOpenMyCars = () => {
      navigation.navigate('MyCars');
   } */

   useEffect(() => {
      let isMounted = true
      getCars(isMounted);
      return () => {
         isMounted = false
      }//isso dai resolve o erro de performace no react do elemento desmontado
   }, [])

   /* useEffect(() => {
      if (netInfo.isConnected) {
         Alert.alert('Você está conectado')
      } else {
         Alert.alert('Você está off')
      }
   }, [netInfo.isConnected]) so fiz pra saber se esta online ou nao */

   /* useEffect(() => {
      let isMounted = true
      const getCars = async () => {
         try {
            setLoading(true);
            const res = await api.get('/cars');
            if(isMounted) {
               setCars(res.data);
            }
            setLoading(false);
            console.log('ola', res)
         } catch(error) {
            if(isMounted) {
               setLoading(false);
            }
            console.log(error);
         }
      }
      getCars()
      return () => {
         isMounted = false
      }
   }, []) OOOOUUU PODE SER ASSIM */

   /* useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', () => {
         return true
      })//essa função previne q o usuario clique no botao de voltar dentro da pagina home, pq se voltar ele vai para a tela de splash e eu nao quero isso, mas isso dai seria pra android tem q fazer pra ios tbm 
   }, []) posso retirar pq ja estou trabalhando com rotas autenticadas*/

   return (
      <Container>
         <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />{/* o translucent ele começa onde o statusbar começa e nao depois ai a barra dele sobre */}
         <Header>
            <HeaderContent>
               <Logo width={RFValue(108)} height={RFValue(12)}/>
               {!loading && <TotalCars>Total: {cars.length} carros</TotalCars>}
            </HeaderContent>
         </Header>
         {loading ? <LoadAnimation /> : <CarList data={cars} keyExtractor={item => item.id} renderItem={({item}) => <Car data={item} icon={getAccessoryIcon(item.fuel_type)} onPress={() => handlePress(item)} />}/>}
         {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={[myCarsButtonStyles, {position: 'absolute', bottom: 13, right: 22}]}>
               <ButtonAnimated onPress={handleOpenMyCars} style={[styles.button, {backgroundColor: theme.colors.main}]}>
                  <Ionicons name='ios-car-sport' size={32} color={theme.colors.background_secondary}/>
               </ButtonAnimated>
            </Animated.View>
         </PanGestureHandler> retirei pq coloquei navegação no bottom*/}
      </Container>
   );
}

/* const styles = StyleSheet.create({
   button: {
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
   }
}) */

export default Home;