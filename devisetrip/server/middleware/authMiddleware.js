const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    console.log('[AUTH MIDDLEWARE] En-tête Authorization:', req.header('Authorization'));

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé : Token manquant' });
    }

    console.log('[AUTH MIDDLEWARE] Token extrait:', token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    req.user = user; // Ajoute l'utilisateur à req.user
    console.log('[AUTH MIDDLEWARE] Utilisateur authentifié:', user.email);
    next();
  } catch (error) {
    console.error('[AUTH MIDDLEWARE] Erreur:', error.message);
    res.status(401).json({ message: 'Accès non autorisé : Token invalide', error: error.message });
  }
};

module.exports = authMiddleware;
