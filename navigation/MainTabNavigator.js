import React from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import HelpeeScreen from '../screens/HelpeeScreen';
import LinksScreen from '../screens/LinksScreen';

const HomeStack = createStackNavigator({
  Home: HelpeeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Helpee',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/helpee.png')}
      style={styles.tabBarIcon}
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Helper',
  tabBarIcon: ({ focused }) => (
    <Image
      source={require('../assets/images/helper.png')}
      style={styles.tabBarIcon}
    />
  ),
};

export default createBottomTabNavigator({
    HomeStack,
    LinksStack
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
