import * as apiUser from '_api/user';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  LOGOUT_USER,
  ADD_DEVICE_USER,
  ADD_DEVICE_USER_SUCCESS,
  ADD_DEVICE_USER_ERROR,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
} from '_constant';
import AsyncStorage from '@react-native-community/async-storage';

const createActionLoginUser = type => payload => dispatch => {
  const { data, messageSuccess, messageError } = payload;
  dispatch({ type });
  apiUser
    .loginUser(data)
    .then(res => {
      const { accessToken, ...rest } = res.data.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: rest });
      AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['uuid', rest.id],
      ]);
      messageSuccess();
    })
    .catch(err => {
      dispatch({ type: LOGIN_USER_ERROR, payload: err.response.data });
      messageError();
    });
};

const createActionSignupUser = type => payload => dispatch => {
  const { data, messageSuccess, messageError } = payload;
  dispatch({ type });
  apiUser
    .signupUser(data)
    .then(res => {
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: res.data });
      messageSuccess();
    })
    .catch(err => {
      dispatch({ type: SIGNUP_USER_ERROR, payload: err.response.data });
      messageError();
    });
};

const createActionLogoutUser = type => () => dispatch => {
  AsyncStorage.clear();
  dispatch({ type });
};

const createActionAddDeviceUser = type => payload => dispatch => {
  const { data, messageSuccess, messageError } = payload;
  dispatch({ type });
  apiUser
    .addDeviceUser(data)
    .then(res => {
      const { id_Student: idStudent, ...rest } = data;
      dispatch({
        type: ADD_DEVICE_USER_SUCCESS,
        payload: { status: res.data.isSuccessed, deviceInfo: rest },
      });
      messageSuccess(res.data.message);
    })
    .catch(err => {
      dispatch({ type: ADD_DEVICE_USER_ERROR, payload: err.response.data });
      messageError(err.response.data.message);
    });
};

const createActionGetUserById = type => payload => dispatch => {
  dispatch({ type });
  apiUser
    .getUserbyId(payload)
    .then(res => {
      dispatch({ type: GET_USER_BY_ID_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({ type: GET_USER_BY_ID_ERROR, payload: err.response.data });
    });
};

export const loginUser = createActionLoginUser(LOGIN_USER);
export const signupUser = createActionSignupUser(SIGNUP_USER);
export const logoutUser = createActionLogoutUser(LOGOUT_USER);
export const addDeviceUser = createActionAddDeviceUser(ADD_DEVICE_USER);
export const getUserById = createActionGetUserById(GET_USER_BY_ID);
