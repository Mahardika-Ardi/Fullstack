import express from "express";
import cors from "cors";

import usersRoutes from "./routes/users.routes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "DELETE", "GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/Users", usersRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
