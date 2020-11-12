// const myServer = "https://lofiteespostgres.herokuapp.com/";
export const myServer = "http://127.0.0.1:8000/";
export const allShirts = myServer + "api/allshirts";
export const createOrderNoLocationProfile =
  myServer + "api/create_order_no_location_profile";
export const singleShirt = myServer + "api/get_shirt/";
export const singleShirtByID = myServer + "api/get_shirt_by_id/";
export const loginServer = myServer + "api/login";
export const logoutServer = myServer + "api/logout";
export const myProfileServer = myServer + "api/whos_token";
export const myOrdersServer = myServer + "api/fetch_my_orders";
export const myOrderlinesServer = myServer + "api/fetch_my_orderlines";
export const findToken = sessionStorage.getItem("lofiteestoken") || false;
export const findUsername = sessionStorage.getItem("lofiteesusername") || false;
export const findLocationProfile =
  sessionStorage.getItem("lofiteeslocationprofile") || false;

  // http://127.0.0.1:8000/api/fetch_my_orders