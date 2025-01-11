import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Chip, Button, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Header from '../components/Header';
import AddExpense from './AddExpense';
import TripDetails from './TripDetails';
import { useNavigate } from 'react-router-dom'; // Pour la navigation

interface Trip {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
  budget_vac: number;
}

const UserTrips: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null); // ID du voyage sélectionné
  const [openExpenseModal, setOpenExpenseModal] = useState<boolean>(false); // Modal "Voir les dépenses"
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState<boolean>(false); // Modal "Ajouter une dépense"
  const navigate = useNavigate(); // Pour rediriger vers "DetailsTrip"

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token manquant. Veuillez vous reconnecter.');
          return;
        }

        const response = await axios.get('/api/users/getTrips', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTrips(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Erreur lors de la récupération des voyages.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleOpenExpenseModal = (tripId: string) => {
    setSelectedTripId(tripId);
    setOpenExpenseModal(true);
  };

  const handleCloseExpenseModal = () => {
    setOpenExpenseModal(false);
    setSelectedTripId(null);
  };

  const handleOpenAddExpenseModal = (tripId: string) => {
    setSelectedTripId(tripId);
    setOpenAddExpenseModal(true);
  };

  const handleCloseAddExpenseModal = () => {
    setOpenAddExpenseModal(false);
    setSelectedTripId(null);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="textSecondary">
          Chargement des voyages...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('../images/vol.png')" }}>
      <Header />

      <Box className="p-5">
        <Typography variant="h4" component="h1" className="font-bold text-white text-center mb-12">
          Mes voyages
        </Typography>

        <Box className="container mx-auto mt-10 p-4">
          {trips.length === 0 ? (
            <Typography align="center" color="textSecondary" variant="h6">
              Aucun voyage trouvé.
            </Typography>
          ) : (
            <Grid container spacing={4}>
              {trips.map((trip) => (
                <Grid item xs={12} sm={6} md={4} key={trip._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Card className="shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-black bg-opacity-40 rounded-lg">
                      <Box className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
                        <Typography variant="h6">{trip.destination}</Typography>
                        <LocationOnIcon fontSize="large" />
                      </Box>
                      <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom color="white">
                          {trip.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" className="mb-2">
                          Dates : {new Date(trip.startDate).toLocaleDateString()} -{' '}
                          {new Date(trip.endDate).toLocaleDateString()}
                        </Typography>
                        <Chip
                          label={`Budget Hébergement & Transport : ${trip.budget} €`}
                          color="primary"
                          className="mt-3"
                          variant="outlined"
                        />
                        <Chip
                          label={`Budget Vacances : ${trip.budget_vac} €`}
                          color="primary"
                          className="mt-3"
                          variant="outlined"
                        />
                        <Box mt={2}>
                          <Button
                            onClick={() => handleOpenExpenseModal(trip._id)} // Voir les dépenses
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="mb-2"
                          >
                            Voir les dépenses
                          </Button>
                          <Button
                            onClick={() => handleOpenAddExpenseModal(trip._id)} // Ajouter une dépense
                            variant="outlined"
                            color="secondary"
                            fullWidth
                          >
                            Ajouter une dépense
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      {/* Modal pour afficher les dépenses */}
      <Modal open={openExpenseModal} onClose={handleCloseExpenseModal}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: 600,
            mx: 'auto',
            mt: 10,
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          {selectedTripId && <TripDetails tripId={selectedTripId} />}
          <Button
            onClick={() => navigate(`/trips/${selectedTripId}/details`)} // Rediriger vers DetailsTrip
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Plus de détails
          </Button>
          <Button onClick={handleCloseExpenseModal} variant="text" color="secondary" sx={{ mt: 2 }}>
            Fermer
          </Button>
        </Box>
      </Modal>

      {/* Modal pour ajouter une dépense */}
      <Modal open={openAddExpenseModal} onClose={handleCloseAddExpenseModal}>
        <Box sx={{ p: 4, backgroundColor: 'white', borderRadius: '8px', maxWidth: 500, mx: 'auto', mt: 10 }}>
          {selectedTripId && <AddExpense tripId={selectedTripId} />}
          <Button onClick={handleCloseAddExpenseModal} variant="text" color="secondary" sx={{ mt: 2 }}>
            Fermer
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UserTrips;
