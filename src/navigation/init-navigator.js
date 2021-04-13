import { createStackNavigator } from 'react-navigation-stack';
import InitScreen from '_screens';

const InitNavigator = createStackNavigator(
  {
    Init: {
      screen: InitScreen,
    },
  },
  {
    initialRouteName: 'Init',
    headerMode: 'none',
  },
);

export default InitNavigator;
