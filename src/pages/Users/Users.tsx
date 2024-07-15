import { useEffect, useState } from "react";
import { userServices } from "../../services/user.services";
import {
  Button,
  Chip,
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

  const columns = [
    "number",
    "first name",
    "last name",
    "permission",
    "image",
    "",
    "",
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
    <div className="flex column g20">
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
    </div>
  );
};
