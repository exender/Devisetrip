const express = require('express');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/User'); // Modèle utilisateur
const Trip = require('../models/Trip'); // Modèle pour les voyages
const router = express.Router();

// Route pour s'inscrire
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Utilisateur({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.', error: err.message });
  }
});

// Route pour se connecter
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Utilisateur.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    res.status(200).json({
      message: 'Connexion réussie !',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

// Route pour ajouter un voyage
router.post('/addTrip', async (req, res) => {
  const { title, destination, startDate, endDate, budget } = req.body;
  try {
    const newTrip = new Trip({ title, destination, startDate, endDate, budget });
    await newTrip.save();

    res.status(201).json({ message: 'Voyage ajouté avec succès !' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l’ajout du voyage.', error: err.message });
  }
});

module.exports = router;
