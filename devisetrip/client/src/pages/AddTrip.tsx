import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Paper, Grid } from '@mui/material';

const AddTrip: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
  });
  const [message, setMessage] = useState<string>('');

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      setFormData({ title: '', destination: '', startDate: '', endDate: '', budget: '' });
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" className="min-h-screen bg-gray-100">
      <Paper elevation={4} className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <Typography variant="h4" component="h1" className="mb-6 font-bold text-center text-gray-800">
          Ajouter un voyage
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Titre"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg"
          />
          <TextField
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg"
          />
          <TextField
            label="Date de début"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg"
          />
          <TextField
            label="Date de fin"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            className="bg-white rounded-lg"
          />
          <TextField
            label="Budget (€)"
            name="budget"
            type="number"
            value={formData.budget}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
            className="bg-white rounded-lg"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="mt-4 py-2"
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
