import api from '_services/api';

const endPoint = '/Users';
const endPointLogin = 'authenticate';

export const loginUser = params =>
  api.post(`${endPoint}/${endPointLogin}`, params);

export const getUserbyId = params => api.get(`${endPoint}/${params}`);
