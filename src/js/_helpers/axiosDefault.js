import axios from 'axios';

export default (token = null) => axios.create({
  baseURL: API_BASE_URL,
  headers: token ? {
    Authorization: `Bearer ${token}`,
  } : '',
});
