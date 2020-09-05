// const myServer = "https://lofiteespostgres.herokuapp.com/";
export const myServer = "http://127.0.0.1:8000/";
export const allShirts = myServer + "api/allshirts";
export const createOrder = myServer + "api/create_order";
export const singleShirt = myServer + "api/get_shirt/";
export const loginServer = myServer + "api/login";
export const logoutServer = myServer + "api/logout";
export const findToken = sessionStorage.getItem("lofiteestoken") || false;
export const findToken = sessionStorage.getItem("lofiteesusername") || false;
export const findToken =
  sessionStorage.getItem("lofiteeslocationprofile") || false;
