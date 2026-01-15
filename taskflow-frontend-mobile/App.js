import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskHomeScreen from './src/screens/TaskHomeScreen';
import TaskDetails from './src/screens/TaskDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={TaskHomeScreen}
          options={{ title: 'Le mie Task' }}
        />

        <Stack.Screen
          name="Details"
          component={TaskDetails}
          options={{ title: 'Dettaglio Task' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}