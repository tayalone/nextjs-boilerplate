export const createCheckLogin = accessToken => {
  return `http://localhost:3000/api/users/checkLogin?access_token=${accessToken}`;
};
export const createLikePost = accessToken => {
  return `http://localhost:3000/api/users/likePost?access_token=${accessToken}`;
};
export const createSwitchAuto = accessToken => {
  return `http://localhost:3000/api/users/subscriberUser?access_token=${accessToken}`;
};
export const createFollowUser = accessToken => {
  return `http://localhost:3000/api/users/followUser?access_token=${accessToken}`;
};
