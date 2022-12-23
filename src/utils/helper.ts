export const dateFormatter = (): string =>
  new Date().toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
export const hasValue = (property: any): boolean => {
  return property !== void 0 && property !== null;
};

