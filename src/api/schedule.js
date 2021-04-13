import api from '_services/api';

const endPoint = '/Schedule';

export const getSchedule = params => {
  const { idCourse, idTeacher } = params;
  return api.get(
    `${endPoint}/AllPaging?Id_Course=${idCourse}&Id_Teacher=${idTeacher}`,
  );
};
