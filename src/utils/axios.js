import axios from 'axios';

const httpService = axios.create({
  // baseURL: 'https://emr-server.herokuapp.com'
  baseURL: process.env.REACT_APP_BASEURL
});

export default httpService;
