export const na = "No Information available.";

export const renderValue = (value: any) => {
  if (value === null || value === undefined || value === "") {
    return na;
  } else return value;
};
