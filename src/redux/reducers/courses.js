import {
  GET_COURSE_TEACHER,
  GET_COURSE_TEACHER_SUCCESS,
  GET_COURSE_TEACHER_ERROR,
} from '_constant';
import _ from 'lodash';

const initialState = {
  isLoading: false,
  courseTeacher: [],
};

const Course = (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSE_TEACHER:
      return _.assign({}, state, { isLoading: true });
    case GET_COURSE_TEACHER_SUCCESS:
      return _.assign({}, state, {
        isLoading: false,
        courseTeacher: [...action.payload.items],
      });
    case GET_COURSE_TEACHER_ERROR:
      return _.assign({}, state, { isLoading: false });

    default:
      return state;
  }
};

export default Course;
