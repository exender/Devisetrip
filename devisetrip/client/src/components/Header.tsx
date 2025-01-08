import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          className={`lg:flex lg:items-center lg:space-x-6 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          {/* Menu Items */}
          <Link
            to="/trips"
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
            to="/devises"
            className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0"
          >
            <i className="fas fa-exchange-alt mr-2"></i>Convertisseur de devises
          </Link>

          {/* Profile with Dropdown */}
          <div className="relative block lg:inline-block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="block text-gray-800 font-medium hover:text-blue-600 py-2 lg:py-0 flex items-center"
            >
              <i className="fas fa-user mr-2"></i>Mon profil
              <i
                className={`ml-2 fas ${
                  isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'
                }`}
              ></i>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 text-center z-10">
                <li>
                  <Link
                    to="/account/edit"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <i className="fas fa-user-edit mr-2"></i>Mes informations
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
            )}
          </div>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;
