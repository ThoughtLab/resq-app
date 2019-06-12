import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HelpeeScreen from '../screens/HelpeeScreen';
import HelperScreen from '../screens/HelperScreen';
import MapScreen from '../screens/MapScreen';
import SignInScreen from '../screens/auth/SignIn';

const HelpeeStack = createStackNavigator({
  Home: HelpeeScreen,
});

HelpeeStack.navigationOptions = {
  tabBarLabel: 'Helpee',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/helpee.png')}
      style={styles.tabBarIcon}
    />
  ),
};

const HelperStack = createStackNavigator({
  Links: HelperScreen,
});

HelperStack.navigationOptions = {
  tabBarLabel: 'Helper',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/helper.png')}
      style={styles.tabBarIcon}
    />
  ),
};

const MapStack = createStackNavigator({
  Links: MapScreen,
});

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/map.png')}
      style={styles.tabBarIcon}
    />
  ),
};

const SignInStack = createStackNavigator({
  Links: SignInScreen,
});

SignInStack.navigationOptions = {
  tabBarLabel: 'SignIn',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/signIn.png')}
      style={styles.tabBarIcon}
    />
  ),
};

export default createBottomTabNavigator({
    SignInStack,
    HelperStack,
    HelpeeStack,
    MapStack,

  }
);

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    marginBottom: 3,
  }
});
