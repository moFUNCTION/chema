import { useState } from "react";

export const useAlert = () => {
  const [alert, setAlertDetails] = useState({
    type: "",
    show: false,
    title: "",
  });
  const [errorKey, SetErrorKey] = useState("");
  const ShowAlert = ({ type, title, time, errorKey }) => {
    setAlertDetails({
      type: type,
      show: true,
      title: title,
    });
    SetErrorKey(errorKey);
    setTimeout(() => {
      setAlertDetails((prev) => {
        return { ...prev, show: false };
      });
      SetErrorKey("");
    }, time || 3000);
  };
  return [alert, ShowAlert, errorKey];
};
