import React from 'react';
import {Container, Details, Brand, Name, About, Rent, Period, Price, Type, CarImage} from './styles';
import GasolineSvg from '../../assets/gasoline.svg';
import { RectButtonProps } from 'react-native-gesture-handler';
import { CarDTO } from '../../dtos/CarDTO';
import { SvgProps } from 'react-native-svg';
/* import getAccessoryIcon from '../../utils/getAccessoryIcon'; */

interface Props extends RectButtonProps {
    data: CarDTO
    icon: React.FC<SvgProps>
}

const Car = ({data, icon: Icon, ...rest}: Props) => {
    /* const MotorIcon = getAccessoryIcon(data.fuel_type) poderia ser fazendo assim tbm, e ai o MotorIcon voce passa la onde esta o Icon*/

    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.period}</Period>
                        <Price>{`RS ${data.price}`}</Price>
                    </Rent>
                    <Type>
                        <Icon />
                        {/* <MotorIcon /> */}
                    </Type>
                </About>
            </Details>
            <CarImage source={{uri: data.thumbnail}} resizeMode='contain' />{/* isso dai ele a image se ajusta */}
        </Container>
    );
}

export default Car;