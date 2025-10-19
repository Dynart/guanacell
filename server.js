const express = require ('express');
const mongoose = require ('mongoose');
const cors = require ('cors');

require('dotenv').config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://guanacell-frontend-b0hzdt6g7-dynarts-projects.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json())

mongoose.connect(process.env.MONGO_URI, 
    {
       
})
.then(() => console.log('DB Connect'))
.catch(err => console.log('Fail', err))
;

app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000 ;

app.listen(PORT, () => console.log(`Servidor On Port ${PORT}`));

