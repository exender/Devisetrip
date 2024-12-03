import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Vous êtes déconnecté.
        </h1>
        <p className="text-gray-400 mb-6 text-center">
          Merci de votre visite. Revenez bientôt !
        </p>
        <button
          onClick={handleRedirect}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Revenir à la page d'accueil
        </button>
      </div>
    </div>
  );
};

export default Logout;
