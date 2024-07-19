import React, {
  ChangeEvent,
  JSXElementConstructor,
  useEffect,
  useMemo,
  useState,
} from "react";
import { userServices } from "../../services/user.services";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import no_user_icon from "../../assets/images/no_user_icon.png";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridToolbar,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useModal } from "../../components/Modal/useModal";
import { formatString } from "../../assets/util";
import { useDialog } from "../../components/Dialog/useDialog";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface EditUser {
  firstname: {
    value: string;
    type: "text" | "select" | "date" | "object";
    items: { text: string; value: number }[];
  };
  lastname: {
    value: string;
    type: "text" | "select" | "date" | "object";
    items: (string | number)[];
  };
  email: {
    value: string;
    type: "text" | "select" | "date" | "object";
    items: (string | number)[];
  };
  dob: {
    value: Dayjs;
    type: "text" | "select" | "date" | "object";
    items: (string | number)[];
  };
  permissions: {
    value: string | number;
    type: "text" | "select" | "date" | "object";
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
    type: "text" | "select" | "date" | "object";
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
    type: "text" | "select" | "date" | "object";
    items: (string | number)[];
  };
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsersId, setSelectedUsersId] = useState<string[]>([]);
  const [editUser, setEditUser] = useState<EditUser>({
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

  const { MUIModal, handleOpen } = useModal();
  const { handleCloseDialog, handleOpenDialog, MUIDialog } = useDialog();

  useEffect(() => {
    getUsers();
  }, []);

  function isUserProperty(key: string): key is keyof EditUser {
    return key in editUser;
  }

  function isEmployeeProperty(key: string): key is keyof EditEmployee {
    return key in editUser.employee.value;
  }

  const getUsers = async () => {
    const usersToShow: User[] = await userServices.getallUsers();
    setUsers([...usersToShow]);
  };

  const chooseUser = (user: User) => {
    let userToEdit = { ...editUser };
    for (const key in userToEdit) {
      if (isUserProperty(key) && key !== "member" && key !== "employee") {
        if (key === "permissions") {
          userToEdit[key].value = user[key] as number;
        } else {
          userToEdit[key].value = user[key];
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "ID",
      width: 70,
      renderCell: (params: GridRenderCellParams<any, User>) => {
        const index = users.findIndex((user) => params.row.id === user._id);
        return index + 1;
      },
      resizable: false,
      filterable: false,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "firstName",
      headerClassName: "super-app-theme--header",
      headerName: "First name",
      width: 130,
      // filterable: false,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "lastName",
      headerClassName: "super-app-theme--header",
      headerName: "Last name",
      width: 130,
      // filterable: false,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "permissions",
      headerClassName: "super-app-theme--header",
      headerName: "Permission",
      type: "singleSelect",
      width: 130,
      valueOptions: ["user", "member", "employee", "admin"],
      valueGetter: (value: number) =>
        value === 4
          ? "admin"
          : value === 3
          ? "employee"
          : value === 2
          ? "member"
          : "user",
      renderCell: (params: GridRenderCellParams<any, User>) =>
        getPermission(params.row.user),
      resizable: false,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <UserActionItem
          label="Edit"
          showInMenu
          icon={<EditIcon />}
          actionFunction={() => {
            handleOpen();
            chooseUser(params.row.user);
          }}
          closeMenuOnClick={false}
        />,
        <UserActionItem
          label="Delete"
          showInMenu
          icon={<DeleteIcon />}
          actionFunction={() => {
            handleOpenDialog();
            setSelectedUsersId([params.row.user._id]);
          }}
          closeMenuOnClick={false}
        />,
      ],
      disableColumnMenu: true,
      resizable: false,
      filterable: false,
    },
  ];

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

  const data = useMemo(() => {
    console.log("users", users);
    return users.map((user, index) => {
      return {
        id: user._id,
        firstName: user.firstname,
        lastName: user.lastname,
        permissions: user.permissions,
        user: user,
      };
    });
  }, [users]);

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
    const { name, value } = ev.target;
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
                value: value,
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

  const EditUserModal = useMemo(() => {
    let inputs: any[] = [];
    let employeeInputs: any[] = [];
    Object.keys(editUser).forEach((key) => {
      if (isUserProperty(key)) {
        const { value, type } = editUser[key];
        if (type === "text") {
          inputs.push(
            <TextField
              onChange={(ev) => onChange(ev)}
              label={formatString(
                key === "firstname"
                  ? "firstName"
                  : key === "lastname"
                  ? "lastName"
                  : key
              )}
              className="text__filed"
              name={key}
              value={value}
            />
          );
        } else if (type === "date") {
          inputs.push(
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(newValue) => onChangeDate(newValue, key)}
                className="text__filed"
                name={key}
                value={dayjs(value as string)}
                label={formatString(key)}
                format="DD/MM/YYYY"
                disableFuture
              />
            </LocalizationProvider>
          );
        } else if (type === "select") {
          inputs.push(
            <TextField
              onChange={(ev) => onChange(ev)}
              select
              label={formatString(
                key === "firstname"
                  ? "firstName"
                  : key === "lastname"
                  ? "lastName"
                  : key
              )}
              className="text__filed"
              name={key}
              fullWidth
              SelectProps={{
                renderValue: (value: any) => {
                  return <span>{getPermissionLabel(value)}</span>;
                },
              }}
              value={value as number}
            >
              {editUser[key].items.map((item: any) => (
                <MenuItem key={item} value={item}>
                  {getPermissionLabel(item)}
                </MenuItem>
              ))}
            </TextField>
          );
        }
      }
    });
    Object.keys(editUser.employee.value).forEach((key) => {
      if (isEmployeeProperty(key)) {
        const { value, type } = editUser.employee.value[key];
        if (type === "text") {
          employeeInputs.push(
            <TextField
              onChange={(ev) => onChange(ev, "employee")}
              label={formatString(key)}
              className="text__filed"
              name={key}
              value={value}
            />
          );
        } else if (type === "select") {
          employeeInputs.push(
            <TextField
              onChange={(ev) => onChange(ev, "employee")}
              select
              label={key}
              className="text__filed"
              name={key}
              fullWidth
              value={value}
            >
              {editUser.employee.value[key].items.map((item: any) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          );
        }
      }
    });
    return (
      <div className="flex column g30">
        <h1>Edit User</h1>
        <div className="flex column g30">{inputs.map((input) => input)}</div>
        {(editUser.permissions.value as number) > 1 && (
          <div>
            <h2>Member Section</h2>
            <TextField
              select
              label={formatString("academicTitle")}
              onChange={(ev) => onChange(ev, "member")}
              className="text__filed"
              name={"academicTitle"}
              fullWidth
              value={editUser.member.value.academicTitle.value}
            >
              {editUser.member.value.academicTitle.items.map((item: any) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </div>
        )}
        {(editUser.permissions.value as number) > 2 && (
          <div>
            <h2>Employee Section</h2>
            <div className="flex column g30">
              {employeeInputs.map((input) => input)}
            </div>
          </div>
        )}
      </div>
    );
  }, [editUser]);

  console.log("editUser", editUser);

  return (
    <div className="flex g20 column">
      <div>
        <div style={{ paddingBlock: "20px" }} className="flex g10">
          <span>All Users:</span>
          <span>{users.length}</span>
        </div>
        <Divider />
      </div>
      <div>
        <div>
          <div style={{ height: 400, width: "100%", maxWidth: "700px" }}>
            <DataGrid
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              slotProps={{
                baseCheckbox: {
                  className: "check_box",
                },
                filterPanel: {
                  filterFormProps: {
                    columnInputProps: {
                      size: "small",
                      className: "text__filed",
                    },
                    operatorInputProps: {
                      size: "small",
                      className: "text__filed",
                    },
                    valueInputProps: {
                      InputComponentProps: {
                        size: "small",
                        className: "text__filed",
                      },
                    },
                  },
                },
              }}
              slots={{
                toolbar: () => (
                  <div
                    style={{
                      alignSelf: "flex-end",
                      paddingBlock: "8px",
                      display: "flex",
                      gap: "10px",
                      color: "black",
                      width: "100%",
                      backgroundColor: "#F9FAFC",
                      justifyContent: "space-between",
                      paddingInline: "8px",
                    }}
                  >
                    <div className="flex g10">
                      <Button
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        className="button text users__table__button"
                      >
                        add User
                      </Button>
                      <Button
                        onClick={handleOpenDialog}
                        disabled={selectedUsersId.length <= 1}
                        startIcon={<DeleteIcon />}
                        className="button text users__table__button"
                      >
                        {`delete ${
                          selectedUsersId.length > 1
                            ? selectedUsersId.length
                            : ""
                        } users`}
                      </Button>
                    </div>
                    <div className="flex g10">
                      <GridToolbarFilterButton
                        slotProps={{
                          button: {
                            variant: "text",
                            style: { color: "#7d7d7d" },
                          },
                        }}
                      />
                      <GridToolbarExport
                        slotProps={{
                          button: {
                            variant: "text",
                            style: { color: "#7d7d7d" },
                          },
                        }}
                      />
                    </div>
                  </div>
                ),
              }}
              rows={data}
              columns={columns}
              pageSizeOptions={[10, 50]}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setSelectedUsersId(newRowSelectionModel as string[]);
              }}
            />
          </div>
        </div>
      </div>
      {MUIModal({ children: EditUserModal })}
      {MUIDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">{`Are you sore you want to delete this ${
              selectedUsersId.length > 1 ? "users" : "user"
            }?`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ width: "120px" }}
                className="button"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                sx={{ width: "120px" }}
                className="button error"
                onClick={async () => {
                  handleCloseDialog();
                  if (selectedUsersId.length > 1) {
                    await deleteUsers();
                  } else if (selectedUsersId.length === 1) {
                    const id = selectedUsersId[0];
                    await deleteUser(id);
                  }
                  getUsers();
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        ),
      })}
    </div>
  );
};
