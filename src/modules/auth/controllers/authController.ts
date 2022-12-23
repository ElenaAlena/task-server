import express from "express";

import { authApi } from "../../../api/authApi";
import { checkUser } from "../../../api/checkUser";
import { User } from "../../../config/user";

export const registration = (
  request: express.Request,
  response: express.Response
) => {
  if (!request.body) return response.sendStatus(400);
  const addedUser = new User();
  if (checkUser(addedUser, request.body, response)) {
    authApi
      .addUser(addedUser)
      .then((answer) => {
        response.send(answer);
      })
      .catch((error: Error) => {
        response.status(400).send(JSON.stringify({ text: error.message }));
      });
  }
};
export const login = (request: express.Request, response: express.Response) => {
  if (!request.body) return response.sendStatus(400);

  const { email, password } = request.body;
  authApi
    .checkUser(email, password)
    .then((answer) => {
      response.send(answer);
    })
    .catch((error: Error) => {
      response.status(400).send(JSON.stringify({ text: error.message }));
    });
};
export const getUsers = (
  request: express.Request,
  response: express.Response
) => {
  authApi
    .getUsers()
    .then((answer) => {
      response.send(answer);
    })
    .catch((error: Error) => {
      response.status(400).send(JSON.stringify({ text: error.message }));
    });
};
