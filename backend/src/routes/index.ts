import express from "express";
import {
  allRecords,
  checkGame,
  getMaps,
  initUser,
  setUsername,
  startGame,
} from "../controllers/index";
import { gameValidator, usernameValidator } from "../middlewares/validator";
import { inputErrorHandler } from "../middlewares/errorHandler";

const router = express.Router();

router.post("/user", initUser);
router.post("/game/start", startGame);
router.post("/game/play", gameValidator, inputErrorHandler, checkGame);
router.get("/game/maps", getMaps);
router.post(
  "/user/username",
  usernameValidator,
  inputErrorHandler,
  setUsername,
);
router.get("/game/records", allRecords);

export default router;
