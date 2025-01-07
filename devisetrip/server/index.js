const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Middleware pour servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion MongoDB :', err));

// Import des routes
const userRoutes = require('./routes/userRoutes');
const accountRoutes = require('./routes/accountRoutes'); // Import des routes liées au compte

// Utilisation des routes
app.use('/api/users', userRoutes);
app.use('/api/account', accountRoutes); // Ajout des routes pour /api/account

// Route pour servir le frontend pour toutes les autres routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
