const express = require('express');
const mysql = require('mysql2');
const Joi = require('joi');
const session = require('express-session');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(session({
  secret: 'mysecret', // Replace with your own secret key
  resave: false,
  saveUninitialized: false
}));

// Configure Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Configura la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 32769,
  user: 'root',
  password: '123456', 
  database: 'sakila',
  authPlugin: 'mysql_native_password'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ' + err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Definir un esquema de validación con Joi
const actorSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required()
});

// Configurar el middleware para leer datos JSON
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Find the user in the database
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        return done(err);
      }

      if (!results.length) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const user = results[0];

      // Check if the password is correct
      if (password !== user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      // Authentication successful
      return done(null, user);
    });
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      return done(err);
    }

    const user = results[0];

    done(null, user);
  });
});

//Rutas de login
app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Rutas para operaciones CRUD en la tabla "actor"
app.get('/actors', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;
  
  db.query('SELECT * FROM actor LIMIT ?, ?', [offset, pageSize], (err, results) => {
    if (err) {
      console.error('Error al obtener actores: ' + err.message);
      res.status(500).json({ error: 'Error al obtener actores' });
    } else {
      res.json(results);
    }
  });
});

app.get('/actors/:id', (req, res) => {
  const actorId = req.params.id;

  db.query('SELECT * FROM actor WHERE actor_id = ?', [actorId], (err, results) => { //Parámetros de la consulta, previenen SQL injection
    if (err) {
      console.error('Error al obtener el actor: ' + err.message);
      res.status(500).json({ error: 'Error al obtener el actor' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Actor no encontrado' });
      } else {
        res.json(results[0]);
      }
    }
  });
});

app.post('/actors', (req, res) => {
  const actorData = req.body;

  const { error } = actorSchema.validate(actorData); //Sanitizacion de datos

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    db.query('INSERT INTO actor SET ?', actorData, (err, result) => { //Parámetros de la consulta, previenen SQL injection
      if (err) {
        console.error('Error al crear el actor: ' + err.message);
        res.status(500).json({ error: 'Error al crear el actor' });
      } else {
        res.status(201).json({ message: 'Actor creado exitosamente' });
      }
    });
  }
});

app.put('/actors/:id', (req, res) => {
  const actorId = req.params.id;
  const actorData = req.body;

  const { error } = actorSchema.validate(actorData); //Sanitizacion de datos

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    db.query('UPDATE actor SET ? WHERE actor_id = ?', [actorData, actorId], (err, result) => { //Parámetros de la consulta, previenen SQL injection
      if (err) {
        console.error('Error al actualizar el actor: ' + err.message);
        res.status(500).json({ error: 'Error al actualizar el actor' });
      } else {
        res.json({ message: 'Actor actualizado exitosamente' });
      }
    });
  }
});

app.delete('/actors/:id', (req, res) => {
  const actorId = req.params.id;

  db.query('DELETE FROM actor WHERE actor_id = ?', [actorId], (err, result) => { //Parámetros de la consulta, previenen SQL injection
    if (err) {
      console.error('Error al eliminar el actor: ' + err.message);
      res.status(500).json({ error: 'Error al eliminar el actor' });
    } else {
      res.json({ message: 'Actor eliminado exitosamente' });
    }
  });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});
