import toast from "react-hot-toast";

// export const toastNotification = (
//   type: string,
//   message: any,
//   duration?: number
// ) => {
//   let options: any = {
//     duration: duration,
//     position: "top-right",
//   };

//   if (type === "success") {
//     return toast.success(message, options);
//   }

//   if (type === "error") {
//     return toast.error(message, options);
//   }
// };

export async function toastNotification(
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
