import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import "jquery-ui/ui/widgets/tabs";
import { Form, Table } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Admin from "layouts/Admin.js";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const VendorAddform = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [org_name, setorg_name] = useState("");
  const [Gstin, setGstin] = useState("");
  const [mobile_number, setmobile_number] = useState("");
  const [vender_email, setvender_email] = useState("");
  const [date_of_start, setdate_of_start] = useState("");
  const [registered, setregistered] = useState("");
  const [websiteAddress, setwebsiteAddress] = useState("");
  const [address, setaddress] = useState("");
  const [vendor_city, setcity] = useState("");
  const [city, setCityId] = useState([]);
  const [city1, setCityId1] = useState([]);
  const [city2, setCityId2] = useState([]);
  const [state_id, setStateId] = useState([]);
  const [state_id1, setStateId1] = useState([]);
  const [state_id2, setStateId2] = useState([]);
  const [state, setstate] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [vendor_img_url, setVendor_img_url] = useState("");


  const [status, setstatus] = useState("");
  const [web_lat, setweb_late] = useState(null);
  const [web_long, setweb_long] = useState(null);
  const [add_lat, setadd_lat] = useState(null);
  const [add_long, setadd_long] = useState(null);
  const [vendor_img, setvendor_img] = useState("");

  // Owner 
  const [owner_name, setowner_name] = useState("");
  const [owner_aadhar, setowner_aadhar] = useState("");
  const [owner_mobile, setowner_mobile] = useState("");
  const [owner_email, setowner_email] = useState("");
  const [owner_address, setowner_address] = useState("");
  const [owner_add_lat, setowner_add_lat] = useState(null);
  const [owner_add_long, setowner_add_long] = useState(null);
  const [owner_city, setowner_city] = useState("");
  const [owner_state, setowner_state] = useState("");
  const [owner_img, setowner_img] = useState("");
  const [owner_profile_img, setOwnerProfile_img] = useState("");
  var [check_img, setCheck_img] = useState(0);
  const [owner_img_url, setOwner_img_url] = useState("");

  // const [state_id, setStateId] = useState([]);

  // Contact
  const [contact_name, setcontact_name] = useState("");
  const [contact_aadhar, setcontact_aadhar] = useState("");
  const [contact_mobile, setcontact_mobile] = useState("");
  const [contact_email, setcontact_email] = useState("");
  const [contact_address, setcontact_address] = useState("");
  const [contact_add_lat, setcontact_add_lat] = useState(null);
  const [contact_add_long, setcontact_add_long] = useState(null);
  const [contact_city, setcontact_city] = useState("");
  const [contact_state, setcontact_state] = useState("");
  const [contact_img, setcontact_img] = useState("");
  const [contact_profile_img, setcontactProfile_img] = useState("");
  const [Contact_img_url, setContact_img_url] = useState("");
  // Payment
  const [name_as_per_bank, setname_as_per_bank] = useState("");
  const [bank_name, setbank_name] = useState("");
  const [bank_account_no, setbank_account_no] = useState("");
  const [Ifsc_code, setIfsc_code] = useState("");
  const [upi_Id, setupi_Id] = useState("");
  const [account_type, setaccount_type] = useState("");
  const [proffered_method, setproffered_method] = useState("");
  const [paymentstatus, setPaymentStatus] = useState("");
  const [users, setUsers] = useState([]);

  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(null);
  let Intoken = JSON.parse(localStorage.getItem('data'));

  useEffect(() => {
    refreshToken();
    getPaymentList();
  }, []);

  const refreshToken = async () => {
    if (Intoken) {
      setToken(Intoken.accessToken);
    }
  };

  // / state get -------------------------->
  useEffect(() => {
    const getState = async () => {
      const StateData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/State/allState`,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken}`,
          },
        }
      );
      const getres = await StateData.data.allstate;
      // console.log("State data", getres);
      if (getres) {
        setStateId(getres);
        setStateId1(getres);
        setStateId2(getres);
      }
    };
    getState();
  }, []);

  // vendor city ---------------------------

 // const newSelacted = state;
  useEffect(() => {
  
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/State/AllCitys`,
          {
            headers: {
              Authorization: `Bearer ${Intoken.accessToken}`,
            },
          }
        )
        .then((response) => {
          setCityId(response.data.data);

        });
    

  }, []);

  // Owner City -------------------------------

 // const newSelacted1 = owner_state;
  useEffect(() => {
  
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/State/AllCitys`,
          {
            headers: {
              Authorization: `Bearer ${Intoken.accessToken}`,
            },
          }
        )
        .then((response) => {

          setCityId1(response.data.data);

        });
    

  }, []);

  //Contact city -----------------------------

 // const newSelacted2 = contact_state;
  useEffect(() => {

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/State/AllCitys`,
          {
            headers: {
              Authorization: `Bearer ${Intoken.accessToken}`,
            },
          }
        )
        .then((response) => {

          setCityId2(response.data.data);
        });
    

  }, []);



  const [google_key, setGoogle_key] = useState("");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/Satting/getAllSatting`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Intoken.accessToken}`,
  //         },
  //       }
  //     );

  //     setGoogle_key(response.data.getAllData.google_key);
  //     // console.log("response.data.getAllData.google_key",response.data.getAllData.google_key)

  //   };
  //   getUsers();
  // }, []);
  const apiKey = "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8";
  console.log("apiKey", apiKey)

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&callback=initMap`;
    script.async = true;
    // script.defer = true;
    // document.body.appendChild(script);

    return () => {

      // document.body.removeChild(script);
    };
  }, []);

  // vendor Address  field --------------------------

  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your address",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'address',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ];

    function getFormInputElement(componentType) {
      return document.getElementById(`${componentType}-input`);
    }

    function fillInAddress(place) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        marker.position = place.geometry.location;
      } else {
        marker.position = null;
      }
    }
    const initMap = () => {
      if (window.google && window.google.maps) {
        const { Map } = window.google.maps;
        const { AdvancedMarkerElement } = window.google.maps.marker;
        const { Autocomplete } = window.google.maps.places;

        const mapOptions = CONFIGURATION.mapOptions;
        mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
        mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

        const map = new Map(document.getElementById('gmp-map'), mapOptions);
        const marker = new AdvancedMarkerElement();
        const autocomplete = new Autocomplete(getFormInputElement('address'), {
          fields: ['address_components', 'geometry', 'name'],
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }
          renderAddress(place, map, marker);
          fillInAddress(place);

          getLatLng(place)
            .then((latLng) => {
              // console.log("Latitude:", latLng.lat);
              // console.log("Longitude:", latLng.lng);
              setadd_lat(latLng.lat);
              setadd_long(latLng.lng);
            })
            .catch((error) => {
              console.error("Error getting latitude and longitude:", error);
            });
          setMapVisible(true);
        });
      } else {
        console.error("Google Maps API not loaded.");
      }
    };

    initMap(); // Call the map initialization when the component mounts

    return () => {
      // Remove the map and any event listeners here
      const mapContainer = document.getElementById('gmp-map');
      //mapContainer.innerHTML = ' '; // Clear the map container
    };
  }, []);

  const handleSelect1 = (selectedAddress) => {
    // Handle the address selection
    geocodeByAddress(selectedAddress)
      .then((results) => {
        const place = results[0];
        setaddress(selectedAddress);
        setadd_lat(place.geometry.location.lat());
        setadd_long(place.geometry.location.lng());
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          address: false,
        }));
      })

      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange1 = (newAddress) => {
    setaddress(newAddress);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      address: !address,
    }));
  };



  // Owner Address  field --------------------------

  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your owner_address",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'owner_address',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ];

    function getFormInputElement(componentType) {
      return document.getElementById(`${componentType}-input`);
    }

    function fillInAddress(place) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'owner_address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'owner_address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        marker.position = place.geometry.location;
      } else {
        marker.position = null;
      }
    }
    const initMap = () => {
      if (window.google && window.google.maps) {
        const { Map } = window.google.maps;
        const { AdvancedMarkerElement } = window.google.maps.marker;
        const { Autocomplete } = window.google.maps.places;

        const mapOptions = CONFIGURATION.mapOptions;
        mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
        mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

        const map = new Map(document.getElementById('gmp-map'), mapOptions);
        const marker = new AdvancedMarkerElement();
        const autocomplete = new Autocomplete(getFormInputElement('start_address'), {
          fields: ['address_components', 'geometry', 'name'],
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }
          renderAddress(place, map, marker);
          fillInAddress(place);

          getLatLng(place)
            .then((latLng) => {
              // console.log("Latitude:", latLng.lat);
              // console.log("Longitude:", latLng.lng);
              setowner_add_lat(latLng.lat);
              setowner_add_long(latLng.lng);
            })
            .catch((error) => {
              console.error("Error getting latitude and longitude:", error);
            });
          setMapVisible(true);
        });
      } else {
        console.error("Google Maps API not loaded.");
      }
    };

    initMap(); // Call the map initialization when the component mounts

    return () => {
      // Remove the map and any event listeners here
      const mapContainer = document.getElementById('gmp-map');
      //mapContainer.innerHTML = ' '; // Clear the map container
    };
  }, []);

  const handleSelect = (selectedAddress) => {
    geocodeByAddress(selectedAddress)
      .then((results) => {
        const place = results[0];
        setowner_address(selectedAddress);
        setowner_add_lat(place.geometry.location.lat());
        setowner_add_long(place.geometry.location.lng());
        // Set validation error for address to false
        setOwnerErrors((prevErrors) => ({
          ...prevErrors,
          owner_address: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange = (newAddress) => {
    setowner_address(newAddress);
    // Set validation error for address to true if the input is empty
    setOwnerErrors((prevErrors) => ({
      ...prevErrors,
      owner_address: !newAddress,
    }));
  };





  // contact Address  field --------------------------

  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your contact_address",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'contact_address',
      'locality',
      'administrative_area_level_1',
      'postal_code',
      'country',
    ];

    function getFormInputElement(componentType) {
      return document.getElementById(`${componentType}-input`);
    }

    function fillInAddress(place) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'contact_address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      function getComponentName(componentType) {
        for (const component of place.address_components || []) {
          if (component.types[0] === componentType) {
            return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
              component.short_name :
              component.long_name;
          }
        }
        return '';
      }

      function getComponentText(componentType) {
        return (componentType === 'contact_address') ?
          `${getComponentName('street_number')} ${getComponentName('route')}` :
          getComponentName(componentType);
      }

      for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
        getFormInputElement(componentType).value = getComponentText(componentType);
      }
    }

    function renderAddress(place, map, marker) {
      if (place.geometry && place.geometry.location) {
        map.setCenter(place.geometry.location);
        marker.position = place.geometry.location;
      } else {
        marker.position = null;
      }
    }
    const initMap = () => {
      if (window.google && window.google.maps) {
        const { Map } = window.google.maps;
        const { AdvancedMarkerElement } = window.google.maps.marker;
        const { Autocomplete } = window.google.maps.places;

        const mapOptions = CONFIGURATION.mapOptions;
        mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
        mapOptions.center = mapOptions.center || { lat: 37.4221, lng: -122.0841 };

        const map = new Map(document.getElementById('gmp-map'), mapOptions);
        const marker = new AdvancedMarkerElement();
        const autocomplete = new Autocomplete(getFormInputElement('start_address'), {
          fields: ['address_components', 'geometry', 'name'],
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(`No details available for input: '${place.name}'`);
            return;
          }
          renderAddress(place, map, marker);
          fillInAddress(place);

          getLatLng(place)
            .then((latLng) => {
              // console.log("Latitude:", latLng.lat);
              // console.log("Longitude:", latLng.lng);
              setcontact_add_lat(latLng.lat);
              setcontact_add_long(latLng.lng);
            })
            .catch((error) => {
              console.error("Error getting latitude and longitude:", error);
            });
          setMapVisible(true);
        });
      } else {
        console.error("Google Maps API not loaded.");
      }
    };

    initMap(); // Call the map initialization when the component mounts

    return () => {
      // Remove the map and any event listeners here
      const mapContainer = document.getElementById('gmp-map');
      //mapContainer.innerHTML = ' '; // Clear the map container
    };
  }, []);

  const handleSelect2 = (selectedAddress) => {
    // Handle the address selection
    geocodeByAddress(selectedAddress)
      .then((results) => {
        const place = results[0];
        setcontact_address(selectedAddress);
        setcontact_add_lat(place.geometry.location.lat());
        setcontact_add_long(place.geometry.location.lng());
        setContactErrors((prevErrors) => ({
          ...prevErrors,
          contact_address: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange2 = (newAddress) => {
    setcontact_address(newAddress);
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      contact_address: !contact_address,
    }));
  };

  const VendorAddData = async () => {
    const fromData = new FormData();
    fromData.append("org_name", org_name);
    fromData.append("Gstin", Gstin);
    fromData.append("mobile_number", mobile_number);
    fromData.append("vender_email", vender_email);
    fromData.append("date_of_start", date_of_start);
    fromData.append("registered", registered);
    fromData.append("websiteAddress", websiteAddress);
    fromData.append("address", address);
    fromData.append("add_lat", add_lat);
    fromData.append("add_long", add_long);
    fromData.append("city", vendor_city);
    fromData.append("state", state);
    fromData.append("status", status);
    fromData.append("vendor_img", vendor_img);

    const Vendordata = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Vendor/addVendor`, fromData,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
    if (Vendordata) {
      const vendorId = Vendordata.data.response._id;
      localStorage.setItem('vendorId', vendorId);
      console.log('vendorId', vendorId)
      navigate(`/vendor/vendorUpdateForm/${vendorId}`);
        }
    
    // OwnerAddData();
    // ContactAddData();
    // PaymentAddData();
  }
  const OwnerAddData = async () => {
    const fromData1 = new FormData();
    fromData1.append("owner_name", owner_name);
    fromData1.append("owner_aadhar", owner_aadhar);
    fromData1.append("owner_mobile", owner_mobile);
    fromData1.append("owner_email", owner_email);
    fromData1.append("owner_address", owner_address);
    fromData1.append("owner_add_lat", owner_add_lat);
    fromData1.append("owner_add_long", owner_add_long);
    fromData1.append("owner_city", owner_city);
    fromData1.append("owner_state", owner_state);
    fromData1.append("owner_img", owner_img);

    const Ownerdata = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Owner/addOwner`, fromData1,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const ContactAddData = async () => {
    const fromData2 = new FormData();
    fromData2.append("contact_name", contact_name);
    fromData2.append("contact_aadhar", contact_aadhar);
    fromData2.append("contact_mobile", contact_mobile);
    fromData2.append("contact_email", contact_email);
    fromData2.append("contact_address", contact_address);
    fromData2.append("contact_add_lat", contact_add_lat);
    fromData2.append("contact_add_long", contact_add_long);
    fromData2.append("contact_city", contact_city);
    fromData2.append("contact_state", contact_state);
    fromData2.append("contact_img", contact_img);

    const Contactdata = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Contact/addContact`, fromData2,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const PaymentAddData = async () => {
    const Paymentdata = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Payment/addPayment`,
      {
        name_as_per_bank: name_as_per_bank,
        bank_name: bank_name,
        bank_account_no: bank_account_no,
        Ifsc_code: Ifsc_code,
        upi_Id: upi_Id,
        account_type: account_type,
        paymentstatus: paymentstatus,
        proffered_method: proffered_method,

      },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const UpdateVendorDataChange = async () => {
    let vendor_iddata = JSON.parse(localStorage.getItem('vendorId'));


    // Vendor apis ------------------------   

    const fromData = new FormData();
    fromData.append("org_name", org_name);
    fromData.append("Gstin", Gstin);
    fromData.append("mobile_number", mobile_number);
    fromData.append("vender_email", vender_email);
    fromData.append("date_of_start", date_of_start);
    fromData.append("registered", registered);
    fromData.append("websiteAddress", websiteAddress);
    fromData.append("address", address);
    fromData.append("add_lat", add_lat);
    fromData.append("add_long", add_long);
    fromData.append("city", vendor_city);
    fromData.append("state", state);
    fromData.append("status", status);

    const VendorData = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Vendor/updateVendor/${vendor_iddata}`,
      fromData,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      }
    );
    navigate("/admin/vendor/vendorTable");

  }

  const OwnerUpdatedata = async () => {
    let vendor_iddata = JSON.parse(localStorage.getItem('vendorId'));
    if (owner_img != owner_profile_img) {
      check_img = 1;
    }
    const fromData1 = new FormData();
    fromData1.append("owner_name", owner_name);
    fromData1.append("owner_aadhar", owner_aadhar);
    fromData1.append("owner_mobile", owner_mobile);
    fromData1.append("owner_email", owner_email);
    fromData1.append("owner_address", owner_address);
    fromData1.append("owner_add_lat", owner_add_lat);
    fromData1.append("owner_add_long", owner_add_long);
    fromData1.append("owner_city", owner_city);
    fromData1.append("owner_state", owner_state);
    fromData1.append("owner_img", owner_img);
    fromData1.append("check_img", check_img);

    const OwnerData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Owner/updateOwner/${vendor_iddata}`, fromData1,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const ContactUpdatedata = async () => {
    let vendor_iddata = JSON.parse(localStorage.getItem('vendorId'));
    if (contact_img != contact_profile_img) {
      check_img = 1;
    }
    const fromData2 = new FormData();
    fromData2.append("contact_name", contact_name);
    fromData2.append("contact_aadhar", contact_aadhar);
    fromData2.append("contact_mobile", contact_mobile);
    fromData2.append("contact_email", contact_email);
    fromData2.append("contact_address", contact_address);
    fromData2.append("contact_add_lat", contact_add_lat);
    fromData2.append("contact_add_long", contact_add_long);
    fromData2.append("contact_city", contact_city);
    fromData2.append("contact_state", contact_state);
    fromData2.append("contact_img", contact_img);
    fromData2.append("check_img", check_img);

    const ContactUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Contact/updateContact/${vendor_iddata}`, fromData2,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const PaymentUpdatedata = async () => {
    let vendor_iddata = JSON.parse(localStorage.getItem('vendorId'));

    const PaymentUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Payment/updatePayment/${vendor_iddata}`, {
      name_as_per_bank: name_as_per_bank,
      bank_name: bank_name,
      bank_account_no: bank_account_no,
      Ifsc_code: Ifsc_code,
      upi_Id: upi_Id,
      account_type: account_type,
      paymentstatus: paymentstatus,
      proffered_method: proffered_method,

    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
    const requiredFields = [
      name_as_per_bank,
      bank_name,
      bank_account_no,
      Ifsc_code,
      upi_Id,
      account_type,
      paymentstatus,
      proffered_method,
    ];

    // Check if all required fields have values
    const allFieldsFilled = Object.values(requiredFields).every(value => value !== '' && value !== null && value !== undefined);

    // Only run UpdateVendorDataChange if all fields are filled
    if (allFieldsFilled) {
      UpdateVendorDataChange();
    } else {
      console.log("Not all fields are filled. UpdateVendorDataChange will not run.");
    }
  }

  const [validationErrors, setValidationErrors] = useState({
    org_name: false,
    Gstin: false,
    mobile_number: false,
    vender_email: false,
    date_of_start: false,
    registered: false,
    websiteAddress: false,
    address: false,
    vendor_city: false,
    state: false,
    status: false,
    vendor_img: false,
  });


  const Vendorhandle = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
      org_name: !org_name, // Mandate org_name
      address: !address,   // Mandate address
      // Optional fields, only validate if they are provided
      Gstin: !Gstin, // Add any specific Gstin validation if needed
      mobile_number: mobile_number && mobile_number.length !== 10, // Validate mobile if provided
      vender_email: vender_email && !emailRegex.test(vender_email), // Validate email format if provided
      date_of_start: false,  // Optional, no validation required
      registered: false,     // Optional, no validation required
      websiteAddress: false, // Optional, no validation required
      vendor_city: false,    // Optional, no validation required
      state: false,          // Optional, no validation required
      status: false,         // Optional, no validation required
      vendor_img: false 
    };


    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    await VendorAddData();
    handleNext();
  };

  const handleInputChange = (field, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value || (field === 'mobile_number' && value.length !== 10),
    }));

    switch (field) {
      case 'org_name':
        setorg_name(value);
        break;
      case 'Gstin':
        setGstin(value);
        break;
      case 'mobile_number':
        if (value.length <= 10) {
          setmobile_number(value);
        }
        break;
      case 'vender_email':
        setvender_email(value);
        break;
      case 'date_of_start':
        setdate_of_start(value);
        break;
      case 'registered':
        setregistered(value);
        break;
      case 'websiteAddress':
        setwebsiteAddress(value);
        break;
      case 'address':
        setaddress(value);
        break;
      case 'vendor_city':
        setcity(value);
        break;
      case 'state':
        setstate(value);
        break;
      case 'status':
        setstatus(value);
        break;
      case 'vendor_img':
        setvendor_img(value);
        break;
      default:
        break;
    }
  };

  const [ownerErrors, setOwnerErrors] = useState({
    owner_name: false,
    owner_aadhar: false,
    owner_mobile: false,
    owner_email: false,
    owner_address: false,
    owner_city: false,
    owner_state: false,
    // owner_img: false,

  });

  const Ownerhandle = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
      owner_name: !owner_name,
      owner_aadhar: !owner_aadhar || owner_aadhar.length !== 12,
      owner_mobile: !owner_mobile || owner_mobile.length !== 10,
      owner_email: !owner_email  || !emailRegex.test(owner_email),
      owner_address: !owner_address,
      owner_city: !owner_city,
      owner_state: !owner_state,

    };

    setOwnerErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    await OwnerUpdatedata();
    handleNext();
  };
  const handleOwnerInputChange = (field, value) => {
    setOwnerErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value || (field === 'owner_mobile' && value.length !== 10) || (field === 'owner_aadhar' && value.length !== 12),
    }));

    switch (field) {
      case 'owner_name':
        setowner_name(value);
        break;
      case 'owner_aadhar':
        setowner_aadhar(value);
        break;
      case 'owner_mobile':
        setowner_mobile(value);
        break;
      case 'owner_email':
        setowner_email(value);
        break;
      case 'owner_address':
        setowner_address(value);
        break;
      case 'owner_city':
        setowner_city(value);
        break;
      case 'owner_state':
        setowner_state(value);
        break;

      default:
        break;
    }
  };

  const [contactErrors, setContactErrors] = useState({
    contact_name: false,
    contact_aadhar: false,
    contact_mobile: false,
    contact_address: false,
    contact_city: false,
    contact_email: false,
    contact_state: false,
  });

  const Contacthandle = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
      contact_name: !contact_name,
      contact_aadhar: !contact_aadhar || contact_aadhar.length !== 12,
      contact_mobile: !contact_mobile || contact_mobile.length !== 10,
      contact_address: !contact_address,
      contact_city: !contact_city,
      contact_email: !contact_email || !emailRegex.test(contact_email),
      contact_state: !contact_state,
    };

    setContactErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    await ContactUpdatedata();
    handleNext();
  };

  const handleContactInputChange = (field, value) => {
    setContactErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value || (field === 'contact_mobile' && value.length !== 10) || (field === 'contact_aadhar' && value.length !== 12),
    }));

    switch (field) {
      case 'contact_name':
        setcontact_name(value);
        break;
      case 'contact_aadhar':
        setcontact_aadhar(value);
        break;
      case 'contact_mobile':
        setcontact_mobile(value);
        break;
      case 'contact_email':
        setcontact_email(value);
        break;
      case 'contact_address':
        setcontact_address(value);
        break;
      case 'contact_city':
        setcontact_city(value);
        break;
      case 'contact_state':
        setcontact_state(value);
        break;
      default:
        break;
    }
  };

  const [paymentErrors, setPaymentErrors] = useState({
    name_as_per_bank: false,
    bank_name: false,
    bank_account_no: false,
    Ifsc_code: false,
    upi_Id: false,
    account_type: false,
    paymentstatus: false,
    proffered_method: false,
  });

  const Paymenthandle = async (event) => {
    event.preventDefault();
    const errors = {
      name_as_per_bank: !name_as_per_bank,
      bank_name: !bank_name,
      bank_account_no: !bank_account_no,
      Ifsc_code: !Ifsc_code,
      upi_Id: !upi_Id,
      account_type: !account_type,
      paymentstatus: !paymentstatus,
      proffered_method: !proffered_method,
    };

    setPaymentErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    await PaymentUpdatedata();
    handleNext();
  };

  const handlePaymentInputChange = (field, value) => {
    setPaymentErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value,
    }));

    switch (field) {
      case 'name_as_per_bank':
        setname_as_per_bank(value);
        break;
      case 'bank_name':
        setbank_name(value);
        break;
      case 'bank_account_no':
        setbank_account_no(value);
        break;
      case 'Ifsc_code':
        setIfsc_code(value);
        break;
      case 'upi_Id':
        setupi_Id(value);
        break;
      case 'account_type':
        setaccount_type(value);
        break;
      case 'paymentstatus':
        setPaymentStatus(value);
        break;
      case 'proffered_method':
        setproffered_method(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    $(function () {
      const $tabs = $("#tabs1").tabs({
        activate: function (event, ui) {
          const newIndex = $tabs.tabs("option", "active");
          setCurrentTab(newIndex);
        }
      });
      // Disable all tabs except the first one
      $tabs.tabs("option", "disabled", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });
  }, []);

  const handleNext = () => {
    const $tabs = $("#tabs1");
    if (currentTab < 9) {
      // Enable the next tab
      $tabs.tabs("enable", currentTab + 1);
      // Set the next tab as active
      $tabs.tabs("option", "active", currentTab + 1);
      // Disable the current tab
      $tabs.tabs("disable", currentTab);
      setCurrentTab(currentTab + 1);
    }
  };
  const handlePrevious = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
      $("#tabs1").tabs("option", "active", currentTab - 1);
    }
  };

  const previes = () => {
    navigate("/admin/vendor/VendorTable");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // const isValid = await validateImageDimensions(file);
    if (file) {
      setvendor_img(file);
      setVendor_img_url(URL.createObjectURL(file));

    }

  };
  const handleOwnerImageChange = async (e) => {
    const file = e.target.files[0];

    // const isValid = await validateImageDimensions(file);
    if (file) {
      setowner_img(file);
      setOwner_img_url(URL.createObjectURL(file));

    }

  };
  const handleContactImageChange = async (e) => {
    const file = e.target.files[0];

    // const isValid = await validateImageDimensions(file);
    if (file) {
      setcontact_img(file);
      setContact_img_url(URL.createObjectURL(file));

    } else {
      setcontact_img(null);
      setContact_img_url("");
    }

  };


  //footer payment list show
  const getPaymentList = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/Payment/allPayment`,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken}`,
        },
      }
    );
    console.log("getAll_TrekData_allPayment=====>", response.data.allPayment)
    setUsers(response.data.allPayment);
  };

  const handleOwnerClear = () => {
    setowner_name('');
    setowner_aadhar('');
    setowner_mobile('');
    setowner_email('');
    setowner_address('');
    setowner_city('');
    setowner_state('');
    setowner_img('');
    setOwner_img_url('');
  };
  const handleContactClear = () => {
    setcontact_name('');
    setcontact_aadhar('');
    setcontact_mobile('');
    setcontact_email('');
    setcontact_address('');
    setcontact_city('');
    setcontact_state('');
    setcontact_img('');
    setContact_img_url('');
  };
  const handlePaymentClear = () => {
    setname_as_per_bank('');  // Resetting the name_as_per_bank field
    setbank_account_no('');   // Resetting the bank_account_no field
    setbank_name('');        // Resetting the bank_name field
    setIfsc_code('');        // Resetting the Ifsc_code field
    setupi_Id('');           // Resetting the upi_Id field
    setaccount_type('');     // Resetting the account_type field
    setproffered_method(''); // Resetting the proffered_method field
    setPaymentStatus('');   // Resetting the paymentstatus field
  };


  return (
    <>
      <Admin />
      <div className="grid-margin stretch-card card_p2">
        <div className="card ml">
          <div className="table1_a dd2">
            <div className="table2_b"> Add Data </div>
          </div>
          <div className="card-body card_b1">
            <Form className="forms-sample" noValidate validated={validated}
            // onSubmit={addData}
            >
              <div className="row">
                <div className="col-md-12">
                  <div id="tabs1">
                    <ul>
                      <li className="tab"><a href="#tab-1">Vendor</a></li>
                      <li className="tab"><a href="#tab-2">Owner</a></li>
                      <li className="tab"><a href="#tab-3">Contact</a></li>
                      <li className="tab"><a href="#tab-4">Payment</a></li>
                    </ul>
                    <div id="tab-1">
                      <div className="text_right">
                        <button type="button" className="av">
                          Disable
                        </button>
                        &nbsp; &nbsp;
                        <button type="button" className="av">
                          Delete
                        </button>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-md-6">
                            <div className="image-upload-container">
                              <label htmlFor="vendor_img" className="image-upload-icon">

                                {vendor_img_url ? (
                                  <div className="image-preview">
                                    <img src={vendor_img_url}
                                      alt="Preview"
                                      className="imgBox2"
                                    //  onChange={handleImageChange}
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="imgBox">
                                      <img
                                        src={require("../../../assets/img/camera.png")} // Replace with your icon path
                                        alt="Upload Icon"
                                      // className="imgBox"
                                      // style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                      />
                                    </div>
                                  </>
                                )}
                              </label>
                              <input
                                id="vendor_img"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">ORG Name <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Org Name"
                                name="org_name"
                                value={org_name}
                                onChange={(e) => handleInputChange('org_name', e.target.value)}
                              />

                              {validationErrors.org_name && (
                                <div className="text-danger">Please provide an Org Name</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                               <label htmlFor="exampleInputName1" className="l_one">Gstin</label> 
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Gstin"
                                name="Gstin"
                                value={Gstin}
                                onChange={(e) => handleInputChange("Gstin", e.target.value)}
                              />

                              {validationErrors.Gstin && (
                                <div className="text-danger">Please provide a Gstin</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>


                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Email</label> 
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Email"
                                name="vender_email"
                                value={vender_email}
                                onChange={(e) => handleInputChange("vender_email", e.target.value)}
                              />

                              {validationErrors.vender_email && (
                                <div className="text-danger">Please provide a valid Email</div>
                              )}
                            </Form.Group>
                          </div>

                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Start Date</label>
                              <Form.Control
                                required
                                type="date"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Start Date"
                                name="date_of_start"
                                value={date_of_start}
                                min={today}
                                onChange={(e) => handleInputChange("date_of_start", e.target.value)}
                              />

                              {validationErrors.date_of_start && (
                                <div className="text-danger">Please select a Start Date</div>
                              )}
                            </Form.Group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                               <label htmlFor="exampleInputName1" className="l_one">Registered </label> 
                              <select
                                required
                                placeholder="Registered "
                                name="registered"
                                value={registered}
                                onChange={(e) => handleInputChange("registered", e.target.value)}

                                class="form-control f_one"
                                id="exampleInputPassword1"
                              >
                                <option value="">--Select Registered--</option>
                                <option value="1"> Yes</option>
                                <option value="2"> No </option>

                              </select>


                            </Form.Group>
                            {validationErrors.registered && (
                              <div className="text-danger">Please select a registered status</div>
                            )}
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Mobile Number</label> 
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Mobile number"
                                name="mobile_number"
                                value={mobile_number}
                                onChange={(e) => handleInputChange("mobile_number", e.target.value)}
                              />

                              {validationErrors.mobile_number && (
                                <div className="text-danger"> Please provide a valid 10-digit Mobile Number</div>
                              )}
                            </Form.Group>
                          </div>


                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Website Address</label> 
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Website Address"
                                name="websiteAddress"
                                value={websiteAddress}
                                onChange={(e) => handleInputChange("websiteAddress", e.target.value)}
                              />
                              {validationErrors.websiteAddress && (
                                <div className="text-danger">Please provide a Website Address</div>
                              )}
                            </Form.Group>
                          </div>

                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Address <span className="text-danger">*</span></label> 
                              <PlacesAutocomplete
                                required
                                placeholder="Address"
                                name="address"
                                value={address}

                                // onChange={(e) => setHospital_address(e.target.value)}
                                onChange={handleAddressChange1}
                                onSelect={handleSelect1}  >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your address...",
                                        className: "form-control f_one addBox",
                                      })}
                                      value={address}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map((suggestion) => (
                                        <div
                                          {...getSuggestionItemProps(suggestion)}
                                          key={suggestion.placeId}
                                        >
                                          {suggestion.description}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              {validationErrors.address && (
                                <div className="text-danger">Please provide an Address</div>
                              )}

                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <Form.Group>
                             <label htmlFor="exampleInputName1" className="l_one"> State</label> 
                              <select
                                required
                                name="state"
                                className="form-control f_one"
                                onChange={(e) => handleInputChange("state", e.target.value)}
                                value={state}
                              >
                                <option value="">--Select State --</option>
                                {state_id.map((item) => (
                                  <option key={item.state_id} value={item.state_id}>
                                    {" "}
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {validationErrors.state && (
                                <div className="text-danger">Please provide an state</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-4">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> City</label> 
                              <select
                                required
                                name="vendor_city"
                                className="form-control f_one"
                                value={vendor_city}
                                onChange={(e) => handleInputChange("vendor_city", e.target.value)}
                              >
                                <option value="">--Select City --</option>
                                {city.map((item) => (
                                  <option key={item.city_id} value={item.city_id}>
                                    {" "}
                                    {item.city_name}
                                  </option>
                                ))}
                              </select>
                              {validationErrors.vendor_city && (
                                <div className="text-danger">Please provide an City</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-4">
                            <Form.Group>
                              <label htmlFor="exampleSelectGender" className="l_one">
                                Status
                              </label>
                              <select
                                required
                                onChange={(e) => handleInputChange("status", e.target.value)}

                                name="status"
                                class="form-control f_one"
                                id="exampleInputPassword1"
                              >
                                <option value="">-- Select Status --</option>
                                <option value="1"> Active</option>
                                <option value="0"> InActive</option>
                              </select>

                              {validationErrors.status && (
                                <div className="text-danger">Please provide an Status</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <br></br>
                        <div className="text_right">

                          <button type="button" className="P_btn" onClick={Vendorhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>


                    </div>
                    <div id="tab-2">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleOwnerClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-md-6">
                            <div className="image-upload-container">
                              <label htmlFor="owner_img" className="image-upload-icon">

                                {owner_img_url ? (
                                  <div className="image-preview">
                                    <img src={owner_img_url}
                                      alt="Preview"
                                      className="imgBox2" />
                                  </div>
                                ) : (
                                  <>
                                    <div className="imgBox">
                                      <img
                                        src={require("../../../assets/img/camera.png")} // Replace with your icon path
                                        alt="Upload Icon"
                                      // className="imgBox"
                                      // style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                      />
                                    </div>
                                  </>
                                )}

                              </label>
                              <input
                                id="owner_img"
                                type="file"
                                accept="image/*"
                                onChange={handleOwnerImageChange}
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> Name <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Name"
                                name="owner_name"
                                value={owner_name}
                                onChange={(e) => handleOwnerInputChange("owner_name", e.target.value)}
                              />
                              {ownerErrors.owner_name && (
                                <div className="text-danger">Please provide an owner name</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Aadhar <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Aadhar"
                                name="owner_aadhar"
                                value={owner_aadhar}
                                onChange={(e) => handleOwnerInputChange("owner_aadhar", e.target.value)}
                              />
                              {ownerErrors.owner_aadhar && (
                                <div className="text-danger">Please provide a valid 12-digit Aadhar number</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> Mobile Number <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Mobile Number"
                                name="owner_mobile"
                                value={owner_mobile}
                                onChange={(e) => handleOwnerInputChange("owner_mobile", e.target.value)}
                              />

                              {ownerErrors.owner_mobile && (
                                <div className="text-danger">Please provide a valid 10-digit mobile number</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Email <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Email"
                                name="owner_email"
                                value={owner_email}
                                onChange={(e) => handleOwnerInputChange("owner_email", e.target.value)}
                              />

                              {ownerErrors.owner_email && (
                                <div className="text-danger">Please provide a valid Email</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Address <span className="text-danger">*</span></label>
                              <PlacesAutocomplete
                                required
                                placeholder="Address"
                                name="owner_address"
                                value={owner_address}
                                // onChange={(e) => setHospital_address(e.target.value)}
                                onChange={handleAddressChange}
                                onSelect={handleSelect}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your address...",
                                        className: "form-control f_one addBox",
                                      })}
                                      value={owner_address}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map((suggestion) => (
                                        <div
                                          {...getSuggestionItemProps(suggestion)}
                                          key={suggestion.placeId}
                                        >
                                          {suggestion.description}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>

                              {ownerErrors.owner_address && (
                                <div className="text-danger">Please provide an Address</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>
                        </div>




                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> State <span className="text-danger">*</span></label>
                              <select
                                required
                                name="owner_state"
                                className="form-control f_one"
                                onChange={(e) => handleOwnerInputChange("owner_state", e.target.value)}
                                value={owner_state}
                              >
                                <option value="">--Select State --</option>
                                {state_id1.map((item) => (
                                  <option key={item.state_id} value={item.state_id}>
                                    {" "}
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {ownerErrors.owner_state && (
                                <div className="text-danger">Please provide an State</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> City <span className="text-danger">*</span></label>
                              <select
                                required
                                name="owner_city"
                                className="form-control f_one"
                                value={owner_city}
                                onChange={(e) => handleOwnerInputChange("owner_city", e.target.value)}
                              >
                                <option value="">--Select City --</option>
                                {city1.map((item) => (
                                  <option key={item.city_id} value={item.city_id}>
                                    {" "}
                                    {item.city_name}
                                  </option>
                                ))}
                              </select>
                              {ownerErrors.owner_city && (
                                <div className="text-danger">Please provide an City</div>
                              )}
                            </Form.Group>
                          </div>


                        </div>

                        <br></br>
                        <div className="text_right">

                          {/* <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                            Previous
                          </button> */}
                          &nbsp;
                          <button type="button" className="P_btn" onClick={Ownerhandle}>
                            Save & Next
                          </button>
                        </div>

                      </div>

                    </div>
                    <div id="tab-3">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleContactClear}>
                          Clear
                        </button>
                      </div>
                      <div>

                        <div class="row">
                          <div class="col-md-6">
                            <div className="image-upload-container">
                              <label htmlFor="contact_img" className="image-upload-icon">

                                {Contact_img_url ? (
                                  <div className="image-preview">
                                    <img src={Contact_img_url} alt="Preview" className="imgBox2" />
                                  </div>
                                ) : (
                                  <>
                                    <div className="imgBox">
                                      <img
                                        src={require("../../../assets/img/camera.png")} // Replace with your icon path
                                        alt="Upload Icon"
                                      // className="imgBox"
                                      // style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                      />
                                    </div>
                                  </>
                                )}

                              </label>
                              <input
                                id="contact_img"
                                type="file"
                                accept="image/*"
                                onChange={handleContactImageChange}
                                style={{ display: "none" }}
                              />
                            </div>
                          </div>
                        </div>


                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Name <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Name"
                                name="contact_name"
                                value={contact_name}
                                onChange={(e) => handleContactInputChange("contact_name", e.target.value)}
                              />
                              {contactErrors.contact_name && (
                                <div className="text-danger">Please provide a name</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Aadhar <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Aadhar"
                                name="contact_aadhar"
                                value={contact_aadhar}
                                onChange={(e) => handleContactInputChange("contact_aadhar", e.target.value)}
                              />
                              {contactErrors.contact_aadhar && (
                                <div className="text-danger">Please provide a valid 12-digit Aadhar number</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Mobile Number <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Mobile number"
                                name="contact_mobile"
                                value={contact_mobile}
                                onChange={(e) => handleContactInputChange("contact_mobile", e.target.value)}
                              />
                              {contactErrors.contact_mobile && (
                                <div className="text-danger">Please provide a valid 10-digit mobile number</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Email <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Email"
                                name="contact_email"
                                value={contact_email}
                                onChange={(e) => handleContactInputChange("contact_email", e.target.value)}
                              />
                              {contactErrors.contact_email && (
                                <div className="text-danger">Please provide a valid email</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Address <span className="text-danger">*</span></label>
                              <PlacesAutocomplete
                                required
                                placeholder="Address"
                                name="contact_address"
                                value={contact_address}
                                onChange={handleAddressChange2}
                                onSelect={handleSelect2}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your address...",
                                        className: "location-search-input form-control f_one addBox",
                                      })}
                                      value={contact_address}
                                    />
                                    <div className="autocomplete-dropdown-container">
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map((suggestion) => (
                                        <div
                                          {...getSuggestionItemProps(suggestion)}
                                          key={suggestion.placeId}
                                        >
                                          {suggestion.description}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              {contactErrors.contact_address && (
                                <div className="text-danger">Please provide an address</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">State <span className="text-danger">*</span></label>
                              <select
                                required
                                name="contact_state"
                                className="form-control f_one"
                                onChange={(e) => handleContactInputChange("contact_state", e.target.value)}
                                value={contact_state}
                              >
                                <option value="">--Select State--</option>
                                {state_id2.map((item) => (
                                  <option key={item.state_id} value={item.state_id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {contactErrors.contact_state && (
                                <div className="text-danger">Please select a state</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">City <span className="text-danger">*</span></label>
                              <select
                                required
                                name="contact_city"
                                className="form-control f_one"
                                value={contact_city}
                                onChange={(e) => handleContactInputChange("contact_city", e.target.value)}
                              >
                                <option value="">--Select City--</option>
                                {city2.map((item) => (
                                  <option key={item.city_id} value={item.city_id}>
                                    {item.city_name}
                                  </option>
                                ))}
                              </select>
                              {contactErrors.contact_city && (
                                <div className="text-danger">Please provide a city</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          <button type="button" className="P_btn" onClick={Contacthandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="tab-4">

                      <div className="text_right">

                        <button type="button" className="av" onClick={handlePaymentClear}>
                          Clear
                        </button>
                      </div>
                      <br></br>
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="name_as_per_bank" className="l_one">Name as per Bank <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="name_as_per_bank"
                                placeholder="Name as per Bank"
                                name="name_as_per_bank"
                                value={name_as_per_bank}
                                onChange={(e) => handlePaymentInputChange("name_as_per_bank", e.target.value)}
                              />
                              {paymentErrors.name_as_per_bank && (
                                <div className="text-danger">Please provide the name as per bank</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="bank_account_no" className="l_one">Bank Account Number</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="bank_account_no"
                                placeholder="Account Number"
                                name="bank_account_no"
                                value={bank_account_no}
                                onChange={(e) => handlePaymentInputChange("bank_account_no", e.target.value)}
                              />
                              {paymentErrors.bank_account_no && (
                                <div className="text-danger">Please provide the bank account number</div>
                              )}
                            </Form.Group>
                          </div>

                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="bank_name" className="l_one">Bank Name</label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="bank_name"
                                placeholder="Bank Name"
                                name="bank_name"
                                value={bank_name}
                                onChange={(e) => handlePaymentInputChange("bank_name", e.target.value)}
                              />
                              {paymentErrors.bank_name && (
                                <div className="text-danger">Please provide the bank name</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="Ifsc_code" className="l_one">IFSC Code</label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="Ifsc_code"
                                placeholder="IFSC Code"
                                name="Ifsc_code"
                                value={Ifsc_code}
                                onChange={(e) => handlePaymentInputChange("Ifsc_code", e.target.value)}
                              />
                              {paymentErrors.Ifsc_code && (
                                <div className="text-danger">Please provide the IFSC code</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="upi_Id" className="l_one">UPI ID</label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="upi_Id"
                                placeholder="UPI ID"
                                name="upi_Id"
                                value={upi_Id}
                                onChange={(e) => handlePaymentInputChange("upi_Id", e.target.value)}
                              />
                              {paymentErrors.upi_Id && (
                                <div className="text-danger">Please provide the UPI ID</div>
                              )}
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleSelectGender" className="l_one">
                                Account Type
                              </label>
                              <select

                                onChange={(e) => handlePaymentInputChange("account_type", e.target.value)}
                                value={account_type}
                                name="account_type"
                                class="form-control f_one"
                                id="exampleInputPassword1"
                              >
                                <option value=""> --Select Account Type--</option>
                                <option value="1"> Saving</option>
                                <option value="2"> Current</option>
                              </select>
                              {paymentErrors.account_type && (
                                <div className="text-danger">Please provide the account type</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleSelectGender" className="l_one">
                                Preffered Method
                              </label>
                              <select


                                value={proffered_method}
                                name="proffered_method"
                                class="form-control f_one"
                                id="exampleInputPassword1"
                                onChange={(e) => handlePaymentInputChange("proffered_method", e.target.value)}

                              >
                                <option value=""> -Select Preffered Method-</option>
                                <option value="1"> NTFS</option>
                                <option value="2"> UPI</option>
                              </select>
                              {paymentErrors.proffered_method && (
                                <div className="text-danger">Please provide the preffered method</div>
                              )}
                            </Form.Group>

                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleSelectGender" className="l_one">
                               Status
                              </label>
                              <select


                                value={paymentstatus}
                                name="paymentstatus"
                                class="form-control f_one"
                                id="exampleInputPassword1"
                                onChange={(e) => handlePaymentInputChange("paymentstatus", e.target.value)}

                              >
                                <option value=""> -Select Status-</option>
                                <option value="1"> Active</option>
                                <option value="0"> InActive</option>
                              </select>
                              {paymentErrors.paymentstatus && (
                                <div className="text-danger">Please provide the status</div>
                              )}
                            </Form.Group>

                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">

                          <button type="button" className="P_btn" onClick={Paymenthandle}>
                            Create Vendor
                          </button>
                        </div>
                        <b> <hr></hr> </b>
                        <div>
                          <h3>List of Payments</h3>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Account Type</th>
                                <th>Bank</th>
                                <th>Bank Account Number</th>
                                <th>Status</th>
                                {/* <th>IFSC Code</th>
                                <th>UPI ID</th>
                                <th>Proffered Method</th> */}
                              </tr>
                            </thead>
                            <tbody>
                              {users
                                .filter(user => user.name_as_per_bank)
                                .map((user, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.payment_date}</td>
                                    <td>{user.account_type}</td>
                                    <td>{user.name_as_per_bank}</td>
                                    {/* <td>{user.bank_name}</td> */}
                                    <td>{user.bank_account_no}</td>
                                    <td>{user.paymentstatus}</td>
                                    {/* <td>{user.Ifsc_code}</td>
                                    <td>{user.upi_Id}</td>
                                    <td>{user.proffered_method}</td> */}
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </div>

                      </div>


                    </div>

                  </div>
                </div>
              </div>

            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorAddform