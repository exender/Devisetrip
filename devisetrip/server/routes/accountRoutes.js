const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Import du middleware
const bcrypt = require('bcryptjs'); // Import pour le hachage


// Route pour mettre à jour les informations utilisateur
router.post('/update', authMiddleware, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userId = req.user.id; // Utilise l'utilisateur connecté

    const updates = { name, email };

    // Si un mot de passe est fourni, le hacher avant de l'enregistrer
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });

    res.json({ message: 'Informations mises à jour avec succès', user: updatedUser });
  } catch (error) {
    console.error('[UPDATE] Erreur lors de la mise à jour:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour', error });
  }
});

module.exports = router;

// Route pour récupérer les informations utilisateur
router.get('/info', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Utilise l'utilisateur connecté
    const user = await User.findById(userId).select('-password'); // Exclut le mot de passe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des informations', error });
  }
});

module.exports = router;
