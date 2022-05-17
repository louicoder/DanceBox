import Axios from 'axios';
const baseURL = 'https://dance-box-2022.el.r.appspot.com'; // app engine
// export const baseURL = 'http://192.168.1.100:8080'; // app engine

const AxiosClient = Axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default AxiosClient;
