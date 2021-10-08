import React, { FC, useState } from 'react';
import AppContainer from './navigation/AppNavigation';
import { Provider } from 'react-redux';
import createStore from './redux/store';

export const { store, persistor } = createStore();
const App: FC = () => {
  return (

    <Provider store={store}>   
        <AppContainer />
    </Provider>

  );
};


export default App;