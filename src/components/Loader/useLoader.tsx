import { useState } from "react";
import icon from "../../assets/images/logoGif.gif";

export const useLoader = () => {
  const [loading, setLoading] = useState(false);

  const Loader = () => {
    return (
      <div>
        <img src={icon} alt="loader" />
      </div>
    );
  };
  return { loading, setLoading, Loader };
};
