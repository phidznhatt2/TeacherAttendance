import React from 'react';
import { GoBackIcon } from '_components/Icon';
import InitScreen from './initScreen';
import Home from './home';
import Attendance from './attendance';
import DetailCourse from './attendance/components/DetailCourse';
import DetailSchedule from './attendance/components/DetailSchedule';
import Screen from './Screen';

export default InitScreen;

export const HomeScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Trang chủ">
    <Home />
  </Screen>
);
export const AttendanceScreen = ({ navigation }) => (
  <Screen navigation={navigation} name="Khóa học" marginTop={0}>
    <Attendance navigation={navigation} />
  </Screen>
);

export const DetailCourseScreen = ({ navigation }) => (
  <Screen
    navigation={navigation}
    name={navigation.state.params.title}
    marginTop={0}
    iconLeft={<GoBackIcon navigation={navigation} />}>
    <DetailCourse navigation={navigation} />
  </Screen>
);

export const DetailScheduleScreen = ({ navigation }) => (
  <Screen
    navigation={navigation}
    name={navigation.state.params.title}
    marginTop={0}
    iconLeft={<GoBackIcon navigation={navigation} />}>
    <DetailSchedule navigation={navigation} />
  </Screen>
);
