import { useState, useEffect } from 'react';
import { updateAccount, getAccountInfo } from '../api';
import Header from '../components/Header';

const AccountEditPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getAccountInfo();
        setFormData({ ...formData, name: response.data.name, email: response.data.email });
      } catch (error) {
        setMessage('Erreur lors de la récupération des informations');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAccount(formData);
      setMessage('Mise à jour réussie!');
    } catch (error) {
      setMessage('Erreur lors de la mise à jour');
    }
  };

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
  <Header />
  
  <div className="flex justify-center items-center p-6">
    <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Informations de mon compte</h1>
      
      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Champ Nom */}
        <div>
          <label className="block text-lg text-gray-700 mb-2">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          />
        </div>

        {/* Champ Email */}
        <div>
          <label className="block text-lg text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          />
        </div>

        {/* Champ Mot de Passe */}
        <div>
          <label className="block text-lg text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg shadow-md hover:bg-blue-500 transition duration-300"
        >
          Mettre à jour
        </button>
      </form>
      
      {/* Message */}
      {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
    </div>
  </div>
</div>

  );
  
};

export default AccountEditPage;
