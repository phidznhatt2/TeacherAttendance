/* eslint-disable react/display-name */
import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  HomeScreen,
  AttendanceScreen,
  DetailCourseScreen,
  DetailScheduleScreen,
} from '_screens';
import { Sidebar } from '_components';
import stylesByPlatform from '_utils/font';

const AttendanceStack = createStackNavigator(
  {
    Attendance: {
      screen: AttendanceScreen,
      navigationOptions: {
        headerTitle: 'Attendance',
      },
    },
    DetailCourse: {
      screen: DetailCourseScreen,
      navigationOptions: {
        headerTitle: 'DetailCourse',
      },
    },
    DetailSchedule: {
      screen: DetailScheduleScreen,
      navigationOptions: 'DetailSchedule',
    },
  },
  { initialRouteName: 'Attendance', headerMode: 'none' },
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Trang chủ',
        drawerIcon: ({ tintColor }) => (
          <Icon type="font-awesome-5" name="home" size={16} color={tintColor} />
        ),
      },
    },
    Attendance: {
      screen: AttendanceStack,
      navigationOptions: {
        title: 'Điểm danh',
        drawerIcon: ({ tintColor }) => (
          <Icon
            type="font-awesome-5"
            name="calendar-check"
            size={16}
            color={tintColor}
          />
        ),
      },
    },
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    initialRouteName: 'Home',
    drawerWidth: Dimensions.get('window').width * 0.85,

    contentOptions: {
      activeBackgroundColor: 'rgba(212, 118, 207, 0.2)',
      activeTintColor: '#531158',
      itemsContainerStyle: {
        marginTop: 16,
        marginHorizontal: 8,
      },
      itemStyle: {
        borderRadius: 4,
      },
      labelStyle: {
        ...stylesByPlatform,
      },
    },
  },
);

const AppNavigator = createAppContainer(DrawerNavigator);

export default AppNavigator;
