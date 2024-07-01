const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');

const app = express();
app.use(bodyParser.json());
app.use(cors());
// relace with your mongoDB URI
const uri = "mongodb+srv://username:password@cluster0.zkilv4o.mongodb.net/";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Sample route
app.get('/', (req, res) => {
  res.send('API is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
