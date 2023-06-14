export const formatDate = (date: Date): string => {
  const result = new Date(date);
  return `${result.getDate()}/${result.getMonth() + 1}/${result.getFullYear()}`;
};

export const formatDateSearch = (date1: Date, date2?: Date): string => {
  const checkIn = new Date(date1);
  const checkOut = new Date(date2 || date1);
  const day2 = date2 ? checkOut.getDate() : checkOut.getDate() + 1;
  return `${checkIn.getDate()}/${checkIn.getMonth() + 1} - ${day2}/${
    checkOut.getMonth() + 1
  }`;
};

export const countDays = (startDay: Date, endDay: Date): number => {
  const startMs = startDay.getTime();
  const endMs = endDay.getTime();

  const diffMs = endMs - startMs;

  return Math.floor(diffMs / 86400000);
};
