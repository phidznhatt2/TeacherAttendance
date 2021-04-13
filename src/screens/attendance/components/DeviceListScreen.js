/* eslint-disable function-paren-newline */
import PropTypes from 'prop-types';
import _ from 'lodash';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  Alert,
  ToastAndroid,
  ScrollView,
} from 'react-native';
import BLEAdvertiser from 'react-native-ble-advertiser';
import { BleManager } from 'react-native-ble-plx';
import { ListItem, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
  getEquipmentStudent,
  getStudentBySchedule,
  attendanceStudent,
  createRepo,
} from '_redux/actions/teacher';

// Uses the Apple code to pick up iPhones
// 0x02 0x15 android
const APPLE_ID = 0x4c;
const MANUF_DATA = [1, 0];
const manager = new BleManager();

BLEAdvertiser.setCompanyId(APPLE_ID);

export async function requestLocationPermission() {
  const checkLocationPermission = PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );

  if (checkLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
    return true;
  }
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }

  return false;
}

const Toast = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
};

const DeviceListScreen = props => {
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);
  const [devices, setDevices] = React.useState([]);
  const [discovering, setDiscovering] = useState(false);
  const [studentList, setStudentList] = React.useState([]);

  const checkBluetootEnabled = async () => {
    try {
      const enabled = await BLEAdvertiser.getAdapterState()
        .then(result => {
          console.log('[Bluetooth]', 'Bluetooth Status', result);
          return result === 'STATE_ON';
        })
        .catch(error => {
          console.log('[Bluetooth]', 'Bluetooth Not Enabled', error);
          return false;
        });

      if (!enabled) {
        requestEnabled();
      } else {
        setBluetoothEnabled(enabled);
      }
    } catch (error) {
      setBluetoothEnabled(false);
    }
  };

  const requestEnabled = () => {
    try {
      BLEAdvertiser.enableAdapter();
    } catch (error) {
      Toast(`Error occurred while enabling bluetooth: ${error.message}`);
    }
  };

  useLayoutEffect(() => {
    // get Info
    const { id } = props.user.userInfo;
    const { idCourse } = props.schedule;
    const { idSchedule } = props;

    props.getEquipmentStudent(idCourse);
    props.getStudentBySchedule(idSchedule);
    props.createRepo({ idSchedule, idCourse, id });
  }, []);

  useEffect(async () => {
    // check init status bluetooth
    await checkBluetootEnabled();

    // onChange bluetooth
    const eventEmitter = new NativeEventEmitter(NativeModules.BLEAdvertiser);
    const onBTStatusChange = eventEmitter.addListener('onBTStatusChange', e => {
      setBluetoothEnabled(e.enabled);
    });

    return () => {
      onBTStatusChange.remove();
      stopAttendance();
      manager.destroy();
    };
  }, []);

  useEffect(() => {
    setStudentList(props.teacher.studentList);
  }, [props.teacher.studentList]);

  const startAdvertising = async () => {
    const { id: uuid } = props.user.userInfo;
    try {
      console.log(uuid, 'Starting Advertising');
      await BLEAdvertiser.broadcast(uuid, MANUF_DATA, {
        advertiseMode: BLEAdvertiser.ADVERTISE_MODE_LOW_LATENCY,
        txPowerLevel: BLEAdvertiser.ADVERTISE_TX_POWER_LOW,
        connectable: false,
        includeDeviceName: false,
        includeTxPowerLevel: false,
      })
        .then(sucess => console.log(uuid, 'Adv Successful', sucess))
        .catch(error => console.log(uuid, 'Adv Error', error));

      console.log(uuid, 'Starting Scanner');
      await BLEAdvertiser.scan(MANUF_DATA, {
        scanMode: BLEAdvertiser.SCAN_MODE_LOW_LATENCY,
      })
        .then(sucess => console.log(uuid, 'Scan Successful', sucess))
        .catch(error => console.log(uuid, 'Scan Error', error));
    } catch (err) {
      Toast(err.message);
    }
  };

  const stopAdvertising = () => {
    const { id: uuid } = props.user.userInfo;
    console.log(uuid, 'Stopping Broadcast');
    BLEAdvertiser.stopBroadcast()
      .then(sucess => console.log(uuid, 'Stop Broadcast Successful', sucess))
      .catch(error => console.log(uuid, 'Stop Broadcast Error', error));

    console.log(uuid, 'Stopping Scanning');
    BLEAdvertiser.stopScan()
      .then(sucess => console.log(uuid, 'Stop Scan Successful', sucess))
      .catch(error => console.log(uuid, 'Stop Scan Error', error));
  };

  const scanAdvertising = async () => {
    const { equipmentList } = props.teacher;
    manager.startDeviceScan(null, null, (error, device) => {
      // Location services are disabled
      if (!_.isNull(device.serviceUUIDs)) {
        const uuid = device.serviceUUIDs[0];
        const equipment = equipmentList.find(d => d.id_BLE === uuid);

        if (!_.isEmpty(equipment)) {
          const indexE = devices.findIndex(
            d => equipment.id_Student === d.id_Student,
          );
          if (indexE === -1) {
            const indexS = studentList.findIndex(
              student => student.id_Student === equipment.id_Student,
            );

            if (!studentList[indexS].status) {
              devices.push({ ...equipment });
              setDevices(devices);

              studentList[indexS] = {
                ...studentList[indexS],
                status: true,
              };
              setStudentList([...studentList]);
            }
          }
        }
      }

      if (error) {
        console.log(error);
        manager.stopDeviceScan();
      }
    });
  };

  const startAttendance = async () => {
    const checkPermission = await requestLocationPermission();
    if (checkPermission) {
      if (!bluetoothEnabled) {
        requestEnabled();
      } else {
        await startAdvertising();
        await scanAdvertising();
        setDiscovering(true);
      }
    }
  };

  const stopAttendance = () => {
    stopAdvertising();
    manager.stopDeviceScan();
    setDiscovering(false);
  };

  const messageSuccess = () => {
    Alert.alert('Thông báo', 'Điểm danh thành công', [{ text: 'OK' }]);
  };

  const messageError = () => {
    Alert.alert(
      'Thông báo',
      'Điểm danh không thành công.\nVui lòng thử lại sau!',
      [{ text: 'OK' }],
    );
  };

  const onRefresh = () => {
    const { idSchedule } = props;
    props.getStudentBySchedule(idSchedule);
    setDevices([]);
    stopAttendance();
  };

  const saveAttendance = () => {
    const equipmentList = [];
    const { idSchedule } = props;

    devices.map(ite => equipmentList.push({ id_BLE: ite.id_BLE }));

    const data = {
      id_Schedule: idSchedule,
      content: equipmentList,
    };
    props.attendanceStudent({ data, messageSuccess, messageError });
  };

  const title = discovering ? 'Đang điểm danh (dừng)' : 'Điểm danh';
  const toggleDiscovery = discovering
    ? () => stopAttendance()
    : () => startAttendance();
  const { isLoading, isLoadingEq, isLoadingRp, isActing } = props.teacher;

  return (
    <View style={styles.container}>
      {isLoading || isLoadingEq || isLoadingRp ? (
        <ActivityIndicator
          size="large"
          color="#1890ff"
          animating={isLoading || isLoadingEq || isLoadingRp}
        />
      ) : (
        <>
          {!_.isEmpty(studentList) ? (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshControl={<RefreshControl onRefresh={onRefresh} />}>
                <View>
                  <DeviceList devices={studentList} />
                </View>
              </ScrollView>
              {Platform.OS !== 'ios' ? (
                <View>
                  <Button block onPress={toggleDiscovery} title={title} />
                  <Button
                    block
                    onPress={saveAttendance}
                    title="Lưu"
                    containerStyle={{ marginTop: 10 }}
                    loading={isActing}
                    disabled={_.isEmpty(devices)}
                  />
                </View>
              ) : undefined}
            </>
          ) : (
            <Text>Không có dữ liệu!</Text>
          )}
        </>
      )}
    </View>
  );
};

DeviceListScreen.propTypes = {
  attendanceStudent: PropTypes.func,
  createRepo: PropTypes.func,
  getEquipmentStudent: PropTypes.func,
  getStudentBySchedule: PropTypes.func,
  idSchedule: PropTypes.any,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        idSchedule: PropTypes.any,
      }),
    }),
  }),
  schedule: PropTypes.shape({
    idCourse: PropTypes.any,
  }),
  teacher: PropTypes.shape({
    equipmentList: PropTypes.array,
    isActing: PropTypes.any,
    isLoading: PropTypes.any,
    isLoadingEq: PropTypes.any,
    isLoadingRp: PropTypes.any,
    studentList: PropTypes.any,
  }),
  user: PropTypes.shape({
    userInfo: PropTypes.shape({
      id: PropTypes.any,
    }),
  }),
};

const mapStateToProps = state => ({
  user: state.user,
  teacher: state.teacher,
  schedule: state.schedule,
});

export default connect(mapStateToProps, {
  getEquipmentStudent,
  attendanceStudent,
  getStudentBySchedule,
  createRepo,
})(DeviceListScreen);

const DeviceList = ({ devices, ...rest }) =>
  devices.map((ite, idx) => (
    <DeviceListItem key={idx} device={ite} {...rest} />
  ));

DeviceList.propTypes = {
  devices: PropTypes.array,
};

const DeviceListItem = ({ device, onPress, onLongPress }) => {
  const color = device.status ? 'green' : 'red';
  const icon = device.status ? 'checkmark-circle' : 'close-circle';

  return (
    <ListItem style={styles.deviceListItem}>
      <ListItem.Content>
        <ListItem.Title>{device.name}</ListItem.Title>
      </ListItem.Content>
      <Icon type="ionicon" name={icon} color={color} />
    </ListItem>
  );
};

DeviceListItem.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.any,
    status: PropTypes.any,
  }),
  onLongPress: PropTypes.any,
  onPress: PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  deviceListItem: {
    alignItems: 'center',
    borderBottomColor: '#bdc3c7',
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 1,
  },
});
