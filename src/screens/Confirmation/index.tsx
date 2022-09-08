import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { StatusBar } from 'react-native';
import {Container, Content, Title, Message, Footer} from './styles';
import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { useWindowDimensions } from 'react-native';/* ele voce usa em lugares dentro componente react, pois é um hook. Já o dimensions voce usa em styled components... */
import ConfirmButton from '../../components/ConfirmButton';

interface Params {
  title: string;
  message: string;
  nextScreenRoute: string;
}

const Confirmation = () => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<any>();
    const route = useRoute()

    const {title, message, nextScreenRoute} = route.params as Params

    const handlePress = () => {
        navigation.navigate(nextScreenRoute)
     }

   return (
      <Container>
          <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
          <LogoSvg width={width} />
          <Content>
              <DoneSvg width={80} height={80} />
              <Title>{title}</Title>
              <Message>{message}</Message>
              <Footer>
                <ConfirmButton title='ok' onPress={handlePress} />
              </Footer>
          </Content>
          
      </Container>
   );
}

export default Confirmation;