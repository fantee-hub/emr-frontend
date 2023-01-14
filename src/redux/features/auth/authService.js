import httpService from '../../../utils/axios';
import setAuthToken from '../../../utils/setAuthToken';

const loginUrl = '/auth/login';

const login = (userData) => {
  return httpService.post(loginUrl, userData);
};

const logout = () => {
  localStorage.removeItem('user');
  setAuthToken();
};

const authService = { login, logout };
export default authService;
