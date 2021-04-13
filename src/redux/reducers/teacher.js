import {
  GET_EQUIPMENT_STUDENT,
  GET_EQUIPMENT_STUDENT_SUCCESS,
  GET_EQUIPMENT_STUDENT_ERROR,
  GET_STUDENT_BY_SCHEDULE,
  GET_STUDENT_BY_SCHEDULE_SUCCESS,
  GET_STUDENT_BY_SCHEDULE_ERROR,
  ATTENDANCE_STUDENT_BY_TEACHER,
  ATTENDANCE_STUDENT_BY_TEACHER_SUCCESS,
  ATTENDANCE_STUDENT_BY_TEACHER_ERROR,
  CREATE_REPO,
  CREATE_REPO_SUCCESS,
  CREATE_REPO_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  isLoadingEq: false,
  isLoadingRp: false,
  isActing: false,
  idSchedule: null,
  equipmentList: [],
  studentList: [],
};

const Teacher = (state = initialState, action) => {
  switch (action.type) {
    case GET_EQUIPMENT_STUDENT:
      return _.assign({}, state, { isLoadingEq: true });
    case GET_EQUIPMENT_STUDENT_SUCCESS:
      return _.assign({}, state, {
        isLoadingEq: false,
        equipmentList: [...action.payload.items],
      });
    case GET_EQUIPMENT_STUDENT_ERROR:
      return _.assign({}, state, { isLoadingEq: false });

    case GET_STUDENT_BY_SCHEDULE:
      return _.assign({}, state, { isLoading: true });
    case GET_STUDENT_BY_SCHEDULE_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        idSchedule: action.payload.idSchedule,
        studentList: [...action.payload.data.items],
      });
    case GET_STUDENT_BY_SCHEDULE_ERROR:
      return _.assign({}, state, { isLoading: false });

    case ATTENDANCE_STUDENT_BY_TEACHER:
      return _.assign({}, state, { isActing: true });
    case ATTENDANCE_STUDENT_BY_TEACHER_SUCCESS:
      return _.assign({}, state, { isActing: false });
    case ATTENDANCE_STUDENT_BY_TEACHER_ERROR:
      return _.assign({}, state, { isActing: false });

    case CREATE_REPO:
      return _.assign({}, state, { isLoadingRp: true });
    case CREATE_REPO_SUCCESS:
      return _.assign({}, state, { isLoadingRp: false });
    case CREATE_REPO_ERROR:
      return _.assign({}, state, { isLoadingRp: false });
    default:
      return state;
  }
};

export default Teacher;
