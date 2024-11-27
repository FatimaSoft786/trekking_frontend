import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./sidebar.css";
import SidebarDropdown from "../../managementDropzone"; // Ensure the correct path
import logo from "assets/img/reactlogo.png";

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState({});

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  useEffect(() => {
    routes.forEach((route) => {
      if (route.subRoutes) {
        const isActive = route.subRoutes.some((subRoute) => {
          let path = location.pathname;

          if (path.includes('categoryAddForm') || path.includes('categoryUpdateForm')) {
            path = '/trektravel/admin/category/categoryTable';
          }
          if (path.includes('landscapeAddForm') || path.includes('landscapeUpdateForm')) {
            path = '/trektravel/admin/landscape/landscapeTable';
          }
          if (path.includes('trailingAddForm') || path.includes('trailingUpdateForm')) {
            path = '/trektravel/admin/trailing/trailingTable';
          }

          return path === (subRoute.layout + subRoute.path);
        });

        setOpenDropdown((prev) => ({
          ...prev,
          [route.name]: isActive
        }));
      }
    });
  }, [location, routes]);

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: "url(" + image + ")"
        }}
      />
      <div className="sidebar-wrapper bg_one">
        <div className="logo d-flex align-items-center justify-content-start">
          <a
            href="https://www.creative-tim.com?ref=lbd-sidebar"
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img src={require("assets/img/reactlogo.png")} alt="..." />
            </div>
          </a>
          <a className="simple-text" href="http://www.creative-tim.com">
            Trek Travel
          </a>
        </div>
        <Nav>
          {routes.map((prop, key) => {
            if (!prop.redirect) {
              if (prop.subRoutes) {
                return <SidebarDropdown route={prop} key={key} openDropdown={openDropdown[prop.name]} />;
              } else {
                return (
                  <li
                    className={
                      prop.upgrade
                        ? "active active-pro"
                        : activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
