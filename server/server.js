import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './Router/route.js';
import routerr from './Router/getUsers.js';
import rolerouter from './Router/rolerouter.js';
import adminrouter from './Router/adminrouter.js';
import locationRouter from './Router/locationrouter.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.status(201).json('Home Get Request');
});

app.use('/api', router);
app.use('/api', routerr);
app.use('/api', rolerouter);
app.use('/api', adminrouter);
app.use('/api', locationRouter);
app.use('/uploads/files/', express.static(process.cwd() + '/uploads/files/'));

// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected');
  } catch (error) {
    console.error('Invalid database Connection', error);
    throw error;
  }
};

// Start Server
const port = process.env.PORT || 8000;

connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server connected to ${port}`);
    });
  })
  .catch((error) => {
    console.error('Cannot connect to the server', error);
  });

export default app;