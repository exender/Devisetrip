import axios from 'axios';

// Interface pour les données d'inscription
interface SignupData {
  name: string;
  email: string;
  password: string;
}

// Interface pour les données de connexion
interface LoginData {
  email: string;
  password: string;
}

// Interface pour les données de voyage
interface TripData {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

const API = axios.create({
  baseURL: '/api/users', // Proxy vers le backend
});

// Fonction pour s'inscrire
export const signup = (userData: SignupData) => API.post('/signup', userData);

// Fonction pour se connecter
export const login = (loginData: LoginData) => API.post('/login', loginData);

// Fonction pour ajouter un voyage
export const addTrip = (tripData: TripData) => API.post('/addTrip', tripData);

