import * as apiSchedule from '_api/schedule';
import {
  GET_SCHEDULE,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_ERROR,
} from '_constant';

const createActionGetSchedule = type => payload => dispatch => {
  const { idCourse, idTeacher } = payload;
  dispatch({ type });
  apiSchedule
    .getSchedule({ idCourse, idTeacher })
    .then(res => {
      dispatch({
        type: GET_SCHEDULE_SUCCESS,
        payload: { data: res.data.data, idCourse },
      });
    })
    .catch(err => {
      dispatch({
        type: GET_SCHEDULE_ERROR,
        payload: err.response.data,
      });
    });
};

export const getSchedule = createActionGetSchedule(GET_SCHEDULE);
