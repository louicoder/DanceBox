import Axios from 'axios';
const baseURL = 'https://dancebox-309908.uc.r.appspot.com/api'; // app engine

const AxiosClient = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
});

export default AxiosClient;
