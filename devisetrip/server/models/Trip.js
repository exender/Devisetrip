const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  /*budget_vac: {
    type: Number,
    required: true,
  },*/
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle User
    required: true,
  },
}, { timestamps: true }); // Ajoute createdAt et updatedAt automatiquement

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;
