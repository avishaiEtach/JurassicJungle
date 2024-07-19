import { Dialog, DialogTitle } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";

export const useDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setOpen(true);
  }, [open]);
  const handleCloseDialog = useCallback(() => {
    setOpen(false);
  }, [open]);

  const MUIDialog: React.FC<{
    children: ReactElement;
  }> = ({ children }) => {
    return (
      <>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            className: "dialog__mui__paper",
          }}
        >
          {children}
        </Dialog>
      </>
    );
  };
  return { handleCloseDialog, handleOpenDialog, MUIDialog };
};
