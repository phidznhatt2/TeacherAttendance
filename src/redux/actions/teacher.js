import * as apiTeacher from '_api/teacher';
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

const createActionGetEquipmentStudent = type => payload => dispatch => {
  dispatch({ type });
  apiTeacher
    .getEquipmentStudent(payload)
    .then(res => {
      dispatch({ type: GET_EQUIPMENT_STUDENT_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_EQUIPMENT_STUDENT_ERROR,
        payload: err.response.data,
      });
    });
};

const createActionGetStudentBySchedule = type => payload => dispatch => {
  dispatch({ type });
  apiTeacher
    .getStudentBySchedule(payload)
    .then(res => {
      dispatch({
        type: GET_STUDENT_BY_SCHEDULE_SUCCESS,
        payload: { data: res.data.data, idSchedule: payload },
      });
    })
    .catch(err => {
      dispatch({
        type: GET_STUDENT_BY_SCHEDULE_ERROR,
        payload: err.response.data,
      });
    });
};

const createActionAttendanceStudent = type => payload => dispatch => {
  const { data, messageSuccess, messageError } = payload;
  dispatch({ type });
  apiTeacher
    .attendanceStudent(data)
    .then(res => {
      dispatch({
        type: ATTENDANCE_STUDENT_BY_TEACHER_SUCCESS,
        payload: res.data.data,
      });
      messageSuccess();
    })
    .catch(err => {
      dispatch({
        type: ATTENDANCE_STUDENT_BY_TEACHER_ERROR,
        payload: err.response.data,
      });
      messageError();
    });
};

const createActionCreateRepo = type => payload => dispatch => {
  const { idSchedule, idCourse, id } = payload;
  const data = {
    id_Schedule: idSchedule,
    id_Course: idCourse,
    id_EquipmentTeacher: id,
  };
  dispatch({ type });
  apiTeacher
    .createRepo(data)
    .then(res => {
      dispatch({
        type: CREATE_REPO_SUCCESS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_REPO_ERROR,
        payload: err.response.data,
      });
    });
};

export const getEquipmentStudent = createActionGetEquipmentStudent(
  GET_EQUIPMENT_STUDENT,
);
export const getStudentBySchedule = createActionGetStudentBySchedule(
  GET_STUDENT_BY_SCHEDULE,
);
export const attendanceStudent = createActionAttendanceStudent(
  ATTENDANCE_STUDENT_BY_TEACHER,
);

export const createRepo = createActionCreateRepo(CREATE_REPO);
