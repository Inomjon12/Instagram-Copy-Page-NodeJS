const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT email FROM users WHERE email = ?", [email], (error, results) => {
    if (error) {
      console.log(error);
    }

    let hashedPassword = bcrypt.hash(password, 8);
    console.log(hashedPassword);
    db.query('INSERT INTO users SET ?', { email: email, password: password }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        return res.render('', {
          message: 'user registered'
        });
      }
    });
  });
};
