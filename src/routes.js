/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import UserTable from "views/admin/user/userTable";
import CategoryTable from "views/admin/category/categoryTable";
import TrekdataTable from "views/admin/trek/trekdataTable";
import UserAddForm from "views/admin/user/userAddForm";
import LandscapeTable from "views/admin/landscape/landscapeTable";
import TrailingTable from "views/admin/trailing/trailingTable";
import ItineraryTable from "views/admin/itinerary/itineraryTable";
import VendorTable from "views/admin/vendor/vendorTable";
import BookingTable from "views/admin/booking/bookingTable";
import NotificationTable from "views/admin/notification/notificationTable";
import AdminTable from "views/admin/adminTable/adminTable";
import AppSattingTable from "views/admin/appSatting/appsattingTable";
import ItineraryIconTable from "views/admin/itineraryIcon/itineraryIconTable";
const dashboardRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: <Dashboard />,
    layout: "/admin"
  },
 
  
  



  {
    path: "",
    name: "Admin Managment",
    icon: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/adminTable",
        name: "Admin",
        icon: "nc-icon nc-circle-09",
        component: <AdminTable />,
        layout: "/admin",
      },
      {
        path: "/user/userTable",
        name: "User",
        icon: "nc-icon nc-circle-09",
        component: <UserTable />,
        layout: "/admin",
      },
      {
        path: "/vendor/vendorTable",
        name: "Vendor",
        icon: "nc-icon nc-circle-09",
        component: <VendorTable />,
        layout: "/admin",
      },
    ],
  },

  {
    path: "#",
    name: "Trek Managment",
    icon: "",
    layout: "/admin",
    subRoutes: [
      {
        path: "/trek/trekdataTable",
        name: "Trek",
        icon: "nc-icon nc-align-left-2",
        component: <TrekdataTable />,
        layout: "/admin",
      },
      {
        path: "/category/categoryTable",
        name: "Category",
        icon: "nc-icon nc-align-left-2",
        component: <CategoryTable />,
        layout: "/admin",
      },
      {
        path: "/landscape/landscapeTable",
        name: "Landscape",
        icon: "nc-icon nc-align-left-2",
        component: <LandscapeTable />,
        layout: "/admin",
      },
      {
        path: "/trailing/trailingTable",
        name: "Trailing",
        icon: "nc-icon nc-align-left-2",
        component: <TrailingTable />,
        layout: "/admin",
      },
      {
        path: "/itineraryIcon/itineraryIconTable",
        name: "Icon",
        icon: "nc-icon nc-align-left-2",
        component: <ItineraryIconTable />,
        layout: "/admin",
      },
    ],
  },
 
  // {
  //   path: "/booking/bookingTable",
  //   name: "Booking",
  //   icon: "nc-icon nc-circle-09",
  //   component: <BookingTable />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/appSetting/appsettingTable",
  //   name: "Setting",
  //   icon: "nc-icon nc-circle-09",
  //   component: <AppSattingTable />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notification/notificationTable",
  //   name: "Notification",
  //   icon: "nc-icon nc-circle-09",
  //   component: <NotificationTable />,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "nc-icon nc-notes",
  //   component: <TableList />,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: <Typography />,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: <Icons />,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin"
  // },
 
];

export default dashboardRoutes;
