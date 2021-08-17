import express from "express";
import fs from "fs";
import { nextTick } from "process";
import { checkNote } from "./api/checkNote";

import { notesApi } from "./api/notesApi";
import { Note } from "./config/note";
import { dateFormatter } from "./utils/helper";
import { validate } from "./utils/validation";

const app = express();
const jsonParser = express.json();
const port = process.env.PORT || 3000;
app.use(function (request, response, next) {
  let data = `${dateFormatter()} ${request.method} ${request.url} ${request.get(
    "user-agent"
  )}`;
  console.log(data);
  fs.appendFile("server.log", data + "\n", function () {});
  next();
});
app.get("/", (request, response) => {
  response.send(`<h1>Hello </h1>`);
});
app.get(
  "/api/greetings",
  (request: express.Request, response: express.Response) => {
    const userName = request.query.name;
    if (userName === undefined) {
      response.setHeader("Content-Type", "application/json");
      response
        .status(400)
        .send(
          JSON.stringify(
            { name: null, message: "The name was not indicated" },
            null,
            3
          )
        );
    } else {
      response.send(`<h1>Hello ${userName}</h1>`);
    }
  }
);
app.get(
  "/api/notes",
  jsonParser,
  (request: express.Request, response: express.Response) => {
    response.send(notesApi.allNotes());
  }
);
app.post(
  "/api/notes",
  jsonParser,
  (request: express.Request, response: express.Response, next) => {
    if (!request.body) return response.sendStatus(400);
    const addedNote = new Note();
    checkNote(addedNote,request.body, response) && response.send(notesApi.addNote(addedNote));
  }
);
app.put(
  "/api/notes/:id",
  jsonParser,
  (request: express.Request, response: express.Response) => {
    if (!request.body) return response.sendStatus(400);
    const changeNote = new Note();
    checkNote(changeNote,request.body, response) && response.send(notesApi.changeNote(changeNote));
  }
);
app.delete(
  "/api/notes/:id",
  (request: express.Request, response: express.Response) => {
    const id = notesApi.deleteNote(request.params.id);
    response.send(`{ success: true, id: ${id} }`);
  }
);
app.listen(port, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
