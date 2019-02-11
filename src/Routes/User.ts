import { Router } from "express";
import { userValidation, handleValidationErr } from "../Validation/User";
import { Request, Response } from "express-serve-static-core";

export const userRouter = Router()

userRouter.post("/register", userValidation.forRegister, handleValidationErr, (req:Request, res:Response) => {
  res.send("user all ok");
})