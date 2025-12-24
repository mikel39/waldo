import { Request, Response } from "express";
import {
  createGame,
  createUser,
  getGameByUuid,
  getUserByToken,
  foundChar,
  getAllImages,
  setUpUsername,
  getRecords,
} from "../db/queries";
import { createResponse } from "../utils/response";
import { matchedData } from "express-validator";

async function initUser(req: Request, res: Response) {
  const token = await createUser();
  const response = createResponse("success", token);
  res.json(response);
}

async function startGame(req: Request, res: Response) {
  const { uuid, imageid } = req.body;
  const user = await getUserByToken(uuid);

  if (!user || isNaN(Number(imageid))) {
    return res.status(400).json(createResponse("error", null));
  }

  const data = await createGame(user.id, Number(imageid));
  res.json(createResponse("success", data));
}

async function checkGame(req: Request, res: Response) {
  const { gameuuid, width, height, name, x, y } = matchedData(req);
  const game = await getGameByUuid(gameuuid);

  if (
    !game ||
    game.end ||
    (game.image.width / game.image.height).toFixed(3) !==
      (width / height).toFixed(3)
  ) {
    return res.status(404).json(createResponse("error", null));
  }

  for (const char of game.image.chars) {
    if (char.name === name) {
      const startX = char.x / game.image.width;
      const endX = (char.x + char.width) / game.image.width;
      const startY = char.y / game.image.height;
      const endY = (char.y + char.height) / game.image.height;

      const pointX = x / width;
      const pointY = y / height;

      if (
        pointX > startX &&
        pointX < endX &&
        pointY > startY &&
        pointY < endY
      ) {
        const isFound = game.foundIds.includes(char.id);
        if (isFound) {
          return res.json(createResponse("success", null));
        }

        let end = null;
        if (game.foundIds.length === game.image.chars.length - 1) {
          end = new Date().toISOString();
        }
        const updated = await foundChar(game.uuid, char.id, end);
        return res.json(createResponse("success", updated));
      }
    }
  }

  res.json(createResponse("success", null));
}

async function getMaps(req: Request, res: Response) {
  const maps = await getAllImages();
  const url = req.protocol + "://" + req.host;

  const result = maps.map((mp) => {
    return {
      ...mp,
      url: `${url}/static/${mp.name}/main.webp`,
      chars: mp.chars.map((char) => {
        return {
          ...char,
          url: `${url}/static/${mp.name}/${char.name}.svg`,
        };
      }),
    };
  });

  res.json(createResponse("success", result));
}

async function setUsername(req: Request, res: Response) {
  const { utoken, username } = matchedData(req);
  const data = await setUpUsername(utoken, username);
  res.json(createResponse("success", data));
}

async function allRecords(req: Request, res: Response) {
  const records = await getRecords();
  res.json(createResponse("success", records));
}

export { startGame, initUser, checkGame, getMaps, setUsername, allRecords };
