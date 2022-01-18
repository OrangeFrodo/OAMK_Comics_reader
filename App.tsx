import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Windows
import Home from './src/components/pages/Home';
import Profile from './src/components/pages/Profile'
import Landing from './src/components/auth/Landing';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

// Firabase
import auth from '@react-native-firebase/auth';

const App = () => {

  // Get user
  const user = auth().currentUser

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
};

const styles = StyleSheet.create({
});

export default App;
