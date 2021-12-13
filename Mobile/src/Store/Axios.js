import Axios from 'axios';
// const baseURL = 'https://dancebox-309908.uc.r.appspot.com'; // app engine
export const baseURL = 'http://192.168.90.163:8080'; // app engine

const AxiosClient = Axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default AxiosClient;
