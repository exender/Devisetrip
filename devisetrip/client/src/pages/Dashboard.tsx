import React from 'react';
import Header from '../components/Header';

const Dashboard: React.FC = () => {
  // Simulation du nom d'utilisateur depuis une session ou un contexte
  const username = "Le Red"; // Remplacez par une donnée dynamique si besoin

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('../images/lac.avif')" }}>
      {/* Inclusion du Header */}
      <Header />
      
      {/* Contenu principal */}
      <div className="main-content flex-1 p-5">
        <div className="container max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-5 rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Bienvenue, {username} !</h1>
          <p className="text-gray-600 mb-4">
            Ce site vous permet de suivre vos dépenses tout au long de votre voyage. Notez chaque achat,
            organisez vos dépenses par catégories, et obtenez un aperçu clair de votre budget en un coup d'œil.
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mb-3">Instructions Rapides</h2>
          <ul className="list-none pl-0 mb-6">
            <li className="mb-2">
              1. <a href="/add_trip_form" className="text-blue-600 hover:underline">Créez un nouveau voyage</a>.
            </li>
            <li className="mb-2">
              2. <a href="/add_expense" className="text-blue-600 hover:underline">Ajoutez vos dépenses par jour</a>.
            </li>
            <li>
              3. <a href="/trip" className="text-blue-600 hover:underline">Consultez vos rapports de dépenses</a> pour mieux gérer votre budget.
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mb-3">Conseils et Astuces</h2>
          <p className="text-gray-600 mb-2">- Gardez une trace de chaque dépense, même les plus petites.</p>
          <p className="text-gray-600 mb-2">- Utilisez des catégories pour organiser vos dépenses.</p>
          <p className="text-gray-600 mb-4">- Consultez régulièrement vos rapports pour ajuster votre budget.</p>

          <a href="/add_trip_form" className="inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
            Commencez votre voyage maintenant
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-3 fixed bottom-0 w-full">
        &copy; 2024 Votre Application
      </footer>
    </div>
  );
};

export default Dashboard;
