import toast from "react-hot-toast";

export const toastNotification = (type: string, message: any) => {
  let options: any = {
    duration: 5000,
    position: "top-right",
  };

  if (type === "success") {
    return toast.success(message, options);
  }

  if (type === "error") {
    return toast.error(message, options);
  }
};
