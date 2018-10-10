export const createProfileLink = fb_accessToken => {
  return `https://graph.facebook.com/v3.1/me?access_token=${fb_accessToken}&debug=all&fields=picture,id,name,about,address,age_range,birthday,email,first_name,hometown,gender,languages,last_name,friends,middle_name,name_format,short_name,relationship_status&format=json&pretty=0&suppress_http_code=1`;
};
export const createFeedLink = fb_accessToken => {
  return `https://graph.facebook.com/v3.0/me/feed?fields=picture,object_id,from,id,type,link,message,place,privacy,created_time,reactions.summary(total_count).limit(0)&limit=${10}method=get&access_token=${fb_accessToken}`;
};
export const createPostSumary = (id, fb_accessToken) => {
  return ` https://graph.facebook.com/v3.1/${id}/reactions?access_token=${fb_accessToken}&summary=total_count`;
};
