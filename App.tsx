import React, { Component } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Components / Page
import Profile from './src/components/pages/Profile'
import Landing from './src/components/auth/Landing';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';
import ComicDetail from './src/components/ComicDetail';
import Comics from './src/components/Comics';

// Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


// Atributes
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Firabase
import auth from '@react-native-firebase/auth';

export class App extends Component {
  // Constructor + states
  constructor(props) {
    super(props)

    this.state = {
      active: false
    }
  }

  // Get user by component DidMount()
  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          active: false
        })
      }
      else {
        this.setState({
          active: true
        })
      }
    })
  }


  // Render method
  render() {
    const { active } = this.state

    // Send multiple componnents as children for one tab
    const createHomeStack = () =>
      <Stack.Navigator>
        <Stack.Screen name="Comics" component={Comics} />
        <Stack.Screen name="ComicsDetail" component={ComicDetail} />
      </Stack.Navigator>



    if (!active) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing" component={Landing} options={{headerShown: false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    else {
      return (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen 
              name="Home" 
              children={createHomeStack} 
              // options={{
              //   tabBarIcon: ({ color }) => (
              //     <MaterialComunityIcons name="fridge-outline" color={color} size={24} style={{
              //       paddingBottom: 0,
              //       marginBottom: 0,
              //     }} />
              //   )
              // }}
            />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      )
    }
  }
};

const styles = StyleSheet.create({
});

export default App;
