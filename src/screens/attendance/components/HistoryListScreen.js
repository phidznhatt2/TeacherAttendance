import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { getStudentBySchedule } from '_redux/actions/teacher';

const HistoryListScreen = props => {
  useEffect(() => {
    const { idSchedule } = props;
    props.getStudentBySchedule(idSchedule);
  }, []);

  const renderHistory = historyList =>
    !_.isEmpty(historyList) &&
    historyList.map((ite, idx) => (
      <ListItem key={idx} style={styles.historyListItem}>
        <ListItem.Content>
          <ListItem.Title>{ite.name}</ListItem.Title>
        </ListItem.Content>
        <Icon
          type="ionicon"
          name={ite.status ? 'checkmark-circle' : 'close-circle'}
          color={ite.status ? 'green' : 'red'}
        />
      </ListItem>
    ));

  const { isLoading, studentList } = props.teacher;

  return isLoading ? (
    <ActivityIndicator size="large" color="#1890ff" animating={isLoading} />
  ) : (
    <>
      {!_.isEmpty(studentList) ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {renderHistory(studentList)}
        </ScrollView>
      ) : (
        <Text>Không có dữ liệu!</Text>
      )}
    </>
  );
};

HistoryListScreen.propTypes = {
  getStudentBySchedule: PropTypes.func,
  idSchedule: PropTypes.any,
  teacher: PropTypes.shape({
    isLoading: PropTypes.any,
    studentList: PropTypes.any,
  }),
};

const mapStateToProps = state => ({
  teacher: state.teacher,
});

export default connect(mapStateToProps, {
  getStudentBySchedule,
})(HistoryListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyListItem: {
    alignItems: 'center',
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 1,
  },
});
