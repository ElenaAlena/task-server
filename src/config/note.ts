import { required,length } from "../utils/validation";

export class Note {
  @required()
  id: string; //, - идентификатор - обязательное поле при редактировании
  @required()
  @length(3)
  title: string; //, - название заметки - обязательное поле, не менее 3  символов
  @required()
  @length(3, 500)
  content: string; //,- содержание заметки - обязательное поле, не менее 3  символов и не длиннее 500 символов
  @required()
  createdAt: string; //, - дата создания заметки  
  updatedAt: string; // - дата обновления заметки, может быть пустым
  email:string;
}
