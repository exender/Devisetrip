import axios from 'axios';

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const API = axios.create({
  baseURL: 'http://localhost:5000/', // Adresse complète
});


interface LoginData {
  email: string;
  password: string;
}

export const signup = (userData: SignupData) => API.post('/signup', userData);
export const login = (loginData: LoginData) => API.post('/login', loginData);