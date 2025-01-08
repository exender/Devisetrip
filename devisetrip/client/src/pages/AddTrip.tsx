import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Ajoutez cette ligne

const AddTrip: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    budget_vac: '',
  });
  const [message, setMessage] = useState<string>('');

  const navigate = useNavigate(); // Initialisez useNavigate ici

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const today = new Date();
    const endDate = new Date();
    endDate.setDate(today.getDate() + 8);

    setFormData((prevData) => ({
      ...prevData,
      startDate: formatDate(today),
      endDate: formatDate(endDate),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'budget') {
      // Validation pour le champ "budget"
      const isValid = /^\d*\.?\d{0,3}$/.test(value) && (parseFloat(value) > 0 || value === '');
      if (!isValid) return; // Si la saisie est invalide, ne rien faire
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Token non disponible. Veuillez vous reconnecter.');
        return;
      }

      const response = await axios.post('/api/users/addTrip', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data.message);
      setFormData({ title: '', destination: '', startDate: '', endDate: '', budget: '', budget_vac: '' });

      // Rediriger après l'ajout réussi du voyage
      navigate('/trips');  // Remplacez '/nouveau-voyage' par le chemin de votre composant
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <Paper elevation={8} className="p-8 rounded-xl shadow-2xl w-full max-w-md">
        <Typography variant="h4" component="h1" className="mb-6 font-bold text-center text-gray-800">
          Ajouter un nouveau voyage
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextField
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Date de Départ"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Date de Retour"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Budget Hotel + Transports"
            name="budget"
            type="text"
            value={formData.budget}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <TextField
            label="Budget vacances (hors Transport & Hébergement)"
            name="budget_vac"
            type="text"
            value={formData.budget_vac}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg p-2 shadow-md"
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            className="mt-6 py-2 rounded-lg text-white hover:bg-indigo-600 transition-all"
          >
            Ajouter
          </Button>
        </form>
        {message && (
          <Typography variant="body2" color="error" align="center" className="mt-4">
            {message}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default AddTrip;
