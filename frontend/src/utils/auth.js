export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    return payload.exp > now;
  } catch (e) {
    return false;
  }
};
