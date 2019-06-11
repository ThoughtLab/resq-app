import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import SignInScreen from '../screens/auth/SignIn';

export default createSwitchNavigator({
  SignIn: SignInScreen,
});
