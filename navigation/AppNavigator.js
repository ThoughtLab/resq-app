import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

export default createAppContainer(createSwitchNavigator({
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: AuthNavigator,
  // You could add another route here for authentication.
  Main: MainTabNavigator
}));
