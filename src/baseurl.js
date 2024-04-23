import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://hybrid.srishticampus.in/smart_journalism_api/', 
  baseURL: 'http://localhost:4001/smart_journalism_api', 



  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
