import React, { ChangeEvent, useEffect, useState } from "react";
import { userServices } from "../../../services/user.services";
import {
  GridActionsCellItem,
  GridActionsCellItemProps,
} from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

interface useUsersFunctionsProps {
  handleOpenSnackbar: () => void;
}

export const useUsersFunctions = ({
  handleOpenSnackbar,
}: useUsersFunctionsProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);
  const [chooseUser, setChooseUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(false);
  const [editUser, setEditUser] = useState<EditUserAdmin>({
    firstname: {
      value: "",
      type: "text",
      items: [],
    },
    lastname: {
      value: "",
      type: "text",
      items: [],
    },
    email: {
      value: "",
      type: "text",
      items: [],
    },
    dob: {
      value: dayjs(new Date()),
      type: "date",
      items: [],
    },
    permissions: {
      value: 1,
      type: "select",
      items: [1, 2, 3, 4],
    },
    member: {
      value: {
        academicTitle: {
          value: "",
          type: "select",
          items: ["Prof", "Dr", "none"],
        },
      },
      active: true,
      type: "object",
      items: [],
    },
    employee: {
      value: {
        image: {
          value: "",
          type: "text",
          items: [],
        },
        jobTitleName: {
          value: "",
          type: "text",
          items: [],
        },
        salary: {
          value: "",
          type: "number",
          items: [],
        },
        address: {
          value: "",
          type: "text",
          items: [],
        },
        department: {
          value: "",
          type: "text",
          items: [],
        },
        phone: {
          value: "",
          type: "text",
          items: [],
        },
        gender: {
          value: "",
          type: "select",
          items: ["Male", "Woman", "Other"],
        },
        age: {
          value: "",
          type: "number",
          items: [],
        },
      },
      active: true,
      type: "object",
      items: [],
    },
  });
  const clearEditUser: EditUserAdmin = {
    firstname: {
      value: "",
      type: "text",
      items: [],
    },
    lastname: {
      value: "",
      type: "text",
      items: [],
    },
    email: {
      value: "",
      type: "text",
      items: [],
    },
    dob: {
      value: dayjs(new Date()),
      type: "date",
      items: [],
    },
    permissions: {
      value: 1,
      type: "select",
      items: [1, 2, 3, 4],
    },
    member: {
      value: {
        academicTitle: {
          value: "",
          type: "select",
          items: ["Prof", "Dr", "none"],
        },
      },
      active: true,
      type: "object",
      items: [],
    },
    employee: {
      value: {
        image: {
          value: "",
          type: "text",
          items: [],
        },
        jobTitleName: {
          value: "",
          type: "text",
          items: [],
        },
        salary: {
          value: "",
          type: "number",
          items: [],
        },
        address: {
          value: "",
          type: "text",
          items: [],
        },
        department: {
          value: "",
          type: "text",
          items: [],
        },
        phone: {
          value: "",
          type: "text",
          items: [],
        },
        gender: {
          value: "",
          type: "select",
          items: ["Male", "Woman", "Other"],
        },
        age: {
          value: "",
          type: "number",
          items: [],
        },
      },
      active: true,
      type: "object",
      items: [],
    },
  };

  useEffect(() => {
    getUsers();
  }, []);

  function isUserProperty(key: string): key is keyof EditUserAdmin {
    return key in editUser;
  }

  function isEmployeeProperty(key: string): key is keyof EditEmployee {
    return key in editUser.employee.value;
  }

  const getUsers = async () => {
    setLoading(true);
    const usersToShow: User[] = await userServices.getallUsers();
    setUsers([...usersToShow]);
    setLoading(false);
  };

  const onChooseUser = (user: User) => {
    setChooseUser(user);
    let userToEdit = { ...clearEditUser };
    for (const key in userToEdit) {
      if (isUserProperty(key) && key !== "member" && key !== "employee") {
        if (key === "permissions") {
          userToEdit[key].value = user[key] as 1 | 2 | 3 | 4;
        } else {
          userToEdit[key].value = user[key];
        }
        if (key === "dob") {
          userToEdit[key].value = dayjs(user[key]);
        }
      } else if (key === "member" && user.memberId) {
        userToEdit[key].value = {
          academicTitle: {
            ...userToEdit[key].value.academicTitle,
            value: user["memberId"].academicTitle,
          },
        };
      } else if (key === "employee" && user.employeeId) {
        for (const employeeKey in userToEdit.employee.value) {
          if (isEmployeeProperty(employeeKey)) {
            userToEdit.employee.value[employeeKey].value =
              user.employeeId[employeeKey];
          }
        }
      }
    }
    setEditUser(userToEdit);
  };

  function UserActionItem({
    actionFunction,
    ...props
  }: GridActionsCellItemProps & {
    actionFunction: () => void;
  }) {
    return (
      <React.Fragment>
        <GridActionsCellItem
          {...props}
          onClick={() => {
            actionFunction();
          }}
        />
      </React.Fragment>
    );
  }

  const getPermission = (user: User) => {
    if (user.permissions === 4) {
      return <Chip className="permission__chip admin" label="admin" />;
    }
    if (user.permissions === 3) {
      return <Chip className=" permission__chip employee" label="employee" />;
    }
    if (user.permissions === 2) {
      return <Chip className="permission__chip member" label="member" />;
    }

    return <Chip className="permission__chip user" label="user" />;
  };

  const deleteUser = async (userId: string) => {
    await userServices.deleteUser(userId);
    getUsers();
  };

  const deleteUsers = async () => {
    await userServices.deleteUsers(selectedUsersId);
    getUsers();
  };

  const getPermissionLabel = (permission: number) => {
    if (permission === 4) {
      return "admin";
    }
    if (permission === 3) {
      return "employee";
    }
    if (permission === 2) {
      return "member";
    }

    return "user";
  };

  const onChange = (
    ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key?: "employee" | "member"
  ) => {
    const { name, value, type } = ev.target;
    if (isUserProperty(name) && name !== "employee" && name !== "member") {
      setEditUser((prev) => {
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value,
          },
        };
      });
    } else if (key && key === "employee" && isEmployeeProperty(name)) {
      setEditUser((prev) => {
        return {
          ...prev,
          employee: {
            ...prev.employee,
            value: {
              ...prev.employee.value,
              [name]: {
                ...prev.employee.value[name],
                value: type === "number" ? +value : value,
              },
            },
          },
        };
      });
    } else if (key && key === "member") {
      setEditUser((prev) => {
        return {
          ...prev,
          member: {
            ...prev.member,
            value: {
              academicTitle: {
                ...prev.member.value.academicTitle,
                value: value,
              },
            },
          },
        };
      });
    }
  };

  const onChangeDate = (newDate: Dayjs | null, inputName: string) => {
    if (isUserProperty(inputName)) {
      setEditUser((prev) => {
        return {
          ...prev,
          [inputName]: {
            ...prev[inputName],
            value: newDate,
          },
        };
      });
    }
  };

  const onSendUser = async () => {
    let ids: {
      memberId: null | string;
      employeeId: null | string;
    } = {
      memberId: null,
      employeeId: null,
    };

    let member: newMember = {} as newMember;
    let employee: newEmployee = {} as newEmployee;

    let user: newUserAdmin = {
      dob: editUser.dob.value.toISOString(),
      email: editUser.email.value,
      firstname: editUser.firstname.value,
      lastname: editUser.lastname.value,
      permissions: editUser.permissions.value,
    };

    if (editUser.permissions.value >= 2 && chooseUser) {
      ids.memberId = chooseUser.memberId ? chooseUser.memberId._id : null;
      member.academicTitle = editUser.member.value.academicTitle
        .value as MemberAcademicTitle;
    }

    if (editUser.permissions.value >= 3 && chooseUser) {
      ids.employeeId = chooseUser.employeeId ? chooseUser.employeeId._id : null;
      employee = {
        image: editUser.employee.value.image.value as string,
        jobTitleName: editUser.employee.value.jobTitleName.value as string,
        salary: editUser.employee.value.salary.value as number,
        address: editUser.employee.value.address.value as string,
        department: editUser.employee.value.department.value as string,
        phone: editUser.employee.value.phone.value as string,
        gender: editUser.employee.value.gender.value as EmployeeGender,
        age: editUser.employee.value.age.value as number,
      };
    }

    const res = { ids, user, member, employee };
    if (chooseUser) {
      await userServices.updateUserByAdmin(res, chooseUser?._id ?? null);
    } else {
      await userServices.createUserByAdmin(res);
    }
    handleOpenSnackbar();
    getUsers();
  };

  return {
    editUser,
    users,
    loading,
    setSelectedUsersId,
    selectedUsersId,
    getUsers,
    setEditUser,
    getPermission,
    UserActionItem,
    onChooseUser,
    deleteUser,
    deleteUsers,
    getPermissionLabel,
    onChange,
    onChangeDate,
    onSendUser,
    clearEditUser,
    isUserProperty,
    isEmployeeProperty,
    chooseUser,
  };
};
