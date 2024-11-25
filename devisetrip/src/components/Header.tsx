import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Devisetrip</h1>
        <nav>
          <a href="/" className="mr-4 hover:underline">Accueil</a>
          <a href="/dashboard" className="hover:underline">Tableau de bord</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;