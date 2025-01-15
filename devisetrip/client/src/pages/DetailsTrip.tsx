import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddExpense from './AddExpense';
import Header from '../components/Header';

interface Expense {
  type: string;
  amount: number;
}

interface User {
  _id: string;
  email: string;
}

const DetailsTrip: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState<string | null>(null);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [expensesResponse, invitedUsersResponse] = await Promise.all([
          axios.get(`/api/users/getExpenses/${tripId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`/api/users/getInvitedUsers/${tripId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setExpenses(expensesResponse.data);
        setInvitedUsers(invitedUsersResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tripId]);

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/users/inviteUser',
        { tripId, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInviteMessage(response.data.message);
      setEmail('');
    } catch (err: any) {
      setInviteMessage(err.response?.data?.message || 'Erreur lors de l’invitation.');
    }
  };

  const handleOpenAddExpenseModal = () => setOpenAddExpenseModal(true);
  const handleCloseAddExpenseModal = () => setOpenAddExpenseModal(false);

  return (
    <>
      <Header />
      <div
        className="p-6 bg-gray-50 min-h-screen"
        style={{
          backgroundImage: 'url(/images/exo.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-center items-center min-h-[calc(80vh-80px)]">
          <div className="bg-white shadow-md rounded-md p-6 w-full max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Détails du voyage</h1>

            <section>
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Dépenses actuelles :</h2>

              {loading ? (
                <p className="text-gray-500">Chargement...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="bg-white shadow rounded-md overflow-hidden">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-600">Type de dépense</th>
                        <th className="px-4 py-2 text-right text-gray-600">Montant (€)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense, index) => (
                        <tr
                          key={index}
                          className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <td className="px-4 py-2 text-gray-700">{expense.type}</td>
                          <td className="px-4 py-2 text-right text-gray-700">{expense.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                onClick={handleOpenAddExpenseModal}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-500"
              >
                Ajouter une dépense
              </button>
            </section>

            {openAddExpenseModal && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                  <AddExpense tripId={tripId || ''} />
                  <button
                    onClick={handleCloseAddExpenseModal}
                    className="mt-4 text-gray-600 hover:text-gray-800"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Inviter un utilisateur :</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <button
                onClick={handleInvite}
                className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-500"
              >
                Envoyer l’invitation
              </button>
              {inviteMessage && <p className="text-green-600 mt-2">{inviteMessage}</p>}
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Utilisateurs invités :</h2>
              <ul className="bg-white shadow rounded-md divide-y divide-gray-200">
                {invitedUsers.map((user) => (
                  <li key={user._id} className="px-4 py-2 text-gray-700">
                    {user.email}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );

};

export default DetailsTrip;
