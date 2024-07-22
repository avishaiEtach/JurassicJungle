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
    _id: string;
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

  type EmployeeGender = "Male" | "Female" | "Other";
  type MemberAcademicTitle = "Prof" | "Dr" | "none";

  interface newUser {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    dob: string;
  }

  interface newEmployee {
    image: string;
    jobTitleName: string;
    salary: number;
    address: string;
    department: string;
    phone: string;
    gender: EmployeeGender;
    age: number;
  }

  interface EditUserAdmin {
    firstname: {
      value: string;
      type: "text" | "select" | "date" | "object" | "number";
      items: { text: string; value: number }[];
    };
    lastname: {
      value: string;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    email: {
      value: string;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    dob: {
      value: Dayjs;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    permissions: {
      value: 1 | 2 | 3 | 4;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    member: {
      value: {
        academicTitle: {
          value: string | number;
          type: "select";
          items: (string | number)[];
        };
      };
      active: boolean;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
    employee: {
      value: {
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
      };
      active: boolean;
      type: "text" | "select" | "date" | "object" | "number";
      items: (string | number)[];
    };
  }

  interface newMember {
    academicTitle: MemberAcademicTitle;
  }

  interface newUserAdmin {
    firstname: string;
    lastname: string;
    email: string;
    permissions: 1 | 2 | 3 | 4;
    dob: string;
  }

  interface AdminUser {
    ids: {
      memberId: null | string;
      employeeId: null | string;
    };
    user: newUserAdmin;
    member: newMember;
    employee: newEmployee;
  }
}

export { User };
