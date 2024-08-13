const bcrypt = require('bcryptjs');
const db = require('../config/db');

exports.createUser = (req, res) => {
  const { name, email, phone, role, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send(err);
    const query = 'INSERT INTO users (name, email, phone, role, password) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, phone, role, hashedPassword], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('User created');
    });
  });
};

exports.getUsers = (req, res) => {
  const query = 'SELECT id, name, email, phone, role FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.updateUser = (req, res) => {
  const { name, email, phone, role, password } = req.body;
  const userId = req.params.id;
  let query = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ?';
  const values = [name, email, phone, role];
  if (password) {
    query += ', password = ?';
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send(err);
      values.push(hashedPassword);
      query += ' WHERE id = ?';
      values.push(userId);
      db.query(query, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('User updated');
      });
    });
  } else {
    query += ' WHERE id = ?';
    values.push(userId);
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send(err);
      res.send('User updated');
    });
  }
};

exports.deleteUser = (req, res) => {
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send('User deleted');
  });
};
