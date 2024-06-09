import { Button, InputAdornment, TextField } from "@mui/material";
import { useContactUseSubmitForm } from "./hooks/useContactUseSubmitForm";
import "./ContactUseSubmitForm.scss";

export const ContactUseSubmitForm = ({
  setLoading,
}: ContactUseSubmitFormProps) => {
  const { submitForm, submitFormKeys, getIcon, onChange, handleSubmit } =
    useContactUseSubmitForm({ setLoading });
  return (
    <>
      <h1>Contact Us</h1>
      <p>Have some questions?</p>
      <p>fell free to ask them anytime</p>
      <form className="confect__us__form" onSubmit={handleSubmit}>
        <div className="flex column g20 confect__us__form__display">
          {submitFormKeys.map((key) => (
            <TextField
              onChange={onChange}
              name={key}
              className="contact__us__text__filed"
              placeholder={key === "message" ? "Type our massage..." : key}
              multiline={key === "message"}
              value={submitForm[key]}
              maxRows={key === "message" ? 5 : undefined}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {getIcon(key)}
                  </InputAdornment>
                ),
              }}
            />
          ))}
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </>
  );
};
