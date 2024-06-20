import { Alert, Snackbar } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";

export const useSnackbarMui = () => {
  const [open, setOpen] = useState(false);

  const handleOpenSnackbar = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    },
    [open]
  );

  const SnackbarMUI: React.FC<{
    children: ReactElement;
  }> = ({ children }) => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        sx={{ width: "100%" }}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        {children}
      </Snackbar>
    );
  };
  return { handleOpenSnackbar, handleCloseSnackbar, SnackbarMUI };
};
