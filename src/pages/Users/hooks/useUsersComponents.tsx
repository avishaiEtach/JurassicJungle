import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import {
  GridActionsCellItemProps,
  GridColDef,
  GridRenderCellParams,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { useMemo } from "react";
import { formatString } from "../../../assets/util";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TbCurrencyShekel } from "react-icons/tb";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface useUsersComponentsProps {
  editUser: EditUserAdmin;
  users: User[];
  loading: boolean;
  setSelectedUsersId: React.Dispatch<React.SetStateAction<string[]>>;
  selectedUsersId: string[];
  getUsers: () => Promise<void>;
  setEditUser: React.Dispatch<React.SetStateAction<EditUserAdmin>>;
  getPermission: (user: User) => JSX.Element;
  UserActionItem: ({
    actionFunction,
    ...props
  }: GridActionsCellItemProps & {
    actionFunction: () => void;
  }) => JSX.Element;
  onChooseUser: (user: User) => void;
  deleteUser: (userId: string) => Promise<void>;
  deleteUsers: () => Promise<void>;
  getPermissionLabel: (
    permission: number
  ) => "user" | "member" | "employee" | "admin";
  onChange: (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key?: "employee" | "member"
  ) => void;
  onChangeDate: (newDate: Dayjs | null, inputName: string) => void;
  onSendUser: () => Promise<void>;
  clearEditUser: EditUserAdmin;
  isUserProperty: (key: string) => key is keyof EditUserAdmin;
  isEmployeeProperty: (key: string) => key is keyof EditEmployee;
  handleOpen: () => void;
  handleOpenDialog: () => void;
  handleCloseDialog: () => void;
}

export const useUsersComponents = ({
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
  handleOpen,
  handleOpenDialog,
  handleCloseDialog,
}: useUsersComponentsProps) => {
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
              onChange={(ev) => {
                onChange(ev);
              }}
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
        if (type === "text" || type === "number") {
          employeeInputs.push(
            <TextField
              onChange={(ev) => onChange(ev, "employee")}
              label={formatString(key)}
              className="text__filed"
              name={key}
              value={type === "number" ? +value : value}
              type={type}
              InputProps={
                key === "salary"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <TbCurrencyShekel />
                        </InputAdornment>
                      ),
                    }
                  : undefined
              }
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
        <Button className="button" onClick={onSendUser}>
          Save
        </Button>
      </div>
    );
  }, [editUser]);

  const dataGridSettings = {
    initialState: {
      pagination: {
        paginationModel: { page: 0, pageSize: 10 },
      },
    },
    slotProps: {
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
    },
    slots: {
      toolbar: () => (
        <div className="users__table__buttons__container">
          <div className="flex g10">
            <Button
              startIcon={<AddIcon />}
              onClick={() => {
                setEditUser(clearEditUser);
                handleOpen();
              }}
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
                selectedUsersId.length > 1 ? selectedUsersId.length : ""
              } users`}
            </Button>
          </div>
          <div className="flex g10 users__table__filter__button__container">
            <GridToolbarFilterButton
              slotProps={{
                button: {
                  variant: "text",
                  className: "users__table__filter__button",
                },
              }}
            />
            <GridToolbarExport
              slotProps={{
                button: {
                  variant: "text",
                  className: "users__table__filter__button",
                },
              }}
            />
          </div>
        </div>
      ),
    },
  };

  const RemoveDialog = () => {
    return (
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
            className="button users__dialog__button"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
          <Button
            className="button error users__dialog__button"
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
    );
  };

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
            onChooseUser(params.row.user);
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

  const data = useMemo(() => {
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

  return { dataGridSettings, data, columns, EditUserModal, RemoveDialog };
};
