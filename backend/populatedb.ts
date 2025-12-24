import { prisma } from "./src/lib/prisma";
import data from "./data";

function initializeDb(): void {
  data.forEach(async ({ width, height, characters, name }) => {
    await prisma.image.create({
      data: {
        name,
        width,
        height,
        chars: {
          createMany: {
            data: [...characters],
          },
        },
      },
    });
  });
}

initializeDb();
