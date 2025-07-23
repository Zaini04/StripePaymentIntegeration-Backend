const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// you have to create a .env file in which variable is STRIPE_SECRET_KEY = and your key
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    console.log(paymentIntent.client_secret)

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
