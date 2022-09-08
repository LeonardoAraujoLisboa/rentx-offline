import styled from "styled-components/native";

interface Props {
    active: boolean;
}

export const Container = styled.View<Props>`
    width: 6px;
    height: 6px;
    background-color: ${({active, theme}) => active ? theme.colors.title : theme.colors.shape};
    border-radius: 50%;
    margin-right: 8px;
`