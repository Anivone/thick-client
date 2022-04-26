import express, { Response } from "express";
import { currentUser, MyRequest } from "../../middlewares/CurrentUser";

const router = express.Router();

router.get(
  "/api/auth/current-user",
  currentUser,
  (req: MyRequest, res: Response) => {
    res.status(200).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRoute };
