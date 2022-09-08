import React, { useState } from 'react';
import {Container, IconContainer, InputText} from './styles';
import { useTheme } from 'styled-components';
import {Feather} from '@expo/vector-icons'
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name']//esse colchete é para pegar so os nomes
    value: string;
}

const Input = ({iconName, value, ...rest}: InputProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)

    const theme = useTheme()

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
    }

   return (
      <Container>
        <IconContainer isFocused={isFocused}>
            <Feather name={iconName} size={24} color={isFocused ? theme.colors.main : isFilled ? theme.colors.main : theme.colors.text_detail} />
        </IconContainer>
        <InputText isFocused={isFocused} onFocus={handleFocused} onBlur={handleFilled} value={value} {...rest} />
      </Container>
    );
}

export default Input;