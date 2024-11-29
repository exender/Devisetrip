import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white flex items-center justify-center"
      style={{
        backgroundImage: `url('https://cdn.prod.website-files.com/6376980d89260e9c2cdee566/64df81d6200a0e03c45e823a_famous-buildings-round-the-world-travel-wallpaper.jpg')`,
      }}
    >
      <div className="max-w-2xl bg-black bg-opacity-60 rounded-lg p-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-5">Bienvenue sur TripExpense !</h1>
        <h2 className="text-2xl font-medium text-white mb-4">
          Gérez votre budget vacances en toute tranquillité
        </h2>
        <p className="text-lg text-white mb-6">
          Pour profiter pleinement de nos fonctionnalités et garder un œil sur vos
          dépenses de voyage, veuillez vous connecter ou créer un compte.
        </p>
        <div className="space-y-4">
          <Link
            to="/login"
            className="contact-button inline-flex items-center justify-center bg-orange-500 text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-orange-600 transform hover:-translate-y-1 transition duration-300"
          >
            Connectez-vous ici
          </Link>
          <p className="text-white">ou</p>
          <Link
            to="/signup"
            className="contact-button inline-flex items-center justify-center bg-blue-500 text-white font-medium py-3 px-6 rounded-full shadow-md hover:bg-blue-600 transform hover:-translate-y-1 transition duration-300"
          >
            Créez un compte
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
