import Axios from 'axios';
// const baseURL = 'https://dancebox-309908.uc.r.appspot.com/api'; // app engine
export const baseURL = 'http://192.168.132.163:3001'; // app engine

const AxiosClient = Axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default AxiosClient;
