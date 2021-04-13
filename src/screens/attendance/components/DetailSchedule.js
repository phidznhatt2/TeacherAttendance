import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DeviceListScreen from './DeviceListScreen';
import HistoryListScreen from './HistoryListScreen';

const DetailSchedule = props => {
  const { idSchedule, isDate } = props.navigation.state.params;

  return (
    <View style={styles.container}>
      {isDate ? (
        <DeviceListScreen idSchedule={idSchedule} />
      ) : (
        <HistoryListScreen idSchedule={idSchedule} />
      )}
    </View>
  );
};

DetailSchedule.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        idSchedule: PropTypes.any,
        isDate: PropTypes.any,
      }),
    }),
  }),
};

export default DetailSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
