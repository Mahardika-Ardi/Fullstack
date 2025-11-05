import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://register-three-beryl.vercel.app/",
    ],
    methods: ["POST", "PUT", "DELETE", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/Users", usersRoutes);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
