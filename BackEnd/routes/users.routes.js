import express from "express";

import { SignUp, LogIn } from "../controller/users.controller.js";

const app = express();

app.post("/SignUp", SignUp);
app.post("/LogIn", LogIn);

export default app;
