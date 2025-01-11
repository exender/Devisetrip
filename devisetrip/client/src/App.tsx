import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import AddTrip from './pages/AddTrip';
import AccountEditPage from './pages/AccountEditPage';
import UserTrips from './pages/UserTrips';
import Devises from './pages/Devises';
import DetailsTrip from './pages/DetailsTrip'; // Correction du nom de la page
import AddExpense from './pages/AddExpense';
import InviteUser from './pages/InviteUser';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/AddTrip" element={<AddTrip />} />
            <Route path="/account/edit" element={<AccountEditPage />} />
            <Route path="/trips" element={<UserTrips />} />
            <Route path="/devises" element={<Devises />} />
            {/* Route pour afficher les détails d'un voyage */}
            <Route path="/trips/:tripId/details" element={<DetailsTrip />} />
            {/* Route pour ajouter une dépense */}
            <Route path="/trips/:tripId/add-expense" element={<AddExpense tripId={''} />} />
            <Route path="/trips/:tripId/invite" element={<InviteUser tripId={''} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
