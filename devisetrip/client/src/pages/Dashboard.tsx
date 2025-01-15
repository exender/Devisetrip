import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  // État pour stocker le nom de l'utilisateur
  const [username, setUsername] = useState<string | null>(null);

  // Récupération du nom de l'utilisateur depuis le localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.name); // Assurez-vous que l'objet utilisateur contient une propriété `name`
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('../images/lac.avif')" }}>
      {/* Inclusion du Header */}
      <Header />
      
      {/* Contenu principal */}
      <div className="main-content flex-1 p-6">
        <div className="container max-w-3xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-lg shadow-2xl">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Bienvenue, {username ? username : 'utilisateur'} !
          </h1>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Ce site vous permet de suivre vos dépenses tout au long de votre voyage. Notez chaque achat,
            organisez vos dépenses par catégories, et obtenez un aperçu clair de votre budget en un coup d'œil.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Instructions Rapides</h2>
          <ul className="list-none pl-0 mb-8 space-y-4">
            <li className="text-lg text-gray-700">
              1. <a href="/AddTrip" className="text-blue-600 hover:text-blue-800 transition duration-300">Créez un nouveau voyage</a>.
            </li>
            <li className="text-lg text-gray-700">
              2. Ajoutez vos dépenses par jour.
            </li>
            <li className="text-lg text-gray-700">
                3. Consultez vos rapports de dépenses pour mieux gérer votre budget.
            </li>

          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conseils et Astuces</h2>
          <p className="text-gray-600 text-lg mb-4">- Gardez une trace de chaque dépense, même les plus petites.</p>
          <p className="text-gray-600 text-lg mb-4">- Utilisez des catégories pour organiser vos dépenses.</p>
          <p className="text-gray-600 text-lg mb-6">- Consultez régulièrement vos rapports pour ajuster votre budget.</p>

          <a href="/AddTrip" className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
            Commencez votre voyage maintenant
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
