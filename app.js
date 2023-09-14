require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/movies' } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { login, createUsers } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.post('/signin', login);
app.post('/signup', createUsers);

app.use((req, res, next) => {
  req.user = {
    _id: '6501d6142524eb26b9d5d7ad',
  };

  next();
});

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.listen(PORT);
