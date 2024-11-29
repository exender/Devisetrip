import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/home">
          <img
            src="../images/logo-tripexpenses.jfif"
            alt="Logo Trip Expense"
            className="w-24 h-auto"
          />
        </Link>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden text-gray-800 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>

        {/* Navigation */}
        <nav
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:items-center lg:space-x-6`}
        >
          {/* Menu items */}
          <Link
            to="/trip"
            className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0"
          >
            <i className="fas fa-plane mr-2"></i>Voyage en cours
          </Link>
          <Link
            to="/finish_trip"
            className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0"
          >
            <i className="fas fa-map-marked-alt mr-2"></i>Mes voyages passés
          </Link>
          <Link
            to="/convertisseur"
            className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0"
          >
            <i className="fas fa-exchange-alt mr-2"></i>Convertisseur de devises
          </Link>

          {/* Profil avec sous-menu */}
          <div className="relative group block lg:inline-block">
            <Link
              to="#"
              className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0 flex items-center"
            >
              <i className="fas fa-user mr-2"></i>Mon profil
            </Link>

            {/* Sous-menu */}
            <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg mt-2 w-48 text-center">
              <li>
                <Link
                  to="/infos"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  <i className="fas fa-info-circle mr-2"></i>Mes informations
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>Se déconnecter
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
