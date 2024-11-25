import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const API = axios.create({
  baseURL: '/api/users', // Proxy vers le backend
});

export const signup = (userData: SignupData) => API.post('/signup', userData);