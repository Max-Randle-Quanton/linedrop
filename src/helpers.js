export const getStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  if (storedToken === null) {
    return "no token";
  }
  return storedToken;
};

export const setStoredToken = (token) => localStorage.setItem("token", token);
