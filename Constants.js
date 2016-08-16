const BASE_URL = 'https://friendlight.herokuapp.com';
//const BASE_URL = 'http://localhost:5000';
export const REQUEST_URL = BASE_URL + '/api/friends';
export const INTERACTIONS_REQUEST_URL = BASE_URL + '/api/interactions';
export function friendIdRequestUrl(id) {
  return REQUEST_URL + "/" + id;
};

export const FRIEND_LIST_INDEX = 0;
export const FRIEND_PAGE_INDEX = 1;
export const ADD_FRIEND_INDEX = 2;


export function generatePost(params) {
  return {
    method: 'POST',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params),
  };
};
