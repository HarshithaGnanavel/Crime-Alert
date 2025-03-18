import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CrimeDetailsScreen from '../screens/CrimeDetailsScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const { user } = useAuth();
  if(user)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='CrimeDetailsScreen'>
          <Stack.Screen name="CrimeDetailsScreen" options={{headerShown: false}} component={CrimeDetailsScreen} />
          <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}