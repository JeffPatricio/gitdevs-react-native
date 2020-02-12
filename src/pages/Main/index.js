import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container, ContainerEmpty, Form, FieldsForm, Input, SubmitButton, Erro, List, User, Avatar,
  Name, Bio, ContainerActions, DeleteButton, ProfileButton, ProfileButtonText, DataEmpty
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

const Main = ({ navigation, usersRegistered }) => {

  const [newUser, setNewUSer] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => setUsers(usersRegistered), [])
  useEffect(() => { AsyncStorage.setItem('users', JSON.stringify(users)) }, [users])

  const handleAddUser = async () => {
    if (!newUser.length) return
    if (users.filter(user => user.login === newUser).length) {
      return setErro('O usuário informado já está cadastrado')
    }
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
      setErro('O usuário informado não foi encontrado')
    } finally {
      setNewUSer('');
      setLoading(false);
      Keyboard.dismiss();
    }
  }

  const handleViewUser = (user) => { navigation.navigate('User', { user }) }
  const handleDeleteUser = (user) => { setUsers(users.filter(userArr => userArr.login !== user.login)) }

  return (
    <Container>
      <Form>
        <FieldsForm>
          <Input
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Adicionar Usuário'
            value={newUser}
            onChangeText={text => { setNewUSer(text); setErro('') }}
            returnKeyType='send'
            onSubmitEditing={handleAddUser}
            erro={erro.length > 0}
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
          (erro.length > 0) && <Erro>{erro}</Erro>
        }
      </Form>
      {
        (!usersRegistered.length && !users.length) ? (
          <ContainerEmpty>
            <Icon name='close' size={40} color='#ccc' />
            <DataEmpty>Não há devs cadastrados</DataEmpty>
          </ContainerEmpty>
        ) : (
            <List
              data={users}
              keyExtractor={user => user.login}
              renderItem={({ item }) => (
                <User>
                  <Avatar source={{ uri: item.avatar }} />
                  <Name>{item.name || '(Sem Nome)'}</Name>
                  <Bio>{item.bio}</Bio>
                  <ContainerActions>
                    <DeleteButton onPress={() => handleDeleteUser(item)}>
                      <Icon name='delete' size={20} color='#999' />
                    </DeleteButton>
                    <ProfileButton onPress={() => handleViewUser(item)}>
                      <ProfileButtonText>Ver Perfil</ProfileButtonText>
                    </ProfileButton>
                  </ContainerActions>
                </User>
              )}
            />
          )
      }
    </Container>
  )
}

export default Main;
