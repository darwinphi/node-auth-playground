import express from "express";
const router = express.Router();
import { check, validationResult } from "express-validator";

const validations = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password must be more than 4 characters").isLength({
    min: 5,
  }),
];

router.post("/signup", validations, (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  res.json({
    email,
    password,
  });
});

export default router;
