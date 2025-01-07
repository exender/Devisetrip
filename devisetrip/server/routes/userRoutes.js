const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Import de jwt pour la génération des tokens
const Utilisateur = require('../models/User'); // Modèle utilisateur
const Trip = require('../models/Trip'); // Modèle pour les voyages
const router = express.Router();

// Route pour s'inscrire
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log('[SIGNUP] Données reçues:', { name, email });

    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      console.log('[SIGNUP] Email déjà utilisé :', email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[SIGNUP] Mot de passe haché pour :', email, hashedPassword);

    const newUser = new Utilisateur({ name, email, password: hashedPassword });
    await newUser.save();

    console.log('[SIGNUP] Utilisateur créé avec succès :', email);
    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (err) {
    console.error('[SIGNUP] Erreur lors de la création de l’utilisateur :', err);
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.', error: err.message });
  }
});


// Route pour se connecter
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('[LOGIN] Requête reçue pour :', email);

    const user = await Utilisateur.findOne({ email });
    if (!user) {
      console.log('[LOGIN] Utilisateur non trouvé :', email);
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    console.log('[LOGIN] Utilisateur trouvé :', email);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('[LOGIN] Mot de passe incorrect pour :', email);
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    console.log('[LOGIN] Mot de passe valide pour :', email);

    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('[LOGIN] Token généré pour :', email);

    res.status(200).json({
      message: 'Connexion réussie !',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token, // Renvoie le token JWT
    });
  } catch (err) {
    console.error('[LOGIN] Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

// Route pour ajouter un voyage
router.post('/addTrip', async (req, res) => {
  const { title, destination, startDate, endDate, budget } = req.body;
  try {
    console.log('[ADD TRIP] Requête reçue pour le voyage :', title);

    const newTrip = new Trip({ title, destination, startDate, endDate, budget });
    await newTrip.save();

    console.log('[ADD TRIP] Voyage ajouté avec succès :', title);
    res.status(201).json({ message: 'Voyage ajouté avec succès !' });
  } catch (err) {
    console.error('[ADD TRIP] Erreur lors de l’ajout du voyage :', err);
    res.status(500).json({ message: 'Erreur lors de l’ajout du voyage.', error: err.message });
  }
});

module.exports = router;
