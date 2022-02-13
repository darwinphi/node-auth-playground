import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";
import users from "../database.js";

const validations = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password must be more than 4 characters").isLength({
    min: 5,
  }),
];

const checkValidations = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
};

const emailExists = (email, res) => {
  const user = users.find((user) => user.email === email);
  if (user) {
    res.status(400).json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
    });
  }
};

router.post("/signup", validations, (req, res) => {
  const { email, password } = req.body;

  checkValidations(req, res);
  emailExists(email, res);

  res.json({
    email,
    password,
  });
});

export default router;
