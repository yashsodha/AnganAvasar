import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../constants';
import { JanoiScreen } from '../modules/Janoi';
import { HomeScreen } from '../modules/Home';
import { SanjiScreen } from '../modules/Sanji';
import { JaanScreen } from '../modules/Jaan';
import { KankotriScreen } from '../modules/Kankotri';




type RootStackParamList = {
  // add types for route params here e.g. -
  // [ROUTES.Profile]: { id: string };
  [ROUTES.Home]: undefined;
  [ROUTES.Janoi]: undefined;
  [ROUTES.Sanji]: undefined;
  [ROUTES.Jaan]: undefined;
  [ROUTES.Kankotri]: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();


const AppContainer = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen name={ROUTES.Home} component={HomeScreen} />
      <RootStack.Screen name={ROUTES.Janoi} component={JanoiScreen} />
      <RootStack.Screen name={ROUTES.Sanji} component={SanjiScreen} />
      <RootStack.Screen name={ROUTES.Jaan} component={JaanScreen} />
      <RootStack.Screen name={ROUTES.Kankotri} component={KankotriScreen} />

    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppContainer;
