import React, { Fragment } from 'react';
import { StatusBar } from 'react-native';
import './config/Reactotron';
import Routes from './routes';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
      <Routes />
    </Fragment>
  )
}

export default App;
