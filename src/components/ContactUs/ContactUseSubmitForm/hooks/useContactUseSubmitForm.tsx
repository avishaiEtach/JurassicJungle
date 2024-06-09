import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

type SubmitFormKeys = "name" | "email" | "phone" | "message";

type SubmitFormState = Record<SubmitFormKeys, string>;

export const useContactUseSubmitForm = ({
  setLoading,
}: ContactUseSubmitFormProps) => {
  const navigate = useNavigate();

  const [submitForm, setSubmitForm] = useState<SubmitFormState>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate("/contact-us?type=success");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const getIcon = (filedName: string) => {
    switch (filedName) {
      case "name":
        return <AccountCircle />;
      case "email":
        return <EmailIcon />;
      case "phone":
        return <LocalPhoneIcon />;
      default:
        return;
    }
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setSubmitForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitFormKeys = Object.keys(submitForm) as SubmitFormKeys[];

  return { submitForm, submitFormKeys, getIcon, onChange, handleSubmit };
};
