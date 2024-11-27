

import Login from "views/Login.js";
import "./views/table.css"

// let data = JSON.parse(localStorage.getItem("data"));
// let userRole = data ? data.data.role : "";
 
// console.log("userRole12345============>",userRole)


var auth_routes = [
 
 
  
 
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
 
 
];

// let routes = [...allowedRoutes, ...routes1];

export default auth_routes;
