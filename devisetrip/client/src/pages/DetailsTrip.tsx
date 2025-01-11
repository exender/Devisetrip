import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import du hook pour récupérer l'ID
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Button, Modal } from '@mui/material';
import AddExpense from './AddExpense';

interface Expense {
  type: string;
  amount: number;
}

const DetailsTrip: React.FC = () => {
  const { tripId } = useParams<{ tripId: string }>(); // Extraction de l'ID depuis l'URL
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState<boolean>(false);

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

  const handleOpenAddExpenseModal = () => setOpenAddExpenseModal(true);
  const handleCloseAddExpenseModal = () => setOpenAddExpenseModal(false);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Détails du voyage
      </Typography>

      <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
        Dépenses actuelles :
      </Typography>

      {loading ? (
        <Typography>Chargement...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type de dépense</TableCell>
                <TableCell align="right">Montant (€)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.type}</TableCell>
                  <TableCell align="right">{expense.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Button onClick={handleOpenAddExpenseModal} variant="contained" color="primary" sx={{ mt: 3 }}>
        Ajouter une dépense
      </Button>

      {/* Modal pour ajouter une dépense */}
      <Modal open={openAddExpenseModal} onClose={handleCloseAddExpenseModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: 500, mx: 'auto', mt: 10 }}>
          <AddExpense tripId={tripId || ''} />
          <Button onClick={handleCloseAddExpenseModal} variant="text" color="secondary" sx={{ mt: 2 }}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default DetailsTrip;
