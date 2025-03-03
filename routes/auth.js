const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../models/db');
const path = require('path');
const router = express.Router();

// Registration route (GET)
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Registration route (POST)
router.post('/register', (req, res) => {
    const { username, email, password , gender , mobile , dob, education} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    

    const sql = `INSERT INTO register (username, email, password, gender, mobile, dob, education) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [username, email, hashedPassword, gender, mobile, dob, education], (err, result) => {
    if (err) {
        console.error("Error inserting user:", err);
        return res.status(500).send("Database error");
    }
    console.log("User inserted successfully:", result.insertId);
    res.redirect('/auth/login');  // Redirect to login page after successful registration
});
});

// Login route (GET)
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Login route (POST)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM register WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }
        if (results.length > 0) {
            const user = results[0];
            const isMatch = bcrypt.compareSync(password, user.password);
            if (isMatch) {
                res.send('Login successful');
            } else {
                res.send('Invalid username or password');
            }
        } else {
            res.send('Invalid username or password');
        }
    });
});

module.exports = router;
