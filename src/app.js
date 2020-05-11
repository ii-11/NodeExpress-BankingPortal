const path = require('path');
const express = require('express');
const { accounts, users, writeJSON } = require('./data')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Account Summary',
      accounts
    });
});
app.get('/profile', (req, res) => {
  res.render('profile',
    {
      user: users[0]
    });
});

app.get('/savings', (req, res) => {
  res.render('account',
    {
      account: accounts.savings
    });
});
app.get('/checking', (req, res) => {
  res.render('account',
    {
      account: accounts.checking
    });
});
app.get('/credit', (req, res) => {
  res.render('account',
    {
      account: accounts.credit
    });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});
app.post('/transfer', (req, res) => {
  const from = accounts[req.body.from];
  const to = accounts[req.body.to];
  from.balance -= req.body.amount;
  to.balance += parseInt(req.body.amount);
  writeJSON();
  res.render('transfer', {
    message: 'Transfer Completed'
  });
});

app.get('/payment', (req, res) => {
  res.render('payment', {
    account: accounts.credit
  });
});
app.post('/payment', (req, res) => {
  const credit = accounts['credit'];
  credit.balance -= req.body.amount;
  credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit
  });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
})
