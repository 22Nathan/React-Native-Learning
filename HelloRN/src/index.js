/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import {
   AppRegistry,
   Text,
   View
 } from 'react-native';
 import { StackNavigator } from 'react-navigation';
 import WelcomePage from './pages/WelcomePage'
 import HomePage from './pages/HomePage'

 export const HelloRN = StackNavigator({
   Welcome: { screen: WelcomePage },
   Home: {screen: HomePage},
 });

AppRegistry.registerComponent('HelloRN', () => HelloRN);
