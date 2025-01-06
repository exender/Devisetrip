import React, { useState } from 'react';
import { login } from '../api'; 
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation simple
    if (!formData.email || !formData.password) {
      setMessage('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await login(formData); // Appel API pour le login
      setMessage(response.data.message); // Message de succès
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Stocker l'utilisateur dans le localStorage
      navigate('/dashboard'); // Redirection vers le Dashboard
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  // Bouton d'annulation
  const cancelForm = () => {
    window.location.href = '/'; // Redirection vers la page d'accueil
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: "url('../../images/montagne.jpg')" }}
    >
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/50">
        <h2 className="text-2xl text-white font-bold text-center mb-6">Connexion</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="relative border-b border-gray-300 pb-2">
            <label htmlFor="email" className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Votre email"
              required
            />
          </div>
          <div className="relative border-b border-gray-300 pb-2">
            <label htmlFor="password" className="block text-white font-medium mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Votre mot de passe"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
          >
            Se connecter
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        <div className="mt-6 text-center">
          <p className="text-white">
            Pas encore inscrit ?{' '}
            <Link to="/signup" className="text-blue-300 hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
        <button
          type="button"
          onClick={cancelForm}
          className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default Login;
