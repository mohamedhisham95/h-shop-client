import dayjs from "dayjs";

export const formatDate = (date: any) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const formatDateAndTime = (date: any) => {
  return dayjs(date).format("DD-MM-YYYY hh:mm A");
};

export const formatUnixDateAndTime = (date: any) => {
  return dayjs.unix(date).format("DD-MM-YYYY hh:mm A");
};
