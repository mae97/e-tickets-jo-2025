import axios from 'axios';

export default axios.create({
  baseURL: '/api', // fait que tous les appels passent par Nginx
});
