import {
  Alert,
  AlertColor,
  AlertPropsVariantOverrides,
  AlertTitle,
} from "@mui/material";
import { SyntheticEvent, forwardRef } from "react";

interface AlertMuiProps {
  alertText: string;
  severity?: AlertColor;
  alertTitle?: string;
  icon?: React.ReactNode;
  onClose?: (event: SyntheticEvent<Element, Event>) => void;
  variant?: "standard" | "filled" | "outlined";
}

export const AlertMui = forwardRef<HTMLDivElement, AlertMuiProps>(
  (
    {
      alertText,
      severity = "success",
      alertTitle,
      icon,
      onClose,
      variant = "standard",
    },
    ref
  ) => {
    return (
      <Alert
        ref={ref}
        variant={variant}
        severity={severity}
        icon={icon}
        onClose={onClose}
      >
        {alertTitle && (
          <AlertTitle sx={{ fontWeight: "700" }}>{alertTitle}</AlertTitle>
        )}
        {alertText}
      </Alert>
    );
  }
);
