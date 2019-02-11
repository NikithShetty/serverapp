import { Router } from "express";
import { userValidation, handleValidationErr } from "../Validation/User";
import { Request, Response } from "express-serve-static-core";
import { db } from "../DB/sequelize";
import { User } from "../DB/Models/User";
import { logger } from "../Utils/Common";

export const userRouter = Router()

userRouter.post("/register", userValidation.forRegister, handleValidationErr, (req:Request, res:Response) => {
  var newUser :User = {
    email: req.body.email
    , name: req.body.name
    , password: req.body.password
  }
  db.User.create(newUser)
    .then((user:User) => {
      res.status(200).send(user)
    }, (err:any) => {
      logger("DB error", err)
      res.status(500).send("Internal server error")
    })
})