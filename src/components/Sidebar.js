import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { DrawerItems } from 'react-navigation-drawer';
import { logoutUser } from '_redux/actions/user';
import stylesByPlatform from '_utils/font';

const Sidebar = props => {
  const onLogout = () => {
    props.logoutUser();
    props.navigation.navigate('Login');
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('_assets/images/background.png')}
        style={{
          width: undefined,
          padding: 16,
          paddingTop: 48,
        }}>
        <Image
          source={require('_assets/images/profile.jpg')}
          style={styles.profile}
        />
        <Text style={styles.name}>{props.user.userInfo.fullName}</Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
          <Icon
            type="ionicon"
            name="mail"
            size={16}
            color="rgba(255,255,255,0.8)"
          />
          <Text style={styles.email}>{props.user.userInfo.email}</Text>
        </View>
      </ImageBackground>

      <View style={styles.container}>
        <DrawerItems {...props} />
        <TouchableOpacity style={styles.logout} onPress={onLogout}>
          <Icon
            type="material"
            name="exit-to-app"
            size={20}
            color="rgba(0, 0, 0, 0.87)"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(Sidebar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  email: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginLeft: 4,
    ...stylesByPlatform,
  },
  logout: {
    alignItems: 'center',
    borderRadius: 4,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  logoutIcon: {
    marginHorizontal: 16,
    opacity: 0.62,
    width: 24,
  },
  logoutText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: 'bold',
    margin: 16,
    ...stylesByPlatform,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    ...stylesByPlatform,
  },
  profile: {
    borderColor: '#fff',
    borderRadius: 40,
    borderWidth: 3,
    height: 80,
    width: 80,
  },
});
