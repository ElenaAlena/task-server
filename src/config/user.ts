import { required,length } from "../utils/validation";

export class User {
  @required()
  email: string; 

  id: string;

  @required()
  firstName: string;

  @required()
  lastName: string;

  @required()
  password:string;

  @required()
  dateOfBirth:string;
}