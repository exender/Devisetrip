import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, Typography, Box, SelectChangeEvent } from '@mui/material';

interface Expense {
  amount: number;
  type: string;
  tripId: string;
}

const AddExpense: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [formData, setFormData] = useState<Expense>({
    amount: 0,
    type: '',
    tripId: tripId,
  });
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      setMessage({ type: 'error', text: 'Le montant doit être supérieur à zéro.' });
      return;
    }
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage({ type: 'error', text: 'Token manquant. Veuillez vous reconnecter.' });
        return;
      }

      const response = await axios.post('/api/users/addExpense', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage({ type: 'success', text: response.data.message });
      setFormData({ ...formData, amount: 0, type: '' }); // Réinitialiser le formulaire après succès
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Erreur lors de l’ajout de la dépense.',
      });
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Ajouter une dépense
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Montant"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
          fullWidth
          required
          margin="normal"
          inputProps={{ 'aria-label': 'Montant de la dépense' }}
        />
        <Select
          name="type"
          value={formData.type}
          onChange={(e) => handleChange(e as SelectChangeEvent<string>)}
          fullWidth
          required
          displayEmpty
          aria-label="Type de dépense"
        >
          <MenuItem value="" disabled>
            Sélectionnez un type
          </MenuItem>
          <MenuItem value="Transport">Transport</MenuItem>
          <MenuItem value="Hébergement">Hébergement</MenuItem>
          <MenuItem value="Alimentation">Alimentation</MenuItem>
          <MenuItem value="Activités">Activités</MenuItem>
          <MenuItem value="Autres">Autres</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Ajouter
        </Button>
      </form>
      {message && (
        <Typography
          color={message.type === 'error' ? 'error' : 'primary'}
          sx={{ mt: 2 }}
        >
          {message.text}
        </Typography>
      )}
    </Box>
  );
};

export default AddExpense;
