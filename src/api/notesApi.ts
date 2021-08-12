import {Note} from "../config/types";

const notes: Array<Note> = [];
const allNotes = (): Array<Note> => {
  return notes;
};
const addNote = (note: Note): Note => {
  notes.push(note);
  return note;
};
const changeNote = (note: Note): Note => {
  return note;
};
const deleteNote = (id:string):string=>{
    return id;
}
export const notesApi ={
    allNotes,
    addNote,
    changeNote,
    deleteNote
}