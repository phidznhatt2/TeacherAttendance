import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import InitNavigator from './init-navigator';

const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
    Init: InitNavigator,
  },
  {
    initialRouteName: 'Init',
  },
);

export default createAppContainer(RootNavigator);
