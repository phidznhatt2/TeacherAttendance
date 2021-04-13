import * as apiCourse from '_api/course';
import {
  GET_COURSE_TEACHER,
  GET_COURSE_TEACHER_SUCCESS,
  GET_COURSE_TEACHER_ERROR,
} from '_constant';

const createActionGetCourseTeacher = type => payload => dispatch => {
  dispatch({ type });
  apiCourse
    .getCourseTeacher(payload)
    .then(res => {
      dispatch({ type: GET_COURSE_TEACHER_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      dispatch({
        type: GET_COURSE_TEACHER_ERROR,
        payload: err.response.data,
      });
    });
};

export const getCourseTeacher = createActionGetCourseTeacher(
  GET_COURSE_TEACHER,
);
