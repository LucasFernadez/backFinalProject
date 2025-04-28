require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const scoreboardRouter = require('./routes/scoreboard');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Error MongoDB:', err));

app.use('/api/scoreboard', scoreboardRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`));