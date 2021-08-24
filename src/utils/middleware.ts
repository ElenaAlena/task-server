import express from "express";
import fs from "fs";

import { dateFormatter } from "./helper";

export const logger = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const data = `${dateFormatter()} ${request.method} ${
    request.url
  } ${request.get("user-agent")}`;
  fs.appendFile("server.log", data + "\n", function () {});
  next();
};

export const asyncHandler =
  (fn) => (req: express.Request, res: express.Response, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
