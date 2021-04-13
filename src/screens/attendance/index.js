import React from 'react';
import {
  Dimensions,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getCourseTeacher } from '_redux/actions/course';
import _ from 'lodash';
import { ListItem, Icon } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const AttendanceScreen = props => {
  React.useEffect(() => {
    props.getCourseTeacher(props.user.userInfo.id);
  }, []);

  const onRefresh = () => {
    props.getCourseTeacher(props.user.userInfo.id);
  };

  const messageSuccess = message => {
    Alert.alert('Thông báo', message, [{ text: 'OK' }]);
  };

  const messageError = message => {
    Alert.alert('Thông báo', message, [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      {props.course.isLoading ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={props.course.isLoading}
        />
      ) : (
        <>
          {!_.isEmpty(props.course.courseTeacher) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshControl={<RefreshControl onRefresh={onRefresh} />}>
              <View style={{ marginTop: 20 }}>
                {props.course.courseTeacher.map((l, i) => (
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
                    ViewComponent={LinearGradient}
                    containerStyle={styles.listContainer}
                    onPress={() =>
                      props.navigation.navigate('DetailCourse', {
                        id: l.id_Course,
                        title: l.name,
                      })
                    }>
                    <ListItem.Content style={styles.content}>
                      <ListItem.Title style={styles.title}>
                        {l.nameSubject}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        style={[styles.subTitle, { marginBottom: 2.5 }]}>
                        <View style={styles.subView}>
                          <Icon
                            style={styles.icon}
                            name="school"
                            type="material-community"
                            size={16}
                            color="#797979"
                          />
                          <Text style={styles.text}>{l.name}</Text>
                        </View>
                      </ListItem.Subtitle>
                      <ListItem.Subtitle>
                        <View style={styles.subView}>
                          <Icon
                            style={styles.icon}
                            name="clock-outline"
                            type="material-community"
                            size={16}
                            color="#797979"
                          />
                          <Text style={styles.text}>{l.schoolYear}</Text>
                        </View>
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="#797979" />
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
  course: state.course,
});

export default connect(mapStateToProps, { getCourseTeacher })(AttendanceScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {},
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
  subTitle: {},
  subView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#797979',
    fontSize: 16,
  },
  title: {
    color: '#797979',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
