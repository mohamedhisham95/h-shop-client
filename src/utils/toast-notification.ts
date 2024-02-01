import toast from "react-hot-toast";

export function toastNotification(
  type = "success",
  message = "",
  duration = 3000
) {
  let options: any = {
    duration: duration,
    position: "top-right",
  };

  if (type === "success") {
    return toast.success(message, options);
  }

  if (type === "error") {
    return toast.error(message, options);
  }
}
