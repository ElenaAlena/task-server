import express from "express";
import { Note } from "../config/note";
import { validate } from "../utils/validation";

export const checkNote = (addedNote:Note, requestBody:any, response: express.Response):boolean=>{    
    try {
      addedNote.id = requestBody.id;
      addedNote.title = requestBody.title;
      addedNote.content = requestBody.content;
      addedNote.createdAt = requestBody.createdAt;
      addedNote.updatedAt = requestBody.updatedAt;      
      addedNote.email = requestBody.email;
      validate(addedNote);
    } catch (error) {
      console.log(error.message);
      response
        .status(400)
        .send(JSON.stringify({ message: error.message }, null, 3));
        return false;        
    }
    return true;
}