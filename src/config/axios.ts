import axios from 'axios';

const guiabolsoApi = axios.create({
    baseURL: '/api',
    timeout: 10000,
  //   headers: {'X-Custom-Header': 'CustomHeader1'}
});

export default {
    guiabolsoApi,
}