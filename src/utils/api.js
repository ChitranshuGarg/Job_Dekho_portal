import axios from 'axios';
import { 
  USER_API_END_POINT, 
  JOB_API_END_POINT, 
  APPLICATION_API_END_POINT, 
  COMPANY_API_END_POINT 
} from './constant';

// Create axios instance with default config
const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const userApi = USER_API_END_POINT;
export const jobApi = JOB_API_END_POINT;
export const applicationApi = APPLICATION_API_END_POINT;
export const companyApi = COMPANY_API_END_POINT;

export default api; 