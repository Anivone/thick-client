import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/ValidateRequest";
import User, { Roles } from "../../domain/User";
import { BadRequestError } from "../../errors/BadRequestError";

const router = express.Router();

router.post(
  "/api/auth/signup",
  [
    body("login").trim().not().isEmpty().withMessage("Login must not be empty"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage("Password should be within 4 and 16 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const existingUser = await User.findOne({ login });

    if (existingUser) {
      throw new BadRequestError("User with such login already exists");
    }

    const user = User.build({ login, password, role: Roles.USER });
    await user.save();

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

    return res.status(200).send(user);
  }
);

export { router as signupRouter };
