import React from 'react';
import {Container, Title} from './styles';
import {RectButtonProps} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components'

interface Props extends RectButtonProps {
    title: string;
    color?: string;
    loading?: boolean;
    light?: boolean;
}

const Button = ({title, enabled, color, loading, light = false, ...rest}: Props) => {
    const theme = useTheme();

   return (
      <Container {...rest} color={color ? color : theme.colors.main} style={{opacity: (enabled === true || loading === true) ? 1 : .5}}>
          {loading ? <ActivityIndicator color={theme.colors.background_secondary} /> : <Title light={light}>{title}</Title>}
      </Container>
   );
}

export default Button;