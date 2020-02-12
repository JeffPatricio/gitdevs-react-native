import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { Container, ContainerLoading, ContainerEmpty, DataEmpty, Header, Avatar, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title, Author } from './styles';

const User = ({ route, navigation }) => {

  const { user } = route.params;
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);

  navigation.setOptions({ title: user.name || 'Usuário Desconhecido' });

  useEffect(() => {
    (async () => {
      const response = await api.get(`/users/${user.login}/starred`);
      setStars(response.data);
      setLoading(false);
    })()
  }, []);

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name || '(Sem Nome)'}</Name>
        <Bio>{user.bio}</Bio>
      </Header>
      {
        loading ? (
          <ContainerLoading>
            <ActivityIndicator color="#7159c1" />
          </ContainerLoading>
        ) : (
            (stars.length > 0) ? (
              <Stars
                data={stars}
                keyExtractor={star => String(star.id)}
                renderItem={({ item }) => (
                  <Starred>
                    <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                    <Info>
                      <Title>{item.name}</Title>
                      <Author>{item.owner.login}</Author>
                    </Info>
                  </Starred>
                )}
              />
            ) : (
                <ContainerEmpty>
                  <Icon name='close' size={40} color='#ccc' />
                  <DataEmpty>O usuário não possui repositorios favoritos</DataEmpty>
                </ContainerEmpty>
              )
          )
      }
    </Container>
  )
}

export default User;
