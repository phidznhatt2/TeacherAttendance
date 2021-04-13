import React from 'react';
import {
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getSchedule } from '_redux/actions/schedule';
import _ from 'lodash';
import { ListItem, Icon, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const TimeStart = {
  1: '7:30',
  2: '8:15',
  3: '9:00',
  4: '10:00',
  5: '10:45',
  6: '13:00',
  7: '13:45',
  8: '14:30',
  9: '15:30',
  10: '16:15',
};

const TimeEnd = {
  1: '8:15',
  2: '9:00',
  3: '9:45',
  4: '10:45',
  5: '11:30',
  6: '13:45',
  7: '14:30',
  8: '15:15',
  9: '16:15',
  10: '17:00',
};

const DetailCourse = props => {
  React.useEffect(() => {
    const { id: idCourse } = props.navigation.state.params;
    const { id: idTeacher } = props.user.userInfo;
    props.getSchedule({ idCourse, idTeacher });
  }, []);

  const getTimeDuration = (start, end) =>
    `${TimeStart[start]} - ${TimeEnd[end]}`;

  const checkDateTime = d => {
    const date = new Date(d).toLocaleDateString();
    const today = new Date().toLocaleDateString();

    return today === date;
  };

  return (
    <View style={styles.container}>
      {props.schedule.isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={props.schedule.isLoading}
        />
      ) : (
        <>
          {!_.isEmpty(props.schedule.scheduleList) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={{ marginTop: 20 }}>
                {props.schedule.scheduleList.map((l, i) => (
                  <ListItem
                    key={i}
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95} //
                    linearGradientProps={{
                      colors: ['#ECE9E6', '#fff'],
                      start: { x: 0, y: 0 },
                      end: { x: 1, y: 0 },
                    }}
                    ViewComponent={LinearGradient} // Only if no expo
                    containerStyle={styles.listContainer}
                    onPress={() =>
                      props.navigation.navigate('DetailSchedule', {
                        idSchedule: l.id_Schedule,
                        isDate: checkDateTime(l.date),
                        title: checkDateTime(l.date) ? 'Điểm danh' : 'Lịch sử',
                      })
                    }>
                    <ListItem.Content style={styles.content}>
                      <View style={styles.subView}>
                        <Icon
                          style={styles.icon}
                          name="map-marker-outline"
                          type="material-community"
                          size={16}
                          color="#797979"
                        />
                        <Text style={styles.text}>{l.nameClass}</Text>
                      </View>
                      <View style={styles.subView}>
                        <View
                          style={[
                            styles.subView,
                            { justifyContent: 'flex-start' },
                          ]}>
                          <Icon
                            style={styles.icon}
                            name="clock-outline"
                            type="material-community"
                            size={16}
                            color="#797979"
                          />
                          <Text style={styles.text}>
                            {getTimeDuration(l.timeBegin, l.timeEnd)}
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.text}>
                            {new Date(l.date).toLocaleDateString()}
                          </Text>
                        </View>
                      </View>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </View>
            </ScrollView>
          ) : (
            <Text>Không có dữ liệu!</Text>
          )}
        </>
      )}
    </View>
  );
};
const mapStateToProps = state => ({
  user: state.user,
  schedule: state.schedule,
});

export default connect(mapStateToProps, { getSchedule })(DetailCourse);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  listContainer: {
    borderRadius: 10,
    elevation: 4,
    marginBottom: 20,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    width: width * 0.85,
  },
  subView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: '#797979',
    fontSize: 16,
  },
});
