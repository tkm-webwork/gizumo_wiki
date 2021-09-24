import axios from 'axios';

export default (token = null) => {
  const headers = {};
  // トークンを使用した認証（個人の特定）
  if (token) Object.assign(headers, { Authorization: `Bearer ${token}` });

  return axios.create({
    baseURL: API_BASE_URL,
    headers,
  });
};
