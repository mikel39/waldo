import { body } from "express-validator";

const gameValidator = [
  body("gameuuid").notEmpty(),
  body("width").isNumeric().toFloat(),
  body("height").isNumeric().toFloat(),
  body("x").isNumeric().toFloat(),
  body("y").isNumeric().toFloat(),
  body("name").notEmpty(),
];

const usernameValidator = [
  body("username").isLength({
    min: 4,
    max: 20,
  }),
  body("utoken").isLength({ min: 10 }),
];
export { gameValidator, usernameValidator };
