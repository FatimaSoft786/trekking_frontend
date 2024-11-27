import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../src/components/Sidebar/sidebar.css"
const SidebarDropdown = ({ route, activeRoute }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isActive = route.subRoutes.some(subRoute => {
      let path = location.pathname;

      // Update path to specific table if it matches certain forms
      if (path.includes('userAddForm') || path.includes('userUpdateForm')) {
        path = '/trektravel/admin/user/userTable';
      }
      if (path.includes('adminAddForm') || path.includes('adminUpdateForm')) {
        path = '/trektravel/admin/adminTable';
      }
      if (path.includes('vendorAddform') || path.includes('vendorUpdateForm')) {
        path = '/trektravel/admin/vendor/vendorTable';
      }
      if (path.includes('trekdataAddForm') || path.includes('trekdataUpdateForm')) {
        path = '/trektravel/admin/trek/trekdataTable';
      }
      if (path.includes('categoryAddForm') || path.includes('categoryUpdateForm')) {
        path = '/trektravel/admin/category/categoryTable';
      }
      if (path.includes('landscapeAddForm') || path.includes('landscapeUpdateForm')) {
        path = '/trektravel/admin/landscape/landscapeTable';
      }
      if (path.includes('trailingAddForm') || path.includes('trailingUpdateForm')) {
        path = '/trektravel/admin/trailing/trailingTable';
      }
      if (path.includes('itineraryIconAddForm') || path.includes('itineraryIconUpdateForm')) {
        path = '/trektravel/admin/itineraryIcon/itineraryIconTable';
      }

      return path.includes(subRoute.path);
    });
    setOpen(isActive);
  }, [location, route.subRoutes]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div>
      <button className="nav-link" onClick={toggleDropdown} style={{ cursor: "pointer", background: "none", border: "none", padding: 0 }}>
        <i className={route.icon} />
        <h6 className="manTop">{route.name} <span className="dropdown-arrow">{open ? "▲" : "▼"}</span></h6>
      </button>
      {open && route.subRoutes && route.subRoutes.length > 0 && (
        <Nav className="ml-3">
          {route.subRoutes.map((subRoute, key) => (
            <li
              className={`nav-item ${location.pathname.includes(subRoute.path) ? 'active' : ''}`}
              key={key}
            >
              <NavLink
                to={subRoute.layout + subRoute.path}
                className="nav-link"
                activeClassName="active"
              >
                <i className={subRoute.icon} />
                <p>{subRoute.name}</p>
              </NavLink>
            </li>
          ))}
        </Nav>
      )}
    </div>
  );
};

export default SidebarDropdown;


// import React from "react";
// import { useLocation, NavLink } from "react-router-dom";
// import { Nav } from "react-bootstrap";
// import "./sidebar.css";
// import SidebarDropdown from "../../managementDropzone"; // Ensure the correct path
// import logo from "assets/img/reactlogo.png";

// function Sidebar({ color, image, routes }) {
//   const location = useLocation();
//   const activeRoute = (routeName) => {
//     return location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   };

//   return (
//     <div className="sidebar" data-image={image} data-color={color}>
//       <div
//         className="sidebar-background"
//         style={{
//           backgroundImage: "url(" + image + ")"
//         }}
//       />
//       <div className="sidebar-wrapper bg_one">
//         <div className="logo d-flex align-items-center justify-content-start">
//           <a
//             href="https://www.creative-tim.com?ref=lbd-sidebar"
//             className="simple-text logo-mini mx-1"
//           >
//             <div className="logo-img">
//               <img src={require("assets/img/reactlogo.png")} alt="..." />
//             </div>
//           </a>
//           <a className="simple-text" href="http://www.creative-tim.com">
//             Trek Travel
//           </a>
//         </div>
//         <Nav>
//           {routes.map((prop, key) => {
//             if (!prop.redirect) {
//               if (prop.subRoutes) {
//                 return <SidebarDropdown route={prop} key={key} activeRoute={activeRoute} />;
//               } else {
//                 return (
//                   <li
//                     className={
//                       prop.upgrade
//                         ? "active active-pro"
//                         : activeRoute(prop.layout + prop.path)
//                     }
//                     key={key}
//                   >
//                     <NavLink
//                       to={prop.layout + prop.path}
//                       className="nav-link"
//                       activeClassName="active"
//                     >
//                       <i className={prop.icon} />
//                       <p>{prop.name}</p>
//                     </NavLink>
//                   </li>
//                 );
//               }
//             }
//             return null;
//           })}
//         </Nav>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;






// import React, { Component } from "react";
// import { useLocation, Route,Routes,Navigate, Switch } from "react-router-dom";

// import AdminNavbar from "components/Navbars/AdminNavbar";
// import Footer from "components/Footer/Footer";
// import Sidebar from "components/Sidebar/Sidebar";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

// import routes from "routes.js";

// import sidebarImage from "assets/img/sidebar-3.jpg";

// function Admin(props) {
//   const [image, setImage] = React.useState(sidebarImage);
//   const [color, setColor] = React.useState("black");
//   const [hasImage, setHasImage] = React.useState(true);
//   const location = useLocation();
//   const mainPanel = React.useRef(null);
//   const getRoutes = (routes) => {
//     return routes.map((prop, key) => {
//       console.log(`Checking route: ${prop.path}`);
//       if (prop.layout === "/admin") {
//         if (prop.subRoutes) {
//           console.log(`SubRoutes for ${prop.path}:`, prop.subRoutes);
//           return prop.subRoutes.map((subRoute, subKey) => (
//             <Route path={subRoute.path} element={subRoute.component} key={subKey} />
//           ));
//         } else {
//           return (
//             <Route path={prop.path} element={prop.component} key={key} />
//           );
//         }
//       } else {
//         return null;
//       }
//     });
//   };
//   React.useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//     mainPanel.current.scrollTop = 0;
//     if (
//       window.innerWidth < 993 &&
//       document.documentElement.className.indexOf("nav-open") !== -1
//     ) {
//       document.documentElement.classList.toggle("nav-open");
//       var element = document.getElementById("bodyClick");
//       element.parentNode.removeChild(element);
//     }
//   }, [location]);
//   const getBrandText = (path) => {
//     for (let i = 0; i < routes.length; i++) {
//       if (
//         props?.location?.pathname.indexOf(routes[i].layout + routes[i].path) !==
//         -1
//       ) {
//         return routes[i].name;
//       }
//     }
//     return "Brand";
//   };
//   return (
//     <>

//         <Sidebar {...props} color={color} image={hasImage ? image : ""} routes={routes} />
//         <div className="main-panel" ref={mainPanel}>
//         <AdminNavbar
//           {...props}
//           brandText={getBrandText(props?.location?.pathname)}
//         />
//           <div className="content">
//           <Routes>
//           {getRoutes(routes)}
//           <Route path="#" element={<Navigate to="/admin/dashboard" replace />} />
//         </Routes>
//           </div>
//           {/* <Footer /> */}
//         </div>
  
//       {/* <FixedPlugin
//         hasImage={hasImage}
//         setHasImage={() => setHasImage(!hasImage)}
//         color={color}
//         setColor={(color) => setColor(color)}
//         image={image}
//         setImage={(image) => setImage(image)}
//       /> */}
//     </>
//   );
// }

// export default Admin;






// {
//     path: "#",
//     name: "Dropdown",
//     icon: "",
//     layout: "/admin",
//     subRoutes: [
//       {
//         path: "/category/categoryTable",
//         name: "Category",
//         icon: "nc-icon nc-align-left-2",
//         component: <CategoryTable />,
//         layout: "/admin",
//       },
//       {
//         path: "/landscape/landscapeTable",
//         name: "Landscape",
//         icon: "nc-icon nc-align-left-2",
//         component: <LandscapeTable />,
//         layout: "/admin",
//       },
//       {
//         path: "/trailing/trailingTable",
//         name: "Trailing",
//         icon: "nc-icon nc-align-left-2",
//         component: <TrailingTable />,
//         layout: "/admin",
//       },
//     ],
//   },