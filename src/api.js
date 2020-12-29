import axios from 'axios';
const ls=require("local-storage")
var accessToken=ls("accessToken")
export default axios.create({
  //baseURL: `http://localhost:3000/`,
  baseURL: `https://blooming-retreat-98193.herokuapp.com/`,
  timeout:3000,
  headers:{ 'Authorization': 'Bearer '+accessToken}
});