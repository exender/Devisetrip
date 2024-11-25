const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route pour l'inscription
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès !', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la création de l’utilisateur.', error: err.message });
  }
});

module.exports = router;