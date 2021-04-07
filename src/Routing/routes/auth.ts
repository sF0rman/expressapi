import express from 'express';
const router = express.Router();

router.post('/register', (req, res, next) => {
  res.send('Register');
})

router.post('/login', (req, res, next) => {
  res.send('Login')
})

router.post('logout', (req, res, next) => {
  res.send('Logout..')
})

module.exports = router;