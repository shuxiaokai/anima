export const isAddedData = (data: any, title: string) => {
  let res = true;
  data.data.forEach((d: any) => {
    if (d.title === title) {
      res = false;
    }
  });
  return res;
};
