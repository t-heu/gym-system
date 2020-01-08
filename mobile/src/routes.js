import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import colors from './styles/colors';

import signIn from './pages/SignIn';

import CheckIns from './pages/CheckIns';
import HelpOrders from './pages/HelpOrders';
import Settings from './pages/Settings';

import OrderHelp from './pages/OrderHelp';
import OrderNew from './pages/OrderNew';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          signIn,
        }),
        App: createBottomTabNavigator(
          {
            CheckIns,
            HelpOrders,
            Settings,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: colors.primary,
              inactiveTintColor: colors.grayLight,
              style: {
                backgroundColor: '#fff',
                height: 70,
              },
              labelStyle: {
                fontSize: 14,
              },
            },
          }
        ),
        Answer: {
          screen: createStackNavigator({
            OrderHelp,
          })
        },
        Add: {
          screen: createStackNavigator({
            OrderNew,
          })
        },
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
