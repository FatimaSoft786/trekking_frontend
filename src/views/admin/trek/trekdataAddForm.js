import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import "jquery-ui/ui/widgets/tabs";
import { Form } from "react-bootstrap";
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

const TrekdataAddForm = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const [token, setToken] = useState("");
  const [currentTab, setCurrentTab] = useState(0);
  const [icon_id, setIcon_id] = useState("");
  const [Icon, setIcon] = useState([]);
  const [category, setCategory] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [landscape, setLandscape] = useState([]);
  const [landscape_id, setLandscape_id] = useState("");
  const [trailing, setTrailing] = useState([]);
  const [trailing_id, setTrailing_id] = useState("");
  const [price, setPrice] = useState("");
  const [trek_day, setTrek_day] = useState("");
  const [distance, setdistance] = useState("");
  const [altitude, setAltitude] = useState("");
  const [toilet_tent, setToilet_tent] = useState("");
  const [stay, setStay] = useState("");
  var [image, setimage] = useState([]);
  const [trek_Name, setTrek_Name] = useState("");
  const [location, setLocation] = useState("");
  const [loc_lat, setLoc_late] = useState(null);
  const [loc_long, setLoc_long] = useState(null);
  const [start_address, setStart_address] = useState("");
  const [start_lat, setStart_lat] = useState(null);
  const [start_long, setStart_long] = useState(null);
  const [end_address, setEnd_address] = useState("");
  const [end_lat, setEnd_lat] = useState(null);
  const [end_long, setEnd_long] = useState(null);
  const [sections, setSections] = useState([{ id: 1, rows: [{ icon_id: "", day_name: "", description: "" }] }]);
  const [validated, setValidated] = useState(false);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");
  const [trek_img, settrek_img] = useState("");
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const [trekExistmsg, settrekExistmsg] = useState("");
 
  const [ladies_only, setLadies_only] = useState("");
  const [waterbodies, setWaterbodies] = useState("");

  const [trip_summary, setTrip_summary] = useState("");

  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [food_menu, setFood_menu] = useState("");

  const [basic_gear, setBasic_gear] = useState("");
  const [clothing, setClothing] = useState("");
  const [head_gear, setHead_gear] = useState("");
  const [foot_gear, setFoot_gear] = useState("");

  const [eligibility, setEligibility] = useState("");
  const [document1, setDocument] = useState("");

  const [policy, setPolicy] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [state_id, setStateId] = useState([]);
  const [trek_state, setTrek_state] = useState("");
  const [level, setLevel] = useState("");
  const [msg, setMsg] = useState("");
  const [imageError, setImageError] = useState("");
  const [fcqtrekId, setfcqtrekId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [error, setError] = useState(null);
  let Intoken = JSON.parse(localStorage.getItem('data'));
  const [trek_Namemsg, settrek_Namemsg] = useState("");
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    if (Intoken) {
      setToken(Intoken.accessToken);
    }
  };


  // Icon  get -----------------------------------
  useEffect(() => {
    const getIcon = async () => {
      const IconData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Icon/allIcon`,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken}`,
          },
        }
      );
      const getres = await IconData.data.allIcon;

      if (getres) {
        var getresarr = [];
        getres.map((item) => {
          if (item.iconStatus == "Active") {
            getresarr.push(item);
          }
        });
        setIcon(getresarr);
      } else {
        setIcon(getres);
      }
    };
    getIcon();
  }, []);


  useEffect(() => {
    $(function () {
      $("#tabs").tabs();
    });
  }, []);



  const handleAddRow = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows.push({ icon_id: "", day_name: "", description: "" });
    setSections(updatedSections);
  };

  const handleRemoveRow = (sectionIndex, rowIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows.splice(rowIndex, 1);
    setSections(updatedSections);
  };

  const handleAddTab = () => {
    const newSectionId = sections.length + 1;
    setSections([...sections, { id: newSectionId, rows: [{ icon_id: "", day_name: "", description: "" }] }]);

    setTimeout(() => {
      $("#tabs").tabs("refresh");
      $("#tabs").tabs("option", "active", -1);
    }, 0);
  };

  const handleRemoveTab = (index) => {
    const updatedSections = sections.filter((_, i) => i !== index);
    const reindexedSections = updatedSections.map((section, i) => ({
      ...section,
      id: i + 1,
    }));
    setSections(reindexedSections);

    setTimeout(() => {
      $("#tabs").tabs("refresh");
    }, 0);
  };


  const handleSelectIcon = (item, sectionIndex, rowIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows[rowIndex].icon_id = item.icon_id;
    setSections(updatedSections);
    setIsOpen(false);
  };

  const toggleDropdown = (sectionIndex, rowIndex) => {
    setSelectedSectionIndex(sectionIndex);
    setSelectedRowIndex(rowIndex);
    setIsOpen(!isOpen);
  };

  // Fetch Category Data
  useEffect(() => {
    const getCategory = async () => {
      const CategoryData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Category/allCategory`,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken}`,
          },
        }
      );
      const getres = await CategoryData.data.allCategory;
      const activeCategories = getres.filter(item => item.categoryStatus === "Active");
      setCategory(activeCategories);
    };
    getCategory();
  }, []);

  // Fetch Landscape Data
  useEffect(() => {
    const getLandscape = async () => {
      const LandscapeData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Landscape/allLandscape`,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken}`,
          },
        }
      );
      const getres = await LandscapeData.data.allLandscape;
      const activeLandscapes = getres.filter(item => item.landscapeStatus === "Active");
      setLandscape(activeLandscapes);
    };
    getLandscape();
  }, []);

  // Fetch Trailing Data
  useEffect(() => {
    const getTrailing = async () => {
      const TrailingData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Trailing/allTrailing`,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken}`,
          },
        }
      );
      const getres = await TrailingData.data.alltrailing;
      const activeTrailings = getres.filter(item => item.trailingStatus === "Active");
      setTrailing(activeTrailings);
    };
    getTrailing();
  }, []);

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
      }
    };
    getState();
  }, []);



  //location 
  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your location",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyAUCOftBEXUbdEU4sierRVav1xml3sSgOY",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'location',
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
        return (componentType === 'location') ?
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
        return (componentType === 'location') ?
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
        const autocomplete = new Autocomplete(getFormInputElement('location'), {
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
              setLoc_late(latLng.lat);
              setLoc_long(latLng.lng);
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
    // Handle the address selection
    geocodeByAddress(selectedAddress)
      .then((results) => {
        const place = results[0];
        setLocation(selectedAddress);
        setLoc_late(place.geometry.location.lat());
        setLoc_long(place.geometry.location.lng());
        setLocationValidationErrors((prevErrors) => ({
          ...prevErrors,
          location: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange = (newAddress) => {
    setLocation(newAddress);
    setLocationValidationErrors((prevErrors) => ({
      ...prevErrors,
      location: false,
    }));
  };


  // Start Address  field --------------------------

  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your start address",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyAUCOftBEXUbdEU4sierRVav1xml3sSgOY",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'start_address',
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
        return (componentType === 'start_address') ?
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
        return (componentType === 'start_address') ?
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
              setLoc_late(latLng.lat);
              setLoc_long(latLng.lng);
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
        setStart_address(selectedAddress);
        setStart_lat(place.geometry.location.lat());
        setStart_long(place.geometry.location.lng());
        setLocationValidationErrors((prevErrors) => ({
          ...prevErrors,
          start_address: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange1 = (newAddress) => {
    setStart_address(newAddress);
    setLocationValidationErrors((prevErrors) => ({
      ...prevErrors,
      start_address: false,
    }));
  };


  // End Address  field --------------------------
  useEffect(() => {
    const CONFIGURATION = {
      "ctaTitle": "Your end address",
      "mapOptions": { "center": { "lat": 37.4221, "lng": -122.0841 }, "fullscreenControl": true, "mapTypeControl": false, "streetViewControl": true, "zoom": 11, "zoomControl": true, "maxZoom": 22, "mapId": "" },
      "mapsApiKey": "AIzaSyAUCOftBEXUbdEU4sierRVav1xml3sSgOY",
      "capabilities": { "addressAutocompleteControl": true, "mapDisplayControl": true, "ctaControl": true }

    };

    const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

    const ADDRESS_COMPONENT_TYPES_IN_FORM = [
      'end_address',
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
        return (componentType === 'end_address') ?
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
        return (componentType === 'end_address') ?
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
        const autocomplete = new Autocomplete(getFormInputElement('end_address'), {
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
              setEnd_lat(latLng.lat);
              setEnd_long(latLng.lng);
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
        setEnd_address(selectedAddress);
        setEnd_lat(place.geometry.location.lat());
        setEnd_long(place.geometry.location.lng());
        setLocationValidationErrors((prevErrors) => ({
          ...prevErrors,
          end_address: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange2 = (newAddress) => {
    setEnd_address(newAddress);
    setLocationValidationErrors((prevErrors) => ({
      ...prevErrors,
      end_address: false,
    }));
  };


  const quillModules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"], // Bold, Italic, Underline, Strikethrough
      [{ list: "ordered" }, { list: "bullet" }], // Numbered list, Bullet points
    ],
  };


  const TrekaddData = async () => {
try{


  const data = {
    "trek_Name": trek_Name,
    "start_date": start_date,
    "end_date": end_date,
    "price": price,
    "trek_state": trek_state,
    "trip_summary":trip_summary
   }

     axios.post(`${process.env.REACT_APP_BACKEND_URL}/Trek/addtrek`, data,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      }).then((response)=>{
        const trekId = response.data.trek._id;
      console.log('trekId', trekId)
      localStorage.setItem('trekId', trekId);
      handleNext();
      // navigate(`/trek/trekdataUpdateForm/${trekId}`);

      }).catch((err)=>{
        setMsg(err.response.data.msg);
      })
   // ImageaddData();
  }catch (error) {
    if (error.response) {
      settrekExistmsg(error.response.data.trekExistmsg);
      }
  }
   // inclusionaddData();
   // eligibilityaddData();
   // policyaddData();
   // thingsaddData();
   // faqDynamicDataChange();

  }

  const ImageaddData = async () => {

    const fromData = new FormData();
    selectedImages.forEach((img) => {
      fromData.append("image", img);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/Trek/oneUrl`,
      fromData,
    );

    var add1_img = response.data.images;
    image = add1_img;
    const ImageData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Images/addImages`, {
      trek_img: image
    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });


  }

  // trek validation
  const [trekValidationErrors, setTrekValidationErrors] = useState({
    trek_Name: false,
    trek_state: false,
    start_date: false,
    end_date: false,
    price: false,
    trip_summary: false,
  });

  const trekhandle = async (event) => {
    event.preventDefault();

    // Initialize errors object
    const errors = {};

    // Validate trek_Name (must be at least 3 characters)
    if (!trek_Name || trek_Name.length < 3 || trek_Name >= 30) {
      errors.trek_Name = "Trek name must be at least 3 and 50 characters  long ";
    }

    // Validate price (must be greater than 0)
    // Validate price (must be greater than 0 and not more than 99999)
    if (!price || price <= 0) {
      errors.price = "Price must be greater than 0";
    } else if (price > 99999) {
      errors.price = "Price cannot exceed 99999";
    }

    // Validate other fields
    errors.trek_state = !trek_state ? "Trek state is required" : "";
    errors.start_date = !start_date ? "Start date is required" : "";
    errors.end_date = !end_date ? "End date is required" : "";
    errors.trip_summary = !trip_summary ? "Trip summary is required" : "";

    // Set validation errors in state
    setTrekValidationErrors(errors);

    // Check if any validation errors exist
    if (Object.values(errors).some((error) => error)) {
      return; // Stop execution if there are validation errors
    }


    await TrekaddData();
    

  };

  const handleTrekInputChange = (field, value) => {
  
    if (field === 'start_date') {
      setStart_date(value);
      // Reset end date if it's before the new start date
      if (new Date(end_date) < new Date(value)) {
        setEnd_date('');
      }
    } else if (field === 'end_date') {
      setEnd_date(value);
    } else {
      // Handle other fields as usual
    }
    setTrekValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value || (field === 'price' && value.length !== 5),
   
    }));

    switch (field) {
      case 'trek_Name':
        setTrek_Name(value);
        break;
      case 'trek_state':
        setTrek_state(value);
        break;
      case 'start_date':
        setStart_date(value);
        break;
      case 'end_date':
        setEnd_date(value);
        break;
      case 'price':
        if (value.length <= 5) {
          setPrice(value);
        }
       
        break;
      case 'trip_summary':
        setTrip_summary(value);
        break;
      default:
        break;
    }
  };

  //Feature validation 
  const [featuresValidationErrors, setFeaturesValidationErrors] = useState({
    altitude: false,
    category_id: false,
    trailing_id: false,
    landscape_id: false,
    trek_day: false,
    distance: false,
    waterbodies: false,
    level: false,
    toilet_tent: false,
    stay: false,
    ladies_only: false,
  });
  const featureshandle = (event) => {
    event.preventDefault();

    const errors = {
      altitude: !altitude,
      category_id: !category_id,
      trailing_id: !trailing_id,
      landscape_id: !landscape_id,
      trek_day: !trek_day,
      distance: !distance,
      waterbodies: !waterbodies,
      level: !level,
      toilet_tent: !toilet_tent,
      stay: !stay,
      ladies_only: !ladies_only,
    };

    setFeaturesValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    FeaturesUpdateData();
    handleNext();
  };
  const handleFeaturesInputChange = (field, value) => {
    switch (field) {
      case 'altitude':
        setAltitude(value);
        break;
      case 'category_id':
        setCategory_id(value);
        break;
      case 'trailing_id':
        setTrailing_id(value);
        break;
      case 'landscape_id':
        setLandscape_id(value);
        break;
      case 'trek_day':
        setTrek_day(value);
        break;
      case 'distance':
        setdistance(value);
        break;
      case 'waterbodies':
        setWaterbodies(value);
        break;
      case 'level':
        setLevel(value);
        break;
      case 'toilet_tent':
        setToilet_tent(value);
        break;
      case 'stay':
        setStay(value);
        break;
      case 'ladies_only':
        setLadies_only(value);
        break;
      default:
        break;
    }

    setFeaturesValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  //Location Validation 
  const [locationValidationErrors, setLocationValidationErrors] = useState({
    location: false,
    start_address: false,
    end_address: false,
  });

  const locationhandle = (event) => {
    event.preventDefault();

    const errors = {
      location: !location,
      start_address: !start_address,
      end_address: !end_address,
    };

    setLocationValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    LocationUpdateData();
    handleNext();
  };

  //image validation
  const Imagehandle = () => {
    if (selectedImages.length === 0) {
      setImageError("Please select at least one image.");
      return;
    }
    ImageUpdateData();
    handleNext();
  };

  //itinerary validation

  const [itineraryValidationErrors, setItineraryValidationErrors] = useState(
    sections.map(section => ({
      rows: section.rows.map(() => ({
        icon_id: false,
        day_name: false,
        description: false,
      }))
    }))
  );

  const itineraryhandle = (event) => {
    event.preventDefault();

    let hasErrors = false;
    const newErrors = sections.map(section => ({
      rows: section.rows.map(row => {
        const rowErrors = {
          icon_id: !row.icon_id,
          day_name: !row.day_name,
          description: !row.description,
        };

        if (!rowErrors.icon_id && !rowErrors.day_name && !rowErrors.description) {
          return rowErrors;
        } else {
          hasErrors = true;
          return rowErrors;
        }
      })
    }));

    setItineraryValidationErrors(newErrors);

    if (hasErrors) {
      return;
    }

    ItineraryUpdateData();
    handleNext();
  };
  const handleInputChange = (event, sectionIndex, rowIndex) => {
    const { name, value } = event.target;
    const newSections = [...sections];
    newSections[sectionIndex].rows[rowIndex][name] = value;

    setSections(newSections);

    // const newErrors = [...itineraryValidationErrors];
    // newErrors[sectionIndex].rows[rowIndex][name] = false;
    // setItineraryValidationErrors(newErrors);
  };

  //Inclustion validation
  const [inclusionValidationErrors, setInclusionValidationErrors] = useState({
    inclusion: false,
    exclusion: false,
    food_menu: false,
  });

  const inclusionhandle = (event) => {
    event.preventDefault();

    const newErrors = {
      inclusion: !inclusion,
      exclusion: !exclusion,
      food_menu: !food_menu,
    };

    setInclusionValidationErrors(newErrors);

    if (newErrors.inclusion || newErrors.exclusion || newErrors.food_menu) {
      return;
    }

    InclusionUpdateData();
    handleNext();
  };
  const handleInclusionInputChange = (name, value) => {
    if (name === 'inclusion') {
      setInclusion(value);
    } else if (name === 'exclusion') {
      setExclusion(value);
    } else if (name === 'food_menu') {
      setFood_menu(value);
    }

    setInclusionValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  // Eligiblity Validation
  const [eligibilityValidationErrors, setEligibilityValidationErrors] = useState({
    eligibility: false,
    document1: false
  });

  const eligibilityhandle = (event) => {
    event.preventDefault();

    const newErrors = {
      eligibility: !eligibility,
      document1: !document1,
    };

    setEligibilityValidationErrors(newErrors);

    if (newErrors.eligibility || newErrors.document1) {
      return;
    }

    EligibilityUpdateData();
    handleNext();
  };

  const handleEligibilityInputChange = (name, value) => {
    if (name === 'eligibility') {
      setEligibility(value);
    } else if (name === 'document1') {
      setDocument(value);
    }

    setEligibilityValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  // Policy validation
  const [policyValidationErrors, setPolicyValidationErrors] = useState({
    policy: false,
  });

  const policyhandle = (event) => {
    event.preventDefault();

    const newErrors = {
      policy: !policy,
    };

    setPolicyValidationErrors(newErrors);

    if (newErrors.policy) {
      return;
    }

    PolicyUpdateData();
    handleNext();
  };

  const handlePolicyInputChange = (name, value) => {
    if (name === 'policy') {
      setPolicy(value);
    }

    setPolicyValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  //Things validation 
  const [thingsValidationErrors, setThingsValidationErrors] = useState({
    basic_gear: false,
    clothing: false,
    head_gear: false,
    foot_gear: false,
  });

  const thingshandle = (event) => {
    event.preventDefault();

    const newErrors = {
      basic_gear: !basic_gear,
      clothing: !clothing,
      head_gear: !head_gear,
      foot_gear: !foot_gear,
    };

    setThingsValidationErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (hasErrors) {
      return;
    }

    ThingsUpdateData();
    handleNext();
  };

  const handleThingsInputChange = (name, value) => {
    if (name === 'basic_gear') {
      setBasic_gear(value);
    } else if (name === 'clothing') {
      setClothing(value);
    } else if (name === 'head_gear') {
      setHead_gear(value);
    } else if (name === 'foot_gear') {
      setFoot_gear(value);
    }

    setThingsValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  //FAQ validation 

  const [faqValidationErrors, setFaqValidationErrors] = useState([]);
  const fcqhandle = (event) => {
    event.preventDefault();

    const newErrors = finalArrayData.map((row) => ({
      question: !row.question,
      answer: !row.answer,
    }));

    setFaqValidationErrors(newErrors);

    const hasErrors = newErrors.some((error) => error.question || error.answer);

    if (hasErrors) {
      return;
    }

    FaqUpdateData();
  };





  const FeaturesUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const data = {
      "category_id": category_id,
      "landscape_id": landscape_id,
      "trailing_id": trailing_id,
      "altitude": altitude,
      "trek_day": trek_day,
      "distance": distance,
      "level": level,
      "stay": stay,
      "toilet_tent": toilet_tent,
      "waterbodies": waterbodies,
      "ladies_only": ladies_only,
    }
 
    const fecturesUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateFeatures/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const LocationUpdateData = async () => {
    let id = localStorage.getItem('trekId')
    const data = {
      location: location,
      "loc_lat": 22.7196,
      "loc_long": 75.8577,
      "start_address": start_address,
      "start_lat": 22.718435,
      "start_long": 75.855217,
      "end_address": end_address,
      "end_lat": 22.7201,
      "end_long": 75.8714,
    }
    const locationUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateLocation/${id}`,data,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const ImageUpdateData = async () => {
    // const fromData = new FormData();
    // selectedImages.forEach((img) => {
    //   fromData.append("image", img);
    // });

    // const response = await axios.post(
    //   `${process.env.REACT_APP_BACKEND_URL}/Trek/oneUrl`,
    //   fromData,
    // );


    // var add1_img = response.data.images;
    // image = add1_img;

  const data = {
    "trek_img": "Images/Trek_img/1727159428178-519535226.webp"
  }

    let id = localStorage.getItem('trekId');
    const ImageUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateImages/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const ItineraryUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const itineraryData = sections.map(section => ({
      section_id: section.id,
      rows: section.rows.map(row => ({
        icon_id: row.icon_id,
        day_name: row.day_name,
        description: row.description
      }))
    }));
    console.log(itineraryData)

    const ItineraryUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateItinerary/${id}`, {
      sections: itineraryData
    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const InclusionUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const InclusionUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateInclusion/${id}`, {
      inclusion: inclusion,
      exclusion: exclusion,
      food_menu: food_menu
    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const EligibilityUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const eligibilityUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateEligibility/${id}`, {
      eligibility: eligibility,
      document: document1
    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });
  }
  const PolicyUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const policyUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updatePolicy/${id}`, {
      policy: policy

    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const ThingsUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    const thingsUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateThings/${id}`, {
      basic_gear: basic_gear,
      clothing: clothing,
      head_gear: head_gear,
      foot_gear: foot_gear,

    },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken} `,
        },
      });

  }
  const FaqUpdateData = async () => {
    let id = localStorage.getItem('trekId');
    // for (var i = 0; i < finalArrayData.length; i++) {
    //   finalArrayData[i]["trek_id"] = id;
    // }

    axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Trek/updateFaqData/${id}`,
      {
        finalArrayData: finalArrayData,
      },
      {
        headers: {
          Authorization: `Bearer ${Intoken.accessToken}`,
        },
      }
    );
    navigate("/admin/trek/trekdataTable");
  }


  const [finalArrayData, setFinalArrayData] = useState([
    {
      question: "",
      answer: ""
    },
  ]);

  const faqHandleinputchange = (e, i) => {
    const { name, value } = e.target;
    const list = [...finalArrayData];
    list[i][name] = value;
    setFinalArrayData(list);

    const newErrors = [...faqValidationErrors];
    newErrors[i] = {
      ...newErrors[i],
      [name]: false,
    };
    setFaqValidationErrors(newErrors);
  };

  const faqOnRemove = (index) => {
    const list = [...finalArrayData];
    list.splice(index, 1);
    setFinalArrayData(list);
  };

  const faqaddRow = () => {
    setFinalArrayData([
      ...finalArrayData,
      {
        question: "",
        answer: "",
        check_status: "0",
      },
    ]);
  };


  // const validateCurrentTab = () => {
  //   let isValid = true;
  //   if (currentTab === 0) {
  //     // Replace the following with your actual validation logic for tab 1
  //     $('#tab-1 input').each(function() {
  //       if ($(this).val() === '') {
  //         isValid = false;

  //       }
  //     });
  //   }
  //   // Add similar validation for other tabs if needed
  //   return isValid;
  // };

  // useEffect(() => {
  //   $(function () {
  //     $("#tabs1").tabs({
  //       beforeActivate: function (event, ui) {
  //         if (!validateCurrentTab()) {
  //           event.preventDefault();
  //           // alert("Please fill all fields in the current tab before proceeding.");
  //         }
  //       },
  //       activate: function (event, ui) {
  //         const newIndex = $("#tabs1").tabs("option", "active");
  //         setCurrentTab(newIndex);
  //       }
  //     });
  //   });
  // }, [currentTab]);


  useEffect(() => {
    $(function () {
      const $tabs = $("#tabs1").tabs({
        activate: function (event, ui) {
          const newIndex = $tabs.tabs("option", "active");
          setCurrentTab(newIndex);
        }
      });
      // Disable all tabs except the first one
      $tabs.tabs("option", "disabled", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });
  }, []);


  const handleNext = () => {
    const $tabs = $("#tabs1");
    if (currentTab < 10) {
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

  const removeBaseUrl = (url) => {
    const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/`;
    return url.replace(baseUrl, "");
  };

  // console.log("removed base url ====>", updatedImages);
  const onDrop = (acceptedFiles) => {
    setError(null); // Clear any previous errors

    acceptedFiles.forEach((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width !== 360 || img.height !== 350) {
          setError(`Image dimensions must be 360x350. The selected image is ${img.width}x${img.height}.`);
        } else {
          const newSelected = [...selectedImages, ...acceptedFiles];
          setSelectedImages(newSelected);
        }
      };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Function to handle image removal
  const handleImageRemoval = (indexToRemove, isExisting) => {

    if (isExisting) {
      const updatedImagesCopy = [...updatedImages];
      updatedImagesCopy.splice(indexToRemove, 1);
      setUpdatedImages(updatedImagesCopy);
      // const newFindeData = updatedImagesCopy.map((url) => removeBaseUrl(url));
      // setnewUpdatedImages(newFindeData);
    } else {
      const selectedImagesCopy = [...selectedImages];
      selectedImagesCopy.splice(indexToRemove, 1);
      setSelectedImages(selectedImagesCopy);
    }
  };

  const renderSelectedImages = () => {
    return selectedImages.map((file, index) => (
      // if (file.trim() !== "/Images/blankUser.png") {
      // return (
      <div key={index} className="selected-image">
        <div className="image-container">
          <img
            src={URL.createObjectURL(file)}
            alt={`Selected Image ${index}`}
          />
          <button
            type="button"
            className="btn btn-danger remove-button"
            onClick={(event) => {
              event.preventDefault(); // Prevent the default form submit
              handleImageRemoval(index, false); // Pass false to indicate it's a selected image
            }}
          >
            {/* Remove */}
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      // );
      // } else {
      //   return null;
      // }
    ));
  };

  const renderGetImages = () => {
    return updatedImages.map((file, index) => (
      // return (
      <div key={index} className="selected-image">
        <div className="image-container">
          <img src={file} alt={`Selected Image ${index}`} />
          <button
            className="btn btn-danger remove-button"
            onClick={() => handleImageRemoval(index, true)}
          >
            {/* Remove */}
            <FontAwesomeIcon icon={faTrash} /> {/* Add the trash icon */}
          </button>
        </div>
      </div>
      // );
    ));
  };

  const previes = () => {
    navigate("/admin/trek/trekdataTable");
  };

  const handleFeaturesClear = () => {
    setAltitude('');
    setCategory_id('');
    setLandscape_id('');
    setTrailing_id('');
    setTrek_day('');
    setdistance('');
    setToilet_tent('');
    setStay('');
    setWaterbodies('');
    setLadies_only('');
    setLevel('');
  };

  const handleLocationClear = () => {
    setLocation('');
    setLoc_late('');
    setLoc_long('');
    setStart_address('');
    setStart_lat('');
    setStart_long('');
    setEnd_address('');
    setEnd_lat('');
    setEnd_long('');
  };
  const handleitineraryClear = () => {
    setSections([{ id: 1, rows: [{ icon_id: "", day_name: "", description: "" }] }]);
  };

  const handleInclusionClear = () => {
    setInclusion('');
    setFood_menu('');
    setExclusion('');
  };

  const handleEligibilityClear = () => {
    setEligibility('');
    setDocument('');
  };

  const handlePolicyClear = () => {
    setPolicy('');
  };

  const handleThingsClear = () => {
    setBasic_gear('');
    setClothing('');
    setHead_gear('');
    setFoot_gear('');
  };
  const handleFaqClear = () => {
    setFinalArrayData([
      {
        question: "",
        answer: "",
        check_status: "0",
      },
    ]);

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
                      <li className="tab"><a href="#tab-1">Basic</a></li>
                      <li className="tab"><a href="#tab-2">Features</a></li>
                      <li className="tab"><a href="#tab-3">Location</a></li>
                      <li className="tab"><a href="#tab-4">Image</a></li>
                      <li className="tab"><a href="#tab-5">Itinerary</a></li>
                      <li className="tab"><a href="#tab-6">Inclusion/Exclusion</a></li>
                      <li className="tab"><a href="#tab-7">Eligibility</a></li>
                      <li className="tab"><a href="#tab-8">Policy</a></li>
                      <li className="tab"><a href="#tab-9">Things</a></li>
                      <li className="tab"><a href="#tab-10">Faq</a></li>
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
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Trek Name <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Trek Name"
                                name="trek_Name"
                                value={trek_Name}
                                onChange={(e) => handleTrekInputChange('trek_Name', e.target.value)}
                              />
                              {trekValidationErrors.trek_Name && (
                                <div className="text-danger">Trek name must be at least 3 and 30 characters long</div>
                              )}
                              <p className="valid">{msg}</p>
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">State <span className="text-danger">*</span></label>
                              <select
                                required
                                name="trek_state"
                                className="form-control f_one"
                                onChange={(e) => handleTrekInputChange('trek_state', e.target.value)}
                                value={trek_state}
                              >
                                <option value="">--Select State --</option>
                                {state_id.map((item) => (
                                  <option key={item.state_id} value={item.state_id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {trekValidationErrors.trek_state && (
                                <div className="text-danger">Please select a State</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Start Date <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="date"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Start Date"
                                name="start_date"
                                value={start_date}
                                min={today}
                                onChange={(e) => handleTrekInputChange('start_date', e.target.value)}
                              />
                              {trekValidationErrors.start_date && (
                                <div className="text-danger">Please select a Start Date</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">End Date <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="date"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="End Date"
                                name="end_date"
                                value={end_date}
                                min={start_date || today}
                                onChange={(e) => handleTrekInputChange('end_date', e.target.value)}
                              />
                              {trekValidationErrors.end_date && (
                                <div className="text-danger">Please select an End Date</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Price <span className="text-danger">*</span></label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Price"
                                name="price"
                                value={price}
                                onChange={(e) => handleTrekInputChange('price', e.target.value)}
                              />
                              {trekValidationErrors.price && (
                                <div className="text-danger">
                                  {trekValidationErrors.price}
                                </div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Trip Summary <span className="text-danger">*</span></label>
                              <ReactQuill
                                value={trip_summary}
                                onChange={(value) => handleTrekInputChange('trip_summary', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill f_one"
                              />
                              {trekValidationErrors.trip_summary && (
                                <div className="text-danger">Please provide a Trip Summary</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          <button type="button" className="P_btn" onClick={trekhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>

                    </div>
                    <div id="tab-2">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleFeaturesClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Altitude</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Altitude"
                                name="altitude"
                                value={altitude}
                                onChange={(e) => handleFeaturesInputChange('altitude', e.target.value)}
                              />
                              {featuresValidationErrors.altitude && (
                                <div className="text-danger">Please provide an Altitude</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Category Name</label>
                              <select
                                required
                                name="category_id"
                                className="form-control f_one"
                                value={category_id}
                                onChange={(e) => handleFeaturesInputChange('category_id', e.target.value)}
                              >
                                <option value="">--Select Category --</option>
                                {category.map((item) => (
                                  <option key={item.category_id} value={item.category_id}>
                                    {item.categoryName}
                                  </option>
                                ))}
                              </select>
                              {featuresValidationErrors.category_id && (
                                <div className="text-danger">Please select a Category Name</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Trailing Name</label>
                              <select
                                required
                                name="trailing_id"
                                className="form-control f_one"
                                value={trailing_id}
                                onChange={(e) => handleFeaturesInputChange('trailing_id', e.target.value)}
                              >
                                <option value="">--Select Trailing --</option>
                                {trailing.map((item) => (
                                  <option key={item.trailing_id} value={item.trailing_id}>
                                    {item.trailingName}
                                  </option>
                                ))}
                              </select>
                              {featuresValidationErrors.trailing_id && (
                                <div className="text-danger">Please select a Trailing Name</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Landscape Name</label>
                              <select
                                required
                                name="landscape_id"
                                className="form-control f_one"
                                value={landscape_id}
                                onChange={(e) => handleFeaturesInputChange('landscape_id', e.target.value)}
                              >
                                <option value="">--Select Landscape --</option>
                                {landscape.map((item) => (
                                  <option key={item.landscape_id} value={item.landscape_id}>
                                    {item.landscapeName}
                                  </option>
                                ))}
                              </select>
                              {featuresValidationErrors.landscape_id && (
                                <div className="text-danger">Please select a Landscape Name</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Day</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Day"
                                name="trek_day"
                                value={trek_day}
                                onChange={(e) => handleFeaturesInputChange('trek_day', e.target.value)}
                              />
                              {featuresValidationErrors.trek_day && (
                                <div className="text-danger">Please select a Day</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Distance</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Distance"
                                name="distance"
                                value={distance}
                                onChange={(e) => handleFeaturesInputChange('distance', e.target.value)}
                              />
                              {featuresValidationErrors.distance && (
                                <div className="text-danger">Please provide a Distance</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Waterbodies</label>
                              <select
                                required
                                name="waterbodies"
                                className="form-control f_one"
                                value={waterbodies}
                                onChange={(e) => handleFeaturesInputChange('waterbodies', e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {featuresValidationErrors.waterbodies && (
                                <div className="text-danger">Please select a Waterbodies option</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Level</label>
                              <select
                                required
                                name="level"
                                className="form-control f_one"
                                value={level}
                                onChange={(e) => handleFeaturesInputChange('level', e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="Easy">Easy</option>
                                <option value="Moderate">Moderate</option>
                                <option value="Difficult">Difficult</option>
                                <option value="Challenging">Challenging</option>
                              </select>
                              {featuresValidationErrors.level && (
                                <div className="text-danger">Please select a Level</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Toilet Tent</label>
                              <select
                                required
                                name="toilet_tent"
                                className="form-control f_one"
                                value={toilet_tent}
                                onChange={(e) => handleFeaturesInputChange('toilet_tent', e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {featuresValidationErrors.toilet_tent && (
                                <div className="text-danger">Please select a Toilet Tent option</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Stay</label>
                              <select
                                required
                                name="stay"
                                className="form-control f_one"
                                value={stay}
                                onChange={(e) => handleFeaturesInputChange('stay', e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {featuresValidationErrors.stay && (
                                <div className="text-danger">Please select a Stay option</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Ladies Only</label>
                              <select
                                required
                                name="ladies_only"
                                className="form-control f_one"
                                value={ladies_only}
                                onChange={(e) => handleFeaturesInputChange('ladies_only', e.target.value)}
                              >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </select>
                              {featuresValidationErrors.ladies_only && (
                                <div className="text-danger">Please select a Ladies Only option</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          <button type="button" className="P_btn" onClick={featureshandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="tab-3">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleLocationClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Location</label>
                              <PlacesAutocomplete
                                placeholder="location"
                                name="location"

                                value={location}
                                // onChange={(e) => setHospital_address(e.target.value)}
                                onChange={handleAddressChange}
                                onSelect={handleSelect}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your location...",
                                        className: "location-search-input form-control f_one",
                                      })}
                                      value={location}
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
                              {locationValidationErrors.location && (
                                <div className="text-danger">Please provide a Location</div>
                              )}

                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Start Point</label>
                              <PlacesAutocomplete
                                placeholder="start Point"
                                name="start_address"
                                value={start_address}
                                // onChange={(e) => setHospital_address(e.target.value)}
                                onChange={handleAddressChange1}
                                onSelect={handleSelect1}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your start address...",
                                        className: "location-search-input form-control f_one",
                                      })}
                                      value={start_address}
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
                              {locationValidationErrors.start_address && (
                                <div className="text-danger">Please provide a Start Address</div>
                              )}

                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">End Point</label>
                              <PlacesAutocomplete
                                placeholder="end point"
                                name="end_address"
                                value={end_address}
                                // onChange={(e) => setHospital_address(e.target.value)}
                                onChange={handleAddressChange2}
                                onSelect={handleSelect2}
                              >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Enter your End address...",
                                        className: "location-search-input form-control f_one",
                                      })}
                                      value={end_address}
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

                              {locationValidationErrors.end_address && (
                                <div className="text-danger">Please provide an End Address</div>
                              )}
                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>


                        </div>
                        <br></br>
                        <div className="text_right">


                          &nbsp;
                          <button type="button" className="P_btn" onClick={locationhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="tab-4">

                      <div>
                        <div class="row">
                          <div class="col-md-12">
                            <label htmlFor="exampleInputName1" className="l_one">File Upload</label>
                            <div {...getRootProps()} className="dropzone">
                              <input {...getInputProps()} />
                              <p className="drag">
                                Drag & drop some images here, or click to select images
                              </p>
                            </div>
                            {error && <div className="valid">{error}</div>}
                            <div className="selected-images-container">
                              {renderSelectedImages()}
                            </div>
                            <p className="valid">{imageError}</p>
                            <div className="selected-images-container">{renderGetImages()}</div>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">

                          {/* <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                            Previous
                          </button> */}
                          &nbsp;
                          <button type="button" className="P_btn" onClick={Imagehandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="tab-5">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleitineraryClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <label htmlFor="exampleInputName1" className="l_one">Itinerary</label>

                        <div className="row">
                          <div className="col-md-12">
                            <input type="button" id="addTab" value="Add Tab" onClick={handleAddTab} />
                            <div id="tabs">
                              <ul>
                                {sections.map((section, index) => (
                                  <li key={section.id} className="tab">
                                    <a href={`#tab-${section.id}`}>Section {section.id}</a>
                                    <span className="ui-icon ui-icon-close" role="presentation" onClick={() => handleRemoveTab(index)}>Remove Tab</span>
                                  </li>
                                ))}
                              </ul>
                              {sections.map((section, sectionIndex) => (
                                <div key={section.id} id={`tab-${section.id}`}>
                                  <div className="sectionTitle">
                                    {section.rows.map((row, rowIndex) => (
                                      <div key={rowIndex} className="row mb-6">
                                        <div className="col-md-3">
                                          <Form.Group>
                                            <label htmlFor="exampleInputName1" className="l_one">Icon Name</label>
                                            <div className="custom-dropdown" onClick={() => toggleDropdown(sectionIndex, rowIndex)}>
                                              <div className="selected-value f_one_Icon">
                                                {row.icon_id
                                                  ? Icon.find((item) => item.icon_id === row.icon_id)?.iconName
                                                  : '--Select Icon--'}
                                              </div>
                                              {isOpen && selectedSectionIndex === sectionIndex && selectedRowIndex === rowIndex && (
                                                <div className="options-list">
                                                  {Icon.map((item) => (
                                                    <div
                                                      key={item.icon_id}
                                                      className="option-item "
                                                      onClick={() => handleSelectIcon(item, sectionIndex, rowIndex)}
                                                    >
                                                      <img
                                                        src={`${process.env.REACT_APP_BACKEND_URL}/${item.icon_img}`}
                                                        alt={item.iconName}
                                                        style={{ width: 20, height: 20, marginRight: 10 }}
                                                      />
                                                      {item.iconName}
                                                    </div>
                                                  ))}
                                                </div>
                                              )}
                                            </div>
                                            {itineraryValidationErrors[sectionIndex]?.rows[rowIndex]?.icon_id && (
                                              <div className="text-danger">Please select an Icon Name</div>
                                            )}
                                          </Form.Group>
                                        </div>
                                        <div className="form-group col-md-3">
                                          <label className="mb-2 l_one">Name</label>
                                          <input
                                            type="text"
                                            name="day_name"
                                            className="form-control f_one"
                                            onChange={(e) => handleInputChange(e, sectionIndex, rowIndex)}
                                            value={row.day_name}
                                          />
                                          {itineraryValidationErrors[sectionIndex]?.rows[rowIndex]?.day_name && (
                                            <div className="text-danger">Please provide a Name</div>
                                          )}
                                        </div>
                                        <div className="form-group col-md-3">
                                          <label className="mb-2 l_one">Description</label>
                                          <input
                                            type="text"
                                            name="description"
                                            className="form-control f_one"
                                            onChange={(e) => handleInputChange(e, sectionIndex, rowIndex)}
                                            value={row.description}
                                          />
                                          {itineraryValidationErrors[sectionIndex]?.rows[rowIndex]?.description && (
                                            <div className="text-danger">Please provide a Description</div>
                                          )}
                                        </div>

                                        <div className="form-group col-md-2 mt-4">
                                          {rowIndex > 0 && (
                                            <button
                                              type="button"
                                              className="btn btn-danger"
                                              onClick={() => handleRemoveRow(sectionIndex, rowIndex)}
                                            >
                                              <img
                                                src={require("../../../assets/img/minus.png")}
                                                alt="Remove Icon"
                                                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                              />
                                              {/* <i className="remove mdi mdi-close-circle-outline check_one"></i> */}
                                            </button>
                                          )}
                                          {rowIndex === section.rows.length - 1 && (
                                            <button
                                              type="button"
                                              className="btn btn-success addit1"
                                              onClick={() => handleAddRow(sectionIndex)}
                                            >
                                              {/* <i className="mdi mdi-loupe check_one"></i> */}
                                              <img
                                                src={require("../../../assets/img/plus.png")} // Replace with your icon path
                                                alt="Add Icon"
                                                style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                              // className="imgBox"
                                              // style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                              />
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <br></br>
                      <div className="text_right">

                        {/* <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                          Previous
                        </button> */}
                        &nbsp;
                        <button type="button" className="P_btn" onClick={itineraryhandle}>
                          Save & Next
                        </button>
                      </div>
                    </div>
                    <div id="tab-6">
                      <div className="text_right">


                        <button type="button" className="av" onClick={handleInclusionClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Inclusion</label>
                              <br></br>
                              <ReactQuill
                                value={inclusion}
                                onChange={(value) => handleInclusionInputChange('inclusion', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {inclusionValidationErrors.inclusion && (
                                <div className="text-danger">Please provide an Inclusion</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Exclusion</label>
                              <br></br>
                              <ReactQuill
                                value={exclusion}
                                onChange={(value) => handleInclusionInputChange('exclusion', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {inclusionValidationErrors.exclusion && (
                                <div className="text-danger">Please provide an Exclusion</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Food Menu</label>
                              <br></br>
                              <ReactQuill
                                value={food_menu}
                                onChange={(value) => handleInclusionInputChange('food_menu', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {inclusionValidationErrors.food_menu && (
                                <div className="text-danger">Please provide a Food Menu</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          &nbsp;
                          <button type="button" className="P_btn" onClick={inclusionhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="tab-7">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleEligibilityClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Eligibility</label>
                              <br></br>
                              <ReactQuill
                                value={eligibility}
                                onChange={(value) => handleEligibilityInputChange('eligibility', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {eligibilityValidationErrors.eligibility && (
                                <div className="text-danger">Please provide an Eligibility</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Document</label>
                              <br></br>
                              <ReactQuill
                                value={document1}
                                onChange={(value) => handleEligibilityInputChange('document1', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {eligibilityValidationErrors.document1 && (
                                <div className="text-danger">Please provide a Document</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          &nbsp;
                          <button type="button" className="P_btn" onClick={eligibilityhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="tab-8">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handlePolicyClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Policy</label>
                              <br></br>
                              <ReactQuill
                                value={policy}
                                onChange={(value) => handlePolicyInputChange('policy', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {policyValidationErrors.policy && (
                                <div className="text-danger">Please provide a Policy</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          &nbsp;
                          <button type="button" className="P_btn" onClick={policyhandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="tab-9">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleThingsClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Basic Gear</label>
                              <br></br>
                              <ReactQuill
                                value={basic_gear}
                                onChange={(value) => handleThingsInputChange('basic_gear', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {thingsValidationErrors.basic_gear && (
                                <div className="text-danger">Please provide Basic Gear</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Clothing</label>
                              <br></br>
                              <ReactQuill
                                value={clothing}
                                onChange={(value) => handleThingsInputChange('clothing', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {thingsValidationErrors.clothing && (
                                <div className="text-danger">Please provide Clothing</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Head Gear</label>
                              <br></br>
                              <ReactQuill
                                value={head_gear}
                                onChange={(value) => handleThingsInputChange('head_gear', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {thingsValidationErrors.head_gear && (
                                <div className="text-danger">Please provide Head Gear</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Foot Gear</label>
                              <br></br>
                              <ReactQuill
                                value={foot_gear}
                                onChange={(value) => handleThingsInputChange('foot_gear', value)}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              {thingsValidationErrors.foot_gear && (
                                <div className="text-danger">Please provide Foot Gear</div>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                        <br></br>
                        <div className="text_right">
                          &nbsp;
                          <button type="button" className="P_btn" onClick={thingshandle}>
                            Save & Next
                          </button>
                        </div>
                      </div>
                    </div>

                    <div id="tab-10">
                      <div className="text_right">

                        <button type="button" className="av" onClick={handleFaqClear}>
                          Clear
                        </button>
                      </div>
                      <div>
                        {finalArrayData.map((x, i) => (
                          <div key={i}>
                            <div className="row mb-6">
                              <div className="form-group col-md-5">
                                <label className="mb-2 l_one">Question</label>
                                <input
                                  type="text"
                                  name="question"
                                  class="form-control f_one"
                                  onChange={(e) => faqHandleinputchange(e, i)}
                                  value={x.question}
                                />
                                {faqValidationErrors[i]?.question && (
                                  <div className="text-danger">Please provide a question</div>
                                )}
                              </div>
                              <div className="form-group col-md-5">
                                <label className="mb-2 l_one">Answer</label>
                                <textarea
                                  name="answer"
                                  class="form-control f_one"
                                  onChange={(e) => faqHandleinputchange(e, i)}
                                  value={x.answer}
                                />
                                {faqValidationErrors[i]?.answer && (
                                  <div className="text-danger">Please provide an answer</div>
                                )}
                              </div>
                              <div className="form-group col-md-2 mt-4">
                                {i !== 0 && (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => faqOnRemove(i)}
                                  >
                                    <img
                                      src={require("../../../assets/img/minus.png")}
                                      alt="Remove Icon"
                                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    />
                                    {/* <i className="remove mdi mdi-close-circle-outline check_one"></i> */}
                                  </button>
                                )}
                                {finalArrayData.length - 1 === i && (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={faqaddRow}
                                  >
                                    <img
                                      src={require("../../../assets/img/plus.png")} // Replace with your icon path
                                      alt="Add Icon"
                                      style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                    // className="imgBox"
                                    // style={{ width: "60px", height: "60px", cursor: "pointer" }}
                                    />
                                    {/* <i className="mdi mdi-loupe check_one"></i> */}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <br></br>

                      <div className="text_right">
                        <button type="button" className="P_btn" onClick={fcqhandle}>
                          Create Trek
                        </button>
                      </div>
                      <br />
                      <div className="text_right">
                        <button className="btn btn-secondary" onClick={previes}>
                          Cancel
                        </button>
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

export default TrekdataAddForm;
