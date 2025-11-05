import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const scretKey = "VerfSesion";
const saltRounds = 12;

export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, saltRounds);
    const add = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashed,
      },
    });
    if (!add) {
      return res.status(404).json({
        Message: "Error while adding user!",
        Information: [],
      });
    }

    const userSafe = { ...add };
    delete userSafe.password;

    res.status(201).json({
      Message: "User succesfully created!",
      Information: userSafe,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};

export const LogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await prisma.user.findUnique({
      where: { email: email },
    });
    if (!check) {
      return res.status(404).json({
        Message: "E - mail not found !",
        Information: [],
      });
    }
    const checkPW = await bcrypt.compare(password, check.password);
    if (!checkPW) {
      return res.status(404).json({
        Message: "Wrong password!",
        Information: [],
      });
    }

    const payload = {
      id: check.id,
      name: check.name,
      email: check.email,
    };

    const token = jwt.sign(payload, scretKey, { expiresIn: "1d" });

    res.status(200).json({
      Message: "Log in successfully!",
      status: true,
      token: token,
      Information: payload,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      Message: "Error ->",
      Information: error.message,
    });
  }
};
