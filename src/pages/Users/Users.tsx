import { Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useModal } from "../../components/Modal/useModal";
import { useDialog } from "../../components/Dialog/useDialog";
import { useSnackbarMui } from "../../components/Snackbar/useSnackbarMui";
import { AlertMui } from "../../components/Alert/AlertMui";
import { useUsersFunctions } from "./hooks/useUsersFunctions";
import { useUsersComponents } from "./hooks/useUsersComponents";
import "./Users.scss";

export const Users = () => {
  const { MUIModal, handleOpen } = useModal();
  const { handleCloseDialog, handleOpenDialog, MUIDialog } = useDialog();
  const { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI } =
    useSnackbarMui();

  const params = useUsersFunctions({ handleOpenSnackbar });
  const { dataGridSettings, data, columns, EditUserModal, RemoveDialog } =
    useUsersComponents({
      ...params,
      handleOpen,
      handleOpenDialog,
      handleCloseDialog,
    });

  return (
    <div className="flex g20 column">
      <div>
        <div className="flex g10 users__main__header">
          <span>All Users:</span>
          <span>{params.users.length}</span>
        </div>
        <Divider />
      </div>
      <div>
        <div>
          <div className="users__table__container">
            <DataGrid
              loading={params.loading}
              {...dataGridSettings}
              rows={data}
              columns={columns}
              pageSizeOptions={[10, 50]}
              checkboxSelection
              onRowSelectionModelChange={(newRowSelectionModel) => {
                params.setSelectedUsersId(newRowSelectionModel as string[]);
              }}
            />
          </div>
        </div>
      </div>
      {MUIModal({ children: EditUserModal })}
      {MUIDialog({
        children: <RemoveDialog />,
      })}
      {SnackbarMUI({
        children: (
          <AlertMui
            alertText={`The user has been ${
              params.chooseUser ? "saved" : "created"
            } !`}
            severity="success"
            variant="filled"
          />
        ),
      })}
    </div>
  );
};
