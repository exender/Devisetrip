const express = require('express');
const bcrypt = require('bcryptjs');
const Utilisateur = require('../models/User');
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
  console.log('Requête reçue sur /login :', req.body);
  const { email, password } = req.body;

  try {
    const user = await Utilisateur.findOne({ email });
    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Mot de passe incorrect');
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    console.log('Connexion réussie pour :', user);
    res.status(200).json({ message: 'Connexion réussie !', user });
  } catch (err) {
    console.error('Erreur lors de la connexion :', err);
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

module.exports = router;
