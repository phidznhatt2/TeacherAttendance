import api from '_services/api';

const endPoint = '/Course';
const endPointTeacher = 'PagingByTeacher';

export const getCourseTeacher = params =>
  api.get(
    `${endPoint}/${endPointTeacher}?Id=${params}&PageIndex=1&PageSize=20`,
  );
