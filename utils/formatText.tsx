export const formatText = (data: string, value = 10) => {
  if (data?.length > value) {
    return data.slice(0, value) + "...";
  } else {
    return data;
  }
};
