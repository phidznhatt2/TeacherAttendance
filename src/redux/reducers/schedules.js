import {
  GET_SCHEDULE,
  GET_SCHEDULE_SUCCESS,
  GET_SCHEDULE_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  idCourse: null,
  scheduleList: [],
};

const Schedule = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULE:
      return _.assign({}, state, { isLoading: true });
    case GET_SCHEDULE_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        idCourse: action.payload.idCourse,
        scheduleList: [...action.payload.data.items],
      });
    case GET_SCHEDULE_ERROR:
      return _.assign({}, state, { isLoading: false });

    default:
      return state;
  }
};

export default Schedule;
