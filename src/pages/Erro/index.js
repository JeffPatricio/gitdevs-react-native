import React from 'react';
import { Container, Error } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Erro = () => {
  return (
    <Container>
      <Icon name='error-outline' size={60} color='#FFF' />
      <Error>Ocorreu um erro na busca dos usuários cadastrados</Error>
    </Container>
  )
}

export default Erro;
