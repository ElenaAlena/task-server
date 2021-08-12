import express from "express";

import {notesApi} from "./api/notesApi"
import { Note } from "./config/types";

const app = express();
const jsonParser = express.json();
const port = process.env.PORT || 3000;
app.get("/", (request, response) => {
  response.send(`<h1>Hello </h1>`);
});
app.get("/api/greetings", (request: express.Request, response: express.Response) => {
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
});
app.get("/api/notes", jsonParser, (request: express.Request, response: express.Response) => {
    response.send(notesApi.allNotes())
});
app.post("/api/notes", jsonParser, (request: express.Request, response: express.Response) => {
    if(!request.body) return response.sendStatus(400);
    response.send(notesApi.addNote(request.body as Note))
});
app.put("/api/notes/:id", jsonParser, (request: express.Request, response: express.Response) => {
    if(!request.body) return response.sendStatus(400);  
    response.send(notesApi.changeNote(request.body as Note))
});
app.delete("/api/notes/:id", (request: express.Request, response: express.Response) => {
    const id = notesApi.deleteNote(request.params.id);    
    response.send(`{ success: true, id: ${id} }`)
});
app.listen(port, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
