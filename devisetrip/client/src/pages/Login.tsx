import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler la validation des informations de session
    if (username === 'Le Red' && password === 'LeRed') {
      console.log('Connexion réussie :', { username, password });
      navigate('/Dashboard'); // Redirection vers Dashboard.tsx
    } else {
      alert('Nom d’utilisateur ou mot de passe incorrect.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-cover bg-center bg-[url('../../images/montagne.jpg')] relative">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-lg border border-white/50">
      <h2 className="text-2xl text-white font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}className="flex flex-col space-y-4">
        <div className="relative border-b border-gray-300 pb-2">
        <label
              htmlFor="username"
              className="block text-white-700 font-medium mb-1"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Choisissez un nom"
            />
          </div>
          <div className="relative border-b border-gray-300 pb-2">
            <label   htmlFor="password"
              className="block text-white-700 font-medium mb-1"
            >
               Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-white placeholder-transparent focus:ring-0 border-none outline-none peer"
              placeholder="Saisissez un mot de passe"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-black font-semibold rounded border-2 border-transparent hover:border-white hover:bg-white/20 hover:text-white transition-all"
          >
            Se connecter
          </button>
        </form>
        <div className="mt-8 text-center text-white">
          <p className="text-sm">
            Pas encore inscrit ?{' '}
            <Link to="/Signup" className="text-blue-300 hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
