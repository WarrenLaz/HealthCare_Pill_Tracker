export const formatText = (text) => {
  if (!text) return "";
  text = text.trim();
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatInput = (name, value) => {
  if (!value) return "";

  value = value.trim();

  if (name === "Email_Address" || name === "Phone_Number") {
    return value;
  }

  return formatText(value);
};
