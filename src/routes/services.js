const express = require('express');
const { accounts, writeJSON } =  require('../data');

const router = express.Router();

router.get('/transfer', (req, res) => {
  res.render('transfer');
});
router.post('/transfer', (req, res) => {
  const from = accounts[req.body.from];
  const to = accounts[req.body.to];
  from.balance -= req.body.amount;
  to.balance += parseInt(req.body.amount);
  writeJSON();
  res.render('transfer', {
    message: 'Transfer Completed'
  });
});

router.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit
  });
});
router.post('/payment', (req, res) => {
  const credit = accounts['credit'];
  credit.balance -= req.body.amount;
  credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit
  });
});

module.exports = router;