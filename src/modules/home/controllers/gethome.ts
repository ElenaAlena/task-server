import express from "express";

const defaultHandler = (request: express.Request, response: express.Response, next:express.NextFunction) => {
  response.send(`<h1>Hello</h1>`);
};

export default defaultHandler;