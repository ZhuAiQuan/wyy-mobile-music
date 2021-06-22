import HttpRequest from './request';
const baseUrl = process.env.VUE_APP_BASE_URL;

const axios = new HttpRequest(baseUrl);
export default axios;
