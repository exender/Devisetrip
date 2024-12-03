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
      <div className="w-96 p-8 text-center bg-white/10 border border-white/50 rounded-lg backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="relative border-b-2 border-gray-400 mb-6">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-10 bg-transparent outline-none text-white placeholder-transparent peer"
              required
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-1/2 text-white text-base transform -translate-y-1/2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:translate-y-[-120%] peer-focus:text-sm transition-all"
            >
              Entrez votre nom d'utilisateur :
            </label>
          </div>
          <div className="relative border-b-2 border-gray-400 mb-6">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 bg-transparent outline-none text-white placeholder-transparent peer"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-1/2 text-white text-base transform -translate-y-1/2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-focus:translate-y-[-120%] peer-focus:text-sm transition-all"
            >
              Entrez votre mot de passe :
            </label>
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
