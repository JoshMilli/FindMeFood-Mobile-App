
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CatSelectionScreen from './screens/CatSelectionScreen';
import MainScreen from './screens/MainScreen'
import {auth} from '../my-app/firebase-config'
import API from '../my-app/components/api';


const Stack = createNativeStackNavigator();
const user = auth.currentUser?.email


export default function App() {
  return (

<NavigationContainer>
  <Stack.Navigator>
      
      <Stack.Screen options={{headerShown: true, title:'FMF'} } name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown: true, title: user}} name="Category" component={CatSelectionScreen} />
      <Stack.Screen options={{headerShown: false, title:'Spin The Wheel'}} name="MainPage" component={MainScreen} />
      <Stack.Screen options={{headerShown: false, title:''} } name="api" component={API} /> 
      
  </Stack.Navigator>
</NavigationContainer>
  
  );
}

