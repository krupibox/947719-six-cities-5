export const getFormatDate = (utc) => {
  const date = new Date(utc);

  return `${date.toLocaleString(`default`, {month: `long`})} ${date.getFullYear()}`;
};
