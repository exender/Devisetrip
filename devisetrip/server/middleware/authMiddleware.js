const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Log uniquement en mode développement
    if (process.env.NODE_ENV === 'development') {
      console.log('[AUTH MIDDLEWARE] En-tête Authorization:', req.header('Authorization'));
    }

    // Extraction du token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Accès non autorisé : Token manquant' });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[AUTH MIDDLEWARE] Token extrait:', token);
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Ajout d'informations limitées sur l'utilisateur dans req.user
    req.user = { id: user._id, email: user.email };

    if (process.env.NODE_ENV === 'development') {
      console.log('[AUTH MIDDLEWARE] Utilisateur authentifié:', user.email);
    }

    next();
  } catch (error) {
    console.error('[AUTH MIDDLEWARE] Erreur:', error.message);

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré, veuillez vous reconnecter.' });
    }

    res.status(401).json({ message: 'Accès non autorisé : Token invalide', error: error.message });
  }
};

module.exports = authMiddleware;
