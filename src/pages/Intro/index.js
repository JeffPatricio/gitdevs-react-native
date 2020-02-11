import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Title } from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const Intro = ({ navigation }) => {
  return (
    <Container>
      <Icon name='github' size={120} color='#FFF' />
      <Title>GitDevs</Title>
      <ActivityIndicator color="#FFF" />
    </Container>
  )
}

export default Intro;
