
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import path from 'path';
// import { fileURLToPath } from 'url';

// import NoteRouter from "../route/noteRoute.js";
// import connectDB from "../config/db.js";
// import rateLimiter from "../middleware/rateLimiter.js";

// // Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// dotenv.config();

// this is for the middleware
// if(process.env.NODE_ENV !== 'production'){
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//     })
//   );
// }
// app.use(express.json());
// app.use(rateLimiter);

// app.use("/api/notes", NoteRouter);

// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static(path.join(__dirname,'../../frontend/dist')))
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname,'../../frontend',"dist", 'index.html'))
//   })
// }

// const PORT = process.env.PORT || 5001;
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("Server is running on port 5001");
//   });
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import NoteRouter from "../route/noteRoute.js";
import connectDB from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// CORS configuration for both development and production
const corsOptions = {
  origin: [
    "http://localhost:5173",  
    "http://localhost:3000",  
    "https://mern-think-board-1.onrender.com"  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(rateLimiter);

// API routes
app.use("/api/notes", NoteRouter);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../../frontend/dist')))
  app.get("*", (req, res) => {
    // Make sure API routes are not caught by this catch-all
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname,'../../frontend',"dist", 'index.html'))
    }
  })
}

const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});