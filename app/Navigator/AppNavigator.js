/* eslint-disable prettier/prettier */
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SplashScreen from '../Components/SplashScreen/SplashScreen';
import OnBoarding from '../Components/OnBoarding/OnBoarding';

const AuthStack = createStackNavigator(
  {
    // loading: {
    //   screen: SplashScreen,
    //   navigationOptions: {
    //     header: null,
    //   },
    // },
    onBoarding: {
      screen: OnBoarding,
    },
  },
  // {
  //   initialRouteName: 'loading',
  // },
);

const AppStack = createStackNavigator(
  {
    home: {
      screen: OnBoarding,
    },
  });

const SwitchNav = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Splash',
  },
);
export default createAppContainer(SwitchNav);
