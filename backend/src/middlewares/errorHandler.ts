import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createResponse } from "../utils/response";

function inputErrorHandler(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json(createResponse("error", null));
  }
  next();
}

export { inputErrorHandler };
