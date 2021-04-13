import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
  ADD_DEVICE_USER,
  ADD_DEVICE_USER_SUCCESS,
  ADD_DEVICE_USER_ERROR,
  GET_USER_BY_ID,
  GET_USER_BY_ID_SUCCESS,
  GET_USER_BY_ID_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  loginSuccess: false,
  userInfo: {},
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return _.assign({}, state, { isLoading: true });
    case LOGIN_USER_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        loginSuccess: true,
      });
    case LOGIN_USER_ERROR:
      return _.assign({}, state, { isLoading: false, loginSuccess: false });

    case SIGNUP_USER:
      return _.assign({}, state, { isLoading: true });
    case SIGNUP_USER_SUCCESS:
      return _.assign({}, state, { isLoading: false });
    case SIGNUP_USER_ERROR:
      return _.assign({}, state, { isLoading: false });

    case ADD_DEVICE_USER:
      return _.assign({}, state, { isLoading: true });
    case ADD_DEVICE_USER_SUCCESS:
      const { status, deviceInfo } = action.payload;
      if (status) {
        if (_.isEmpty(state.userInfo.studentEquipment)) {
          const studentEquipment = [];
          studentEquipment.push(deviceInfo);
          return _.assign(
            {},
            { ...state, userInfo: { ...state.userInfo, studentEquipment } },
            { isLoading: false },
          );
        }
        state.userInfo.studentEquipment.push(deviceInfo);
      }
      return _.assign({}, state, { isLoading: false });
    case ADD_DEVICE_USER_ERROR:
      return _.assign({}, state, { isLoading: false });

    case GET_USER_BY_ID:
      return _.assign({}, state, { isLoading: true });
    case GET_USER_BY_ID_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        loginSuccess: true,
        userInfo: { ...action.payload },
      });
    case GET_USER_BY_ID_ERROR:
      return _.assign({}, state, { isLoading: false });
    default:
      return state;
  }
};

export default User;
