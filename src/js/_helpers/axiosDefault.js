import axios from 'axios';

export default (token = null) => {
  const headers = {};
  if (token) Object.assign(headers, { Authorization: `Bearer ${token}` }); // 認証をする

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
  });
};
