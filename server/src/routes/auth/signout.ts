import express, { Request, Response } from "express";

const router = express.Router();

router.post("/api/auth/signout", (req: Request, res: Response) => {
  req.session = null;

  return res.redirect("/login");
});

export { router as signOutRoute };
