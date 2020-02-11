import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Form, FieldsForm, Input, SubmitButton, Erro, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import { set } from 'react-native-reanimated';

const Main = ({ navigation, usersRegistered }) => {

  const [newUser, setNewUSer] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)

  useEffect(() => setUsers(usersRegistered), [])
  useEffect(() => { AsyncStorage.setItem('users', JSON.stringify(users)) }, [users])

  const handleAddUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${newUser}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url
      }
      setUsers([...users, data]);
    } catch (error) {
      setErro(true)
    } finally {
      setNewUSer('');
      setLoading(false);
      Keyboard.dismiss();
    }
  }

  const handleViewUser = (user) => { navigation.navigate('User', { user }) }

  return (
    <Container>
      <Form>
        <FieldsForm>
          <Input
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Adicionar Usuário'
            value={newUser}
            onChangeText={text => { setNewUSer(text); setErro(false) }}
            returnKeyType='send'
            onSubmitEditing={handleAddUser}
            erro={erro}
          />
          <SubmitButton loading={loading} onPress={handleAddUser}>
            {
              loading ? (
                <ActivityIndicator color='#fff' />
              ) : (
                  <Icon name='add' size={20} color='#FFF' />
                )
            }
          </SubmitButton>
        </FieldsForm>
        {
          erro && <Erro>O usuário informado não foi encontrado</Erro>
        }
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleViewUser(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  )
}

export default Main;
