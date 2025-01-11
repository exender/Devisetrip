import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddExpense from './AddExpense';
import ExpenseChart from '../components/ExpenseChart';
import { Typography, Box, CircularProgress } from '@mui/material';

const TripDetails: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/users/getExpenses/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération des dépenses.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [tripId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Détails du voyage
      </Typography>
      <AddExpense tripId={tripId} />
      <ExpenseChart expenses={expenses} />
    </Box>
  );
};

export default TripDetails;
