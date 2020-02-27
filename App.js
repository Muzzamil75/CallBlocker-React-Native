/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import AppNavigator from './app/Navigator/AppNavigator';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';
// import Reducer from './app/ReduxThunk/Store/reducer';
// export const store = createStore(Reducer);

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <AppNavigator />
      // </Provider >
    )
  }
}
