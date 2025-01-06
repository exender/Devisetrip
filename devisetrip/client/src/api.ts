import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const API = axios.create({
  baseURL: '/api/users', // Proxy vers le backend
});


interface LoginData {
  email: string;
  password: string;
}

export const signup = (userData: SignupData) => API.post('/signup', userData);
export const login = (loginData: { email: string; password: string }) => API.post('/login', loginData);