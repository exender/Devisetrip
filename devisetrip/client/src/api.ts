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
  budget_vac: number;
}

// Instance pour les routes utilisateurs
const API = axios.create({
  baseURL: '/api/users',
});

// Instance pour les routes liées au compte
const AccountAPI = axios.create({
  baseURL: '/api/account',
});

// Ajout d'un intercepteur pour inclure le token JWT dans les requêtes protégées
AccountAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Récupère le token depuis localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction pour s'inscrire
export const signup = (userData: SignupData) => API.post('/signup', userData);

// Fonction pour se connecter
export const login = async (loginData: LoginData) => {
  const response = await API.post('/login', loginData);
  const { token } = response.data;
  if (token) {
    localStorage.setItem('token', token); // Stocke le token dans localStorage
  }
  return response;
};

// Fonction pour supprimer un voyage
export const deleteTrip = async (tripId: string) => {
  try {
    const token = localStorage.getItem('token'); // Récupère le token depuis localStorage
    if (!token) {
      throw new Error('Token manquant. Veuillez vous reconnecter.');
    }

    // Appel à l'API pour supprimer le voyage
    await API.delete(`/deleteTrip/${tripId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, message: 'Voyage supprimé avec succès.' };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Erreur lors de la suppression du voyage.' };
  }
};


// Fonction pour ajouter un voyage
export const addTrip = (tripData: TripData) => API.post('/addTrip', tripData);

// Fonction pour mettre à jour les informations du compte
export const updateAccount = (data: { name: string; email: string; password: string }) =>
  AccountAPI.post('/update', data);

// Fonction pour récupérer les informations du compte
export const getAccountInfo = () => AccountAPI.get('/info');
