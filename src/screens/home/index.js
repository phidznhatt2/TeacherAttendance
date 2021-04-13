import PropTypes from 'prop-types';
import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { getUserById } from '_redux/actions/user';

export async function requestLocationPermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('[Permissions]', 'Location Permission granted');
      } else {
        console.log('[Permissions]', 'Location Permission denied');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

const HomeScreen = props => {
  React.useEffect(async () => {
    // Request Location
    await requestLocationPermission();

    await AsyncStorage.getItem('uuid').then(id => props.getUserById(id));
  }, []);

  const { isLoading } = props.user;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#1890ff" />
        ) : (
          <Text>Home</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

HomeScreen.propTypes = {
  getUserById: PropTypes.func,
  user: PropTypes.shape({
    isLoading: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUserById })(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
