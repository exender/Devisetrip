import React, { useState } from 'react';
import { signup } from '../api';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simule une action d'inscription pour ce tutoriel
    try {
      // Exemple : appeler une API d'inscription ici
      console.log('Données envoyées :', formData);
      setMessage("Inscription réussie !");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage('Une erreur est survenue.');
    }
  };

  const cancelForm = () => {
    window.location.href = '/'; // Redirection vers la page d'accueil
  };

  return (
    <div
    className="flex items-center justify-center min-h-screen w-full bg-cover bg-center"
    style={{ backgroundImage: "url('../../images/alaska.jpg')" }}
  >
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/50">
      
       <h2 className="text-2xl text-white font-bold text-center mb-6">Inscription</h2>
       <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
       <div className="relative border-b border-gray-300 pb-2">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Choisissez un nom"
            />
            
          </div>

           {/* Champ Email */}
           <div className="relative border-b border-gray-300 pb-2">
           <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Saisissez un mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
          >
            S'inscrire
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        <div className="mt-6 text-center">
          <p className="text-white-600">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-white-500 hover:underline">
              Se connecter
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

export default Signup;
