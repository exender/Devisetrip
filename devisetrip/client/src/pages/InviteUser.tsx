import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';

const InviteUser: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleInvite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('Token manquant. Veuillez vous reconnecter.');
        return;
      }

      const response = await axios.post(
        '/api/users/inviteUser',
        { tripId, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
      setEmail('');
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Erreur lors de l’invitation.');
    }
  };

  return (
    <Box>
      <Typography variant="h5">Inviter un utilisateur</Typography>
      <TextField
        label="Email de l'utilisateur"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleInvite} variant="contained" color="primary">
        Inviter
      </Button>
      {message && <Typography color="error">{message}</Typography>}
    </Box>
  );
};

export default InviteUser;
