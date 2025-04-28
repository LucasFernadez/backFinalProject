const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseAdmin');
const Scoreboard = require('../models/Scoreboard');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'No autorizado',
      details: err.message
    });
  }
};

router.get('/', authenticate, async (req, res) => {
  try {
    let board = await Scoreboard.findOne({ uid: req.uid });
    if (!board) {
      board = await Scoreboard.create({ uid: req.uid });
    }
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener marcador' });
  }
});

router.post('/', authenticate, async (req, res) => {
  const { result } = req.body;
  let update;
  if (result === 'X')       update = { $inc: { xWins: 1 } };
  else if (result === 'O')  update = { $inc: { oWins: 1 } };
  else if (result === 'draw') update = { $inc: { draws: 1 } };
  else return res.status(400).json({ error: 'Resultado inválido' });

  try {
    const board = await Scoreboard.findOneAndUpdate(
      { uid: req.uid },
      update,
      { new: true, upsert: true }
    );
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar marcador' });
  }
});

router.post('/reset', authenticate, async (req, res) => {
  try {
    const board = await Scoreboard.findOneAndUpdate(
      { uid: req.uid },
      { xWins: 0, oWins: 0, draws: 0 },
      { new: true, upsert: true }
    );
    res.json(board);
  } catch (err) {
    console.error('Error al resetear marcador:', err);
    res.status(500).json({ error: 'Error al resetear marcador' });
  }
});
module.exports = router;