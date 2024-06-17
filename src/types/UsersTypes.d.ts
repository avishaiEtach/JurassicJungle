import { Article } from "./ArticlesTypes";
import { MyCustomGlobal } from "./classes";

declare global {
  interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    dob: string;
    permissions?: 1 | 2 | 3 | 4;
    favArticles: Article[];
    memberId: any;
  }

  interface newUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    dob: string;
  }
}

export { User };
