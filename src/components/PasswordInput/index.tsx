import React, { useState } from 'react';
import {Container, IconContainer, InputText} from './styles';
import { useTheme } from 'styled-components';
import {Feather} from '@expo/vector-icons'
import { TextInputProps } from 'react-native';
import { BorderlessButton } from "react-native-gesture-handler";

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];//esse colchete é para pegar so os nomes
    value: string;
}

const PasswordInput = ({iconName, value, ...rest}: InputProps) => {
  const theme = useTheme()

  const [isPasswordVisible, setIsPasswordVisible] = useState<Boolean>(true)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleFocused = () => {
      setIsFocused(!isFocused)
      setIsFilled(false)
  }

  const handleFilled = () => {
    setIsFocused(false)
    if (value === '') {
        setIsFilled(false)
    } else {
        setIsFilled(true)
    }
    //setIsFilled(!!value)/* ou seja, tem conteúdo é verdadeiro, nao tem conteúdo é falso */
  }

   return (
      <Container>
        <IconContainer isFocused={isFocused}>
            <Feather name={iconName} size={24} color={isFocused ? theme.colors.main : isFilled ? theme.colors.main : theme.colors.text_detail} />
        </IconContainer>
        <InputText isFocused={isFocused} onFocus={handleFocused} onBlur={handleFilled} secureTextEntry={isPasswordVisible} {...rest} />
        <BorderlessButton onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <IconContainer>
            <Feather name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color={theme.colors.text_detail} />
          </IconContainer>
        </BorderlessButton>
      </Container>
    );
}

export default PasswordInput;