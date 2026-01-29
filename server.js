import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authroutes.js'
import scheduleRoutes from "./routes/scheduleRoutes.js";
import ownerRoutes from './routes/ownerRoutes.js';
import userRoutes from './routes/userRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ strict: false }));
app.get('/', (req, res) => res.send('API is Running'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/auth', ownerRoutes)
app.use("/api/schedules", scheduleRoutes);
app.use('/api/profile', userRoutes)
app.use('/api/schedules', bookingRoutes)
