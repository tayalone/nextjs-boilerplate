export const createCheckLogin = accessToken => {
  return `http://localhost:3000/api/users/checkLogin?access_token=${accessToken}`;
};
