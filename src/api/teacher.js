import api from '_services/api';

const endPoint = '/Teacher';
const endPointTeacher = 'EquipmentOfsStudent';
const endPointStudent = '/Student/PagingBySchedule';
const endPointAttendance = 'AttendanceStudent/CreatebyTeacher';
const endPointRepo = 'CreateRepo';

export const getEquipmentStudent = params =>
  api.get(`${endPoint}/${endPointTeacher}?idCourse=${params}`);

export const attendanceStudent = params =>
  api.post(`${endPointAttendance}`, params);

export const getStudentBySchedule = params =>
  api.get(`${endPointStudent}?id_Schedule=${params}`);

export const createRepo = params =>
  api.post(`${endPoint}/${endPointRepo}`, params);
