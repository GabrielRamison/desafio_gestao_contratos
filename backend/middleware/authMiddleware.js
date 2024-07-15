const express = require('express');
const app = express();

app.use(express.json());

// Middleware para log do corpo da solicitação
app.use((req, res, next) => {
  console.log('Request body:', req.body);
  next();
});

const contractRoutes = require('./routes/contractRoutes');
app.use('/contracts', contractRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
