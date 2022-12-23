import express from "express";
const bcrypt = require('bcryptjs');

import { User } from "../config/user";
import { validate } from "../utils/validation";

export const checkUser = (
  addedUser: User,
  requestBody: any,
  response: express.Response
): boolean => {
  try {
    addedUser.id = requestBody.id;
    addedUser.dateOfBirth = requestBody.dateOfBirth;
    addedUser.email = requestBody.email;
    addedUser.firstName = requestBody.firstName;
    addedUser.lastName = requestBody.lastName;
    addedUser.password = requestBody.password ? bcrypt.hashSync(requestBody.password, 7) : requestBody.password;
    validate(addedUser);
  } catch (error) {
    response
      .status(400)
      .send(JSON.stringify({ message: error.message }, null, 3));
    return false;
  }
  return true;
};
