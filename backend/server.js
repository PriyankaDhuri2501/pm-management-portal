import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DbCon from './Utils/db.js';
import AuthRoutes from './Routes/Auth.js';
import AuthAdmin from './Routes/AdminRoute.js';
import cookieparser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

DbCon();

const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://rbac-frontend-bu6e.onrender.com" // For production
];

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // Required if you're using cookies/sessions
}));

// Middleware
app.use(express.json());
app.use(cookieparser());

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/admin', AuthAdmin);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});