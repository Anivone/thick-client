import express, { Request, Response } from "express";
import { body } from "express-validator";
import User from "../../domain/User";
import { Password } from "../../utils/Password";
import { BadRequestError } from "../../errors/BadRequestError";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/auth/login",
  [
    body("login").trim().not().isEmpty().withMessage("Login must not be empty"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Password should be within 4 and 16 characters"),
  ],
  async (req: Request, res: Response) => {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    if (!user) {
      throw new BadRequestError("No such user exists");
    }

    if (!(await Password.compare(user.password, password))) {
      throw new BadRequestError("Invalid credentials");
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        login: user.login,
        role: user.role,
      },
      process.env.JWT_SECRET!
    );

    req.session = {
      jwt: jwtToken,
    };

    res.status(200).send(user);
  }
);

export { router as loginRouter };
