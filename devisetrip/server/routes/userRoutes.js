const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); // Ajout de mongoose pour la validation des ObjectId
const Utilisateur = require('../models/User'); // Modèle utilisateur
const Trip = require('../models/Trip'); // Modèle pour les voyages
const Expense = require('../models/Expense'); // Modèle pour les dépenses
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

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

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('[SIGNUP] Mot de passe haché pour :', email);

    const newUser = new Utilisateur({ name, email, password: hashedPassword });
    await newUser.save();

    console.log('[SIGNUP] Utilisateur créé avec succès :', email);
    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (err) {
    console.error('[SIGNUP] Erreur :', err);
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

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('[LOGIN] Mot de passe incorrect pour :', email);
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('[LOGIN] Token généré pour :', email);

    res.status(200).json({
      message: 'Connexion réussie !',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error('[LOGIN] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de la connexion.', error: err.message });
  }
});

// Route pour ajouter un voyage
router.post('/addTrip', authMiddleware, async (req, res) => {
  const { title, destination, startDate, endDate, budget, budget_vac } = req.body;

  try {
    console.log('[ADD TRIP] Requête reçue pour le voyage :', title);

    const newTrip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      budget,
      budget_vac,
      user: req.user.id,
    });

    await newTrip.save();

    console.log('[ADD TRIP] Voyage ajouté avec succès :', title);
    res.status(201).json({ message: 'Voyage ajouté avec succès !' });
  } catch (err) {
    console.error('[ADD TRIP] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de l’ajout du voyage.', error: err.message });
  }
});

// Route pour récupérer les voyages
router.get('/getTrips', authMiddleware, async (req, res) => {
  try {
    console.log('[GET TRIPS] Requête reçue pour l’utilisateur :', req.user.id);

    const trips = await Trip.find({ user: req.user.id });

    console.log('[GET TRIPS] Voyages trouvés :', trips.length);
    res.json(trips);
  } catch (err) {
    console.error('[GET TRIPS] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des voyages.', error: err.message });
  }
});

// Route pour ajouter une dépense
router.post('/addExpense', authMiddleware, async (req, res) => {
  const { tripId, amount, type } = req.body;

  console.log('[ADD EXPENSE] Requête reçue :', { tripId, amount, type });

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'ID de voyage invalide.' });
  }

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return res.status(404).json({ message: 'Voyage non trouvé.' });
    }

    const newExpense = new Expense({ trip: tripId, amount, type });
    await newExpense.save();

    console.log('[ADD EXPENSE] Dépense ajoutée avec succès :', newExpense);
    res.status(201).json({ message: 'Dépense ajoutée avec succès', expense: newExpense });
  } catch (err) {
    console.error('[ADD EXPENSE] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de l’ajout de la dépense.', error: err.message });
  }
});

// Route pour récupérer les dépenses d'un voyage
router.get('/getExpenses/:tripId', authMiddleware, async (req, res) => {
  const { tripId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(tripId)) {
    return res.status(400).json({ message: 'ID de voyage invalide.' });
  }

  try {
    const expenses = await Expense.find({ trip: tripId });

    if (!expenses.length) {
      return res.status(404).json({ message: 'Aucune dépense trouvée pour ce voyage.' });
    }

    res.json(expenses);
  } catch (err) {
    console.error('[GET EXPENSES] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des dépenses.', error: err.message });
  }
});

// Route pour mettre à jour une dépense
router.put('/updateExpense/:expenseId', authMiddleware, async (req, res) => {
  const { expenseId } = req.params;
  const { amount, type } = req.body;

  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(400).json({ message: 'ID de dépense invalide.' });
  }

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, type },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Dépense non trouvée.' });
    }

    res.json({ message: 'Dépense mise à jour avec succès', expense: updatedExpense });
  } catch (err) {
    console.error('[UPDATE EXPENSE] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la dépense.', error: err.message });
  }
});

// Route pour supprimer une dépense
router.delete('/deleteExpense/:expenseId', authMiddleware, async (req, res) => {
  const { expenseId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(400).json({ message: 'ID de dépense invalide.' });
  }

  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Dépense non trouvée.' });
    }

    res.json({ message: 'Dépense supprimée avec succès' });
  } catch (err) {
    console.error('[DELETE EXPENSE] Erreur :', err);
    res.status(500).json({ message: 'Erreur lors de la suppression de la dépense.', error: err.message });
  }
});

module.exports = router;
