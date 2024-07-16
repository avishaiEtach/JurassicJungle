import React, { useEffect, useMemo, useState } from "react";
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
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

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users: User[] = await userServices.getallUsers();
    setUsers(users);
  };

  console.log("users", users);

  function DeleteUserActionItem({
    deleteUser,
    ...props
  }: GridActionsCellItemProps & { deleteUser: () => void }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete this user?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setOpen(false);
                // deleteUser();
              }}
              color="warning"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      headerClassName: "super-app-theme--header",
      headerName: "ID",
      width: 70,
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
      field: "permission",
      headerClassName: "super-app-theme--header",
      headerName: "Permission",
      width: 130,
      renderCell: (params: GridRenderCellParams<any, Date>) =>
        getPermission(params.row.permission),
      resizable: false,
      disableColumnMenu: true,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <DeleteUserActionItem
          label="Delete"
          showInMenu
          icon={<DeleteIcon />}
          deleteUser={() => {}}
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
    if (user.employeeId) {
      return <Chip className=" permission__chip employee" label="employee" />;
    }
    if (user.memberId) {
      return <Chip className="permission__chip member" label="member" />;
    }

    return <Chip className="permission__chip user" label="user" />;
  };

  const data = useMemo(() => {
    return users.map((user, index) => {
      return {
        id: index + 1,
        firstName: user.firstname,
        lastName: user.lastname,
        permission: user,
      };
    });
  }, [users]);

  console.log("columns", columns);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
        <Button style={{ alignSelf: "flex-end" }} className="button square">
          add user
        </Button>
        <div style={{ marginTop: "20px" }}>
          <div style={{ height: 400, width: "100%", maxWidth: "700px" }}>
            <DataGrid
              slots={{
                toolbar: () => (
                  <div
                    style={{
                      alignSelf: "flex-end",
                      paddingBlock: "8px",
                      display: "flex",
                      gap: "10px",
                      marginRight: "5px",
                      color: "black",
                    }}
                  >
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
                ),
              }}
              rows={data}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
          {/* <TableContainer sx={{ maxHeight: 440, maxWidth: 900 }}>
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell sx={{ backgroundColor: "#F9FAFC" }} key={index}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    return (
                      <TableRow
                        key={user._id}
                        // sx={{
                        //   "&:last-child td, &:last-child th": { border: 0 },
                        // }}
                      >
                        <TableCell
                          sx={{ width: "200px" }}
                          component="td"
                          scope="row"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{user.firstname}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>{getPermission(user)}</TableCell>
                        <TableCell>
                          <IconButton>
                            <CreateIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer> */}
        </div>
      </div>
    </div>
  );
};

/* <div className="flex column g20">
      <Button style={{ alignSelf: "flex-end" }} className="button square">
        add user
      </Button>
      <Paper elevation={4} sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell align="center" key={index}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  return (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="td" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">{user.firstname}</TableCell>
                      <TableCell align="center">{user.lastname}</TableCell>
                      <TableCell align="center">
                        {getPermission(user)}
                      </TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center align-center">
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                display: "block",
                              }}
                              src={
                                user.employeeId
                                  ? user.employeeId.image
                                  : no_user_icon
                              }
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <CreateIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div> */
