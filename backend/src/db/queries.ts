import { start } from "node:repl";
import { prisma } from "../lib/prisma";

async function createUser() {
  return await prisma.user.create({
    data: {
      token: crypto.randomUUID(),
    },
  });
}

async function createGame(userId: number, imageId: number) {
  return await prisma.game.create({
    data: {
      uuid: crypto.randomUUID(),
      userId,
      imageId,
    },
  });
}

async function getUserByToken(token: string) {
  return await prisma.user.findUnique({
    where: { token },
  });
}

async function getGameByUuid(uuid: string) {
  return await prisma.game.findUnique({
    where: {
      uuid,
    },
    include: {
      image: {
        include: {
          chars: true,
        },
      },
    },
  });
}

async function foundChar(uuid: string, id: number, end: string | null) {
  return await prisma.game.update({
    include: {
      user: true,
    },
    where: {
      uuid,
    },
    data: {
      foundIds: {
        push: id,
      },
      end,
    },
  });
}

async function getAllImages() {
  return await prisma.image.findMany({
    orderBy: { id: "asc" },
    omit: {
      width: true,
      height: true,
    },
    include: {
      chars: {
        omit: {
          height: true,
          width: true,
          x: true,
          y: true,
        },
      },
    },
  });
}

async function setUpUsername(token: string, username: string) {
  return await prisma.user.update({
    where: {
      token,
    },
    data: {
      username,
    },
  });
}

async function getRecords() {
  return await prisma.image.findMany({
    omit: {
      width: true,
      height: true,
    },
    include: {
      game: {
        where: {
          end: {
            not: null,
          },
        },
        include: {
          user: true,
        },
      },
    },
  });
}

export {
  createUser,
  createGame,
  getUserByToken,
  getGameByUuid,
  foundChar,
  getAllImages,
  setUpUsername,
  getRecords,
};
