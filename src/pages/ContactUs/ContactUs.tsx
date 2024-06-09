import { useSearchParams } from "react-router-dom";
import { useLoader } from "../../components/Loader/useLoader";
import { ContactUseSubmitForm } from "../../components/ContactUs/ContactUseSubmitForm/ContactUseSubmitForm";
import { GoogleMapComp } from "../../components/ContactUs/GoogleMap/GoogleMapComp";
import { AfterSubmitContactUsForm } from "../../components/ContactUs/AfterSubmitContactUsForm/AfterSubmitContactUsForm";
import "./ContactUs.scss";

export function ContactUs() {
  const [searchParams] = useSearchParams();
  const { loading, setLoading, Loader } = useLoader();

  return (
    <div className="flex contact__us__main__container">
      <GoogleMapComp />
      <div className="confect__us__form__container">
        {loading ? (
          <div className="loader__container">
            <Loader />
          </div>
        ) : searchParams.get("type") ? (
          <AfterSubmitContactUsForm />
        ) : (
          <ContactUseSubmitForm setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}
