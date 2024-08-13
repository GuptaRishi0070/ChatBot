const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = (req, res) => {
  const { name, email, phone, role, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send(err);
    const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, role, hashedPassword], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('User registered');
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('User not found');
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).send(err);
      if (!match) return res.status(400).send('Invalid credentials');
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
      res.json({ token });
    });
  });
};

exports.logout = (req, res) => {
  res.send('Logged out');
};
