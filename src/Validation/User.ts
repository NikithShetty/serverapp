import { check, validationResult } from 'express-validator/check'
import { db } from '../DB/sequelize';
import { Request, Response } from 'express-serve-static-core';
import { User } from 'src/DB/Models/User';

export const userValidation = {
  forRegister: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => db.User.findOne({ where: { email } }).then((u: User) => !!!u ))
      .withMessage('Email exists'),
    check('password')
      .isLength({ min: 8 }).withMessage('Invalid password'),
    check('confirmPassword')
      .custom((confirmPassword, { req }) => req.body.password === confirmPassword)
      .withMessage('Passwords are different')
  ],
  forLogin: [
    check('email')
      .isEmail().withMessage('Invalid email format')
      .custom(email => db.User.findOne({ where: { email } }).then((u: User) => !!u)).withMessage('Invalid email or password'),
    check('password')
      .custom((password, { req }) => {
        return db.User.findOne({ where: { email: req.body.email } })
          // .then(u => bcrypt.compare(password, u!.password))
      }).withMessage('Invalid email or password')
  ]
}

export const handleValidationErr = function (req:Request, res:Response, next:Function) {
  const errors = validationResult(req)
  if (!errors.isEmpty())
    return res.status(422).json(errors.array().map((err:{msg: String}) => err.msg))
  next()
}