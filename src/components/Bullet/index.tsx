import React from 'react';
import {Container} from './styles';

interface Props {
    active?: boolean;
}

const Bullet = ({active = false}: Props) => {//ele começa setado como false
   return (
      <Container active={active} />
   );
}

export default Bullet;