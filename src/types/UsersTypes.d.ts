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
    memberId?: {
      academicTitle: "Prof" | "Dr" | "none";
      articles: Article[];
      dinosaurs: Dinosaur[];
      userId: string;
      _id: string;
    };
    employeeId?: Employee;
  }

  interface Employee {
    image: string;
    jobTitleName: string;
    salary: number;
    address: string;
    department: string;
    phone: string;
    gender: "Male" | "Female" | "Other";
    age: number;
    userId: string;
  }

  interface EditEmployee {
    image: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    jobTitleName: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    salary: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    address: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    department: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    phone: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    gender: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    age: {
      value: string | number;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
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
