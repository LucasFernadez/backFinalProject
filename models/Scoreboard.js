const mongoose = require('mongoose');

const ScoreboardSchema = new mongoose.Schema({
  uid:   { type: String, required: true, unique: true },
  xWins: { type: Number, default: 0 },
  oWins: { type: Number, default: 0 },
  draws: { type: Number, default: 0 }
});

module.exports = mongoose.model('Scoreboard', ScoreboardSchema);