import PropTypes from 'prop-types';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { Input } from '_components';
import { Button } from 'react-native-elements';
import validate from '_utils/validator';
import _ from 'lodash';
import { useForm } from '_hook';
import { signupUser } from '_redux/actions/user';

const SignUpScreen = props => {
  const [isShowPass, setIsShowPass] = React.useState(true);
  const [isShowPassConfirm, setIsShowPassConfirm] = React.useState(true);

  const signup = () => {
    const { fullname, username, email, password } = formData;
    const data = {
      fullName: fullname,
      userName: username,
      email,
      password,
    };
    props.signupUser({ data, messageSuccess, messageError });
  };

  const { formData, handleChange, handleSubmit, errors } = useForm(
    signup,
    validate,
  );

  const messageSuccess = () => {
    Alert.alert('Thông báo', 'Đăng ký tài khoản thành công!', [{ text: 'OK' }]);
  };

  const messageError = () => {
    Alert.alert('Thông báo', 'Username hoặc E-mail đã tồn tại!', [
      { text: 'OK' },
    ]);
  };

  const { fullname, username, email, password, password2 } = formData;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('_assets/images/logo.png')}
            resizeMode="center"
            style={styles.image}
          />
          <Text style={styles.textTitle}>Let&apos;s Get Started</Text>
          <Text style={styles.textBody}>
            Create an account to get all features
          </Text>
          <Input
            style={{ marginVertical: 7.5 }}
            name="Full name"
            value={fullname || ''}
            onChangeText={value => {
              handleChange('fullname', value);
            }}
            iconLeft="user"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.fullname}
          />
          <Input
            style={{ marginVertical: 7.5 }}
            name="Username"
            value={username || ''}
            onChangeText={value => {
              handleChange('username', value);
            }}
            iconLeft="user"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.username}
          />
          <Input
            style={{ marginVertical: 7.5 }}
            name="Email"
            value={email || ''}
            onChangeText={value => {
              handleChange('email', value);
            }}
            iconLeft="email"
            typeIcon="Ionicons"
            errorStyle={{ color: 'red' }}
            errorMessage={errors.email}
          />
          <Input
            style={{ marginVertical: 7.5 }}
            name="Password"
            value={password || ''}
            onChangeText={value => {
              handleChange('password', value);
            }}
            iconLeft="lock"
            pass={isShowPass}
            iconRight={isShowPass ? 'eye-slash' : 'eye'}
            onPressIconRight={() => setIsShowPass(pre => !pre)}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.password}
          />
          <Input
            style={{ marginVertical: 7.5 }}
            name="Confirm password"
            value={password2 || ''}
            onChangeText={value => {
              handleChange('password2', value);
            }}
            iconLeft="lock"
            pass={isShowPassConfirm}
            iconRight={isShowPassConfirm ? 'eye-slash' : 'eye'}
            onPressIconRight={() => setIsShowPassConfirm(pre => !pre)}
            errorStyle={{ color: 'red' }}
            errorMessage={errors.password2}
          />
          <Button
            title="SIGN UP"
            containerStyle={styles.containerButton}
            buttonStyle={{ borderRadius: 50 }}
            disabled={
              !(
                !!fullname &&
                !!username &&
                !!email &&
                !!password &&
                !!password2 &&
                _.isEmpty(errors)
              )
            }
            onPress={handleSubmit}
            loading={props.user.isLoading}
          />
          <View style={{ flexDirection: 'row', marginVertical: 10 }}>
            <Text style={[styles.textBody, { fontSize: 14 }]}>
              Already have an account?{' '}
            </Text>
            <Text
              style={[styles.textBody, { color: '#28d', fontSize: 14 }]}
              onPress={() => props.navigation.navigate('Login')}>
              Login here
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, {
  signupUser,
})(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  containerButton: {
    marginTop: 20,
    paddingHorizontal: 10,
    width: '90%',
  },
  image: {
    height: 100,
    marginTop: 10,
    width: 100,
  },
  textBody: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textTitle: {
    fontSize: 40,
  },
});
