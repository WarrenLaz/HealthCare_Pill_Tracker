// utils/formatInput.js
export const formatText = (text) => {
  if (!text) return "";
  text = text.trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatInput = (name, value) => {
  return name === "Email_Address" || name === "Phone_Number"
    ? value.trim()
    : formatText(value);
};
