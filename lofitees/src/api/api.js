// const myServer = "https://myboopostgres.herokuapp.com/";
export const myServer = "http://127.0.0.1:8000/";
export const allShirts = myServer + "api/allshirts";
export const createOrder = myServer + "api/createorder";
export const individualShirt = myServer + "individual_shirt";
export const loginServer = myServer + "api/login";
export const findToken = sessionStorage.getItem("lofiteestoken") || false;
