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
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "jquery-ui/themes/base/all.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

import UserTable from "views/admin/user/userTable";
import UserAddForm from "views/admin/user/userAddForm";
import UserUpdateForm from "views/admin/user/userUpdateForm";

import AdminTable from "views/admin/adminTable/adminTable";
import AdminAddForm from "views/admin/adminTable/adminAddForm";
import AdminUpdateForm from "views/admin/adminTable/adminUpdateForm";

import CategoryTable from "views/admin/category/categoryTable";
import CategoryAddForm from "views/admin/category/categoryAddForm";
import CategoryUpdateForm from "views/admin/category/categoryUpdateForm";

import LandscapeTable from "views/admin/landscape/landscapeTable";
import LandscapeAddForm from "views/admin/landscape/landscapeAddForm";
import LandscapeUpdateForm from "views/admin/landscape/landscapeUpdateForm";

import TrailingTable from "views/admin/trailing/trailingTable";
import TrailingAddForm from "views/admin/trailing/trailingAddForm";
import TrailingUpdateForm from "views/admin/trailing/trailingUpdateForm";



import TrekdataTable from "views/admin/trek/trekdataTable";
import TrekdataAddForm from "views/admin/trek/trekdataAddForm";
import TrekdataUpdateForm from "views/admin/trek/trekdataUpdateForm";

import ItineraryTable from "views/admin/itinerary/itineraryTable";
import ItineraryAddForm from "views/admin/itinerary/itineraryAddForm";
import ItineraryUpdateForm from "views/admin/itinerary/itineraryUpdateForm";

import VendorTable from "views/admin/vendor/vendorTable";
import VendorAddform from "views/admin/vendor/vendorAddform";
import VendorUpdateForm from "views/admin/vendor/vendorUpdateForm";

import BookingTable from "views/admin/booking/bookingTable";
import BookingListing from "views/admin/booking/bookingListing";

import AppSattingTable from "views/admin/appSatting/appsattingTable";
import AppSattingUpdate from "views/admin/appSatting/appsattingUpdate";

import NotificationTable from "views/admin/notification/notificationTable";
import NotificationAddForm from "views/admin/notification/notificationAddForm";

import ItineraryIconTable from "views/admin/itineraryIcon/itineraryIconTable";
import ItineraryIconAddForm from "views/admin/itineraryIcon/itineraryIconAddForm";
import ItineraryIconUpdateForm from "views/admin/itineraryIcon/itineraryIconUpdateForm";

const App = () => {
  const apiKey = "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8";

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap&solution_channel=GMP_QB_addressselection_v2_cABC`;
  //   script.async = true;
  //   script.defer = true;
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
  return (
    <BrowserRouter basename="/trektravel/">
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />

        <Route path="/user/userTable" element={<UserTable />} />
        <Route path="/user/userAddForm" element={<UserAddForm />} />
        <Route path="/user/userUpdateForm/:id" element={<UserUpdateForm />} />
       
        <Route path="/adminTable" element={<AdminTable />} />
        <Route path="/adminAddForm" element={<AdminAddForm />} />
        <Route path="/adminUpdateForm/:id" element={<AdminUpdateForm />} />

        <Route path="/trek/trekdataTable" element={<TrekdataTable />} />
        <Route path="/trek/trekdataAddForm" element={<TrekdataAddForm />} />
        <Route path="/trek/trekdataUpdateForm/:id" element={<TrekdataUpdateForm />} />

        <Route path="/vendor/vendorTable" element={<VendorTable />} />
        <Route path="/vendor/vendorAddform" element={<VendorAddform />} />
        <Route path="/vendor/vendorUpdateForm/:id" element={<VendorUpdateForm />} />

        <Route path="/category/categoryTable" element={<CategoryTable />} />
        <Route path="/category/categoryAddForm" element={<CategoryAddForm />} />
        <Route path="/category/categoryUpdateForm/:id" element={<CategoryUpdateForm />} />
        
        <Route path="/itinerary/itineraryTable" element={<ItineraryTable />} />
        <Route path="/itinerary/itineraryAddForm" element={<ItineraryAddForm />} />
        <Route path="/itinerary/itineraryUpdateForm/:id" element={<ItineraryUpdateForm />} />
  
        <Route path="/landscape/landscapeTable" element={<LandscapeTable />} />
        <Route path="/landscape/landscapeAddForm" element={<LandscapeAddForm />} />
        <Route path="/landscape/landscapeUpdateForm/:id" element={<LandscapeUpdateForm />} />
        
        <Route path="/trailing/trailingTable" element={<TrailingTable />} />
        <Route path="/trailing/trailingAddForm" element={<TrailingAddForm />} />
        <Route path="/trailing/trailingUpdateForm/:id" element={<TrailingUpdateForm />} />

        <Route path="/itineraryIcon/itineraryIconTable" element={<ItineraryIconTable />} />
        <Route path="/itineraryIcon/itineraryIconAddForm" element={<ItineraryIconAddForm />} />
        <Route path="/itineraryIcon/itineraryIconUpdateForm/:id" element={<ItineraryIconUpdateForm />} />

        <Route path="/booking/bookingTable" element={<BookingTable />} />
       <Route path="/booking/bookingListing/:id" element={<BookingListing />} />
      
        <Route path="/appSetting/appsettingTable" element={<AppSattingTable />} />
       <Route path="/appSetting/appsettingUpdate/:id" element={<AppSattingUpdate />} />
     
       <Route path="/notification/notificationTable" element={<NotificationTable />} />
          <Route path="/notification/notificationAddForm" element={<NotificationAddForm />} />

        
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
