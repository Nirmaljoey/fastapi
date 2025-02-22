export const isAuthenticated = (): boolean => {
  return !!document.cookie.includes("accessToken");
};