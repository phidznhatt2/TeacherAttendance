import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const InitScreen = props => {
  React.useEffect(() => {
    initAsync();
  }, []);

  const initAsync = async () => {
    await AsyncStorage.getItem('accessToken')
      .then(token => {
        props.navigation.navigate(token ? 'App' : 'Auth');
      })
      .catch(err => console.log(err));
  };
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default InitScreen;

const styles = StyleSheet.create({});
