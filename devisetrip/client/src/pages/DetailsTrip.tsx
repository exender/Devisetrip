import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AddExpense from './AddExpense';

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
        { tripId, email }, // Vérifiez que tripId et email sont bien passés
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

      {/* Section pour inviter des utilisateurs */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Inviter un utilisateur :</Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button onClick={handleInvite} variant="contained" color="secondary">
          Envoyer l’invitation
        </Button>
        {inviteMessage && (
          <Typography color="primary" sx={{ mt: 2 }}>
            {inviteMessage}
          </Typography>
        )}
      </Box>

      {/* Liste des utilisateurs invités */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Utilisateurs invités :</Typography>
        <List>
          {invitedUsers.map((user) => (
            <ListItem key={user._id}>
              <ListItemText primary={user.email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default DetailsTrip;
