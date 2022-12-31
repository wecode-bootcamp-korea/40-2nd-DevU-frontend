export const BASE_URL = 'http://10.58.52.196:3000';
export const API = {
  allBooks: `${BASE_URL}/books/all`,
  mainCategory: `${BASE_URL}/books`,
  subCategory: `${BASE_URL}/subCategories`,
  detail: `${BASE_URL}/books/details`,
  kakaoAuth: 'https://kauth.kakao.com/oauth/token',
  signIn: `${BASE_URL}/users/kakao/signin`,
  myLibrary: `${BASE_URL}/bookshelf`,
  viewer: `${BASE_URL}/viewer`,
  order: `${BASE_URL}/orders`,
  reviewGet: `${BASE_URL}/review/get`,
  reviewPost: `${BASE_URL}/review/add`,
  reviewEdit: `${BASE_URL}/review`,
  reviewDelete: `${BASE_URL}/review/delete`,
  search: `${BASE_URL}/books/search?title=`,
};
