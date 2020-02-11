import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Intro from './pages/Intro';
import Erro from './pages/Erro';
import Main from './pages/Main';
import User from './pages/User';
const Stack = createStackNavigator();

const Routes = () => {

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const users = await AsyncStorage.getItem('users');
        if (users) { setUsers(JSON.parse(users)) }
      } catch (error) {
        setErro(true)
      } finally {
        setTimeout(() => setLoading(false), 500)
      }
    })()
  }, [])

  if (erro) return (<Erro />)
  if (loading) return (<Intro />)

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#7159c1' },
        headerBackTitleVisible: false,
        headerLayoutPreset: 'center',
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center'
      }}>
        <Stack.Screen name='Main' options={{ title: 'Usuários' }}>
          {props => <Main {...props} usersRegistered={users} />}
        </Stack.Screen>
        <Stack.Screen name='User' component={User} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;
