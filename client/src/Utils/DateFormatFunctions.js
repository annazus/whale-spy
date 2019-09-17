export const formatToDisplay = dateInSeconds => {
  const date = new Date(dateInSeconds);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date
    .getDate()
    .toString()
    .padStart(2, "0");
  const hours = date
    .getHours()
    .toString()
    .padStart(2, "0");
  const minutes = date
    .getMinutes()
    .toString()
    .padStart(2, "0");

  const ampm = hours > 12 ? "PM" : "AM";
  const formattedDate = `${year}-${month}-${day} ${hours %
    12}:${minutes} ${ampm}`;
  return formattedDate;
};
