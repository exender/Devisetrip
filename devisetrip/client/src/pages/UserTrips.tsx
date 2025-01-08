import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion'; // Pour les animations modernes
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Icône de localisation
import Header from '../components/Header';

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
    return <Typography color="error" align="center" mt={4}>{error}</Typography>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat">
      {/* Inclusion du Header */}
      <Header />

      <div className="main-content flex-1 p-5">
    <Box className="container mx-auto mt-10 p-4">
      <Typography variant="h4" component="h1" gutterBottom align="center" className="font-bold text-gray-800">
        Mes voyages
      </Typography>
      {trips.length === 0 ? (
        <Typography align="center" color="textSecondary" className="text-lg">
          Aucun voyage trouvé.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {trips.map((trip) => (
            <Grid item xs={12} sm={6} md={4} key={trip._id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }} // Effet de hover subtil
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2">
                  {/* Bannière avec icône et destination */}
                  <Box className="flex items-center justify-between p-4 bg-blue-500 text-white rounded-t-lg">
                    <Typography variant="h6" component="div">
                      {trip.destination}
                    </Typography>
                    <LocationOnIcon fontSize="large" />
                  </Box>
                  <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom className="font-semibold text-gray-800">
                      {trip.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className="mb-2">
                      Dates : {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}
                    </Typography>
                    <Chip
                      label={`Budget pour l'hébergement et le transport : ${trip.budget} €`}
                      color="primary"
                      className="mt-3"
                      variant="outlined"
                    />
                    <Chip
                      label={`Budget pour les vacances : ${trip.budget_vac} €`}
                      color="primary"
                      className="mt-3"
                      variant="outlined"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
    </div></div>
  );
};

export default UserTrips;
