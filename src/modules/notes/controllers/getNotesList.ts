import express from "express";

import { checkNote } from "../../../api/checkNote";
import { notesApi } from "../../../api/notesApi";
import { Note } from "../../../config/note";

const getNotes = (request: express.Request, response: express.Response) => {
  response.send(notesApi.allNotes());
};
const addNote = (request: express.Request, response: express.Response) => {
  if (!request.body) return response.sendStatus(400);
  const addedNote = new Note();
  if (checkNote(addedNote, request.body, response)) {
    notesApi
      .addNote(addedNote)
      .then((note) => {
        response.send(note);
      })
      .catch((error: Error) => {
        response.sendStatus(500).send({ message: error.message });
      });
  }
};
const changeNote = (request: express.Request, response: express.Response) => {
  if (!request.body) return response.sendStatus(400);
  const changeNote = new Note();
  if (checkNote(changeNote, request.body, response)) {
    notesApi
      .changeNote(changeNote)
      .then((note) => {
        response.send(note);
      })
      .catch((error: Error) => {
        response.status(500).send({ message: error.message });
      });
  }
};
const deleteNote = (request: express.Request, response: express.Response) => {
  notesApi
    .deleteNote(request.params.id)
    .then((id) => {
      response.send(`{ success: true, id: ${id} }`);
    })
    .catch((error: Error) => {
      response.status(500).send({ message: error.message });
    });
};

export const notes = {
  getNotes,
  addNote,
  changeNote,
  deleteNote,
};
