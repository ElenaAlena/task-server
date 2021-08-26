import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

import { User } from "../config/user";

dotenv.config();

const uri = process.env.DB_CONN;
const client = new MongoClient(uri);

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, "SECRET_KEY_RANDOM", { expiresIn: "24h" });
};

const addUser = async (user: User): Promise<User> => {
  try {
    await client.connect();
    const database = client.db("notes");
    const notesCollection = database.collection("users");
    const candidate = await notesCollection.findOne({ email: user.email });
    if (candidate) {
      throw { message: `Username  ${user.email} is already taken` };
    }
    await notesCollection.insertOne(user);
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return user;
};
const checkUser = async (
  username: string,
  password: string
): Promise<object> => {
  let user: User;
  try {
    await client.connect();
    const database = client.db("notes");
    const notesCollection = database.collection("users");
    user = (await notesCollection.findOne({ email: username })) as User;
    if (!user) {
      throw { message: `Username or password is incorrect` };
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw { message: `Username or password is incorrect` };
    }
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    token: generateAccessToken(username),
  };
};

const getUsers = async () => {
  let users: Array<User>;
  try {
    await client.connect();
    const database = client.db("notes");
    const collection = database.collection("users");
    users = await collection.find().toArray();
    users = users.map((item) => {
      delete item.password;
      return item;
    });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return users;
};

export const authApi = {
  addUser,
  checkUser,
  getUsers,
};
