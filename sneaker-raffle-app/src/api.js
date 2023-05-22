import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sneaker-app-web-yy3755jesa-uc.a.run.app', // Replace with your API's base URL
  // baseURL: 'localhost:8080', // Replace with your API's base URL

});

export default api;
