import { MongoClient } from "mongodb";
import dotenv from "dotenv";

import { Note } from "../config/note";
import { postfix } from "../utils/environment";

dotenv.config();

const uri = process.env.DB_CONN;
const client = new MongoClient(uri);

const notes: Array<Note> = [];
const allNotes = (): Array<Note> => {
  return notes;
};
const addNote = async (note: Note): Promise<Note> => {
  try {
    await client.connect();
    const database = client.db("notes");
    const notesCollection = database.collection("notes");
    note.title = postfix(note.title);
    await notesCollection.insertOne(note);
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return note;
};
const changeNote = async (note: Note): Promise<Note> => {
  try {
    await client.connect();
    const database = client.db("notes");
    const notesCollection = database.collection("notes");
    await notesCollection.updateOne({ id: note.id }, { $set: note });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return note;
};
const deleteNote = async (id: string): Promise<string> => {
  try {
    await client.connect();
    const database = client.db("notes");
    const notesCollection = database.collection("notes");
    await notesCollection.deleteOne({ id: id });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await client.close();
  }
  return id;
};

export const notesApi = {
  allNotes,
  addNote,
  changeNote,
  deleteNote,
};
