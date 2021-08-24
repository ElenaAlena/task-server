import express from "express";

import getGreeting from "./modules/greeting/controllers/getGreeting";
import defaultHandler from "./modules/home/controllers/gethome";
import { notes } from "./modules/notes/controllers/getNotesList";
import { asyncHandler, logger } from "./utils/middleware";
import { ROUTES } from "./config/constants/routes";

const app = express();
const jsonParser = express.json();
const port = process.env.PORT || 3000;

app.use(logger);

app.get(ROUTES.home, asyncHandler(defaultHandler));

app.get(ROUTES.greetings, asyncHandler(getGreeting));

app.get(ROUTES.notes, jsonParser, asyncHandler(notes.getNotes));

app.post(ROUTES.notes, jsonParser, asyncHandler(notes.addNote));

app.put(ROUTES.changenote, jsonParser, asyncHandler(notes.changeNote));

app.delete(ROUTES.changenote, asyncHandler(notes.deleteNote));

app.listen(port, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
