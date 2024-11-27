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
const ItineraryAddForm = () => {
  const navigate = useNavigate();

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
  const [sections, setSections] = useState([{ id: 1, rows: [{ icon_id: "", day_name: "1", description: "1" }] }]);
  const [validated, setValidated] = useState(false);
  const [start_date, setStart_date] = useState("");
  const [end_date, setEnd_date] = useState("");

  const [ladies_only, setLadies_only] = useState("");
  const [waterbodies, setWaterbodies] = useState("");

  const [trip_summary, setTrip_summary] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [updatedImages, setUpdatedImages] = useState([]);
  const [state_id, setStateId] = useState([]);
  const [trek_state, setTrek_state] = useState("");
  const [level, setLevel] = useState("");
  let Intoken = JSON.parse(localStorage.getItem('data'));
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
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

  const handleInputChange = (e, sectionIndex, rowIndex) => {
    const { name, value } = e.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows[rowIndex][name] = value;
    setSections(updatedSections);
  };

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
      console.log("State data", getres);
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
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange = (newAddress) => {
    setLocation(newAddress);
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
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange1 = (newAddress) => {
    setStart_address(newAddress);
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
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange2 = (newAddress) => {
    setEnd_address(newAddress);
  };


  const quillModules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"], // Bold, Italic, Underline, Strikethrough
      [{ list: "ordered" }, { list: "bullet" }], // Numbered list, Bullet points
    ],
  };

  const addData = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Custom validation logic
    if ((trek_Name || trek_state || start_date || end_date || price || trip_summary) &&
      (!trek_Name || !trek_state || !start_date || !end_date || !price || !trip_summary)) {
      event.preventDefault();
      event.stopPropagation();
      alert("All fields in Basic are required.");
      return;
    }

    if ((altitude || category_id || trailing_id || landscape_id || trek_day || distance || waterbodies || level || toilet_tent || stay || ladies_only) &&
      (!altitude || !category_id || !trailing_id || !landscape_id || !trek_day || !distance || !waterbodies || !level || !toilet_tent || !stay || !ladies_only)) {
      event.preventDefault();
      event.stopPropagation();
      alert("All fields in Features are required.");
      return;
    }

    if ((location || start_address || end_address) &&
      (!location || !start_address || !end_address)) {
      event.preventDefault();
      event.stopPropagation();
      alert("All fields in Location are required.");
      return;
    }
    if ((sections) &&
      (!sections)) {
      event.preventDefault();
      event.stopPropagation();
      alert("All fields in Itinerary are required.");
      return;
    }

    else {

      const fromData = new FormData();

      for (let i = 0; i < image.length; i++) {
        fromData.append('image', image[i]);
      }
      const resp = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/Trek/oneUrl`,
        fromData,
      );
      var add1_img = resp.data.images;
      image = add1_img;

      dynamicDataChange()
    }
    setValidated(true);
  };

  const dynamicDataChange = async (images) => {
    try {

      const itineraryData = sections.map(section => ({
        section_id: section.id,
        rows: section.rows.map(row => ({
          icon_id: row.icon_id,
          day_name: row.day_name,
          description: row.description
        }))
      }));

      const fromData = new FormData();
      fromData.append("trek_Name", trek_Name);
      fromData.append("location", location);
      fromData.append("loc_lat", loc_lat);
      fromData.append("loc_long", loc_long);
      fromData.append("start_address", start_address);
      fromData.append("start_lat", start_lat);
      fromData.append("start_long", start_long);
      fromData.append("end_address", end_address);
      fromData.append("end_lat", end_lat);
      fromData.append("end_long", end_long);
      fromData.append("trek_day", trek_day);
      fromData.append("start_date", start_date);
      fromData.append("end_date", end_date);
      fromData.append("distance", distance);
      fromData.append("category_id", category_id);
      fromData.append("landscape_id", landscape_id);
      fromData.append("trailing_id", trailing_id);
      fromData.append("price", price);
      fromData.append("altitude", altitude);
      fromData.append("toilet_tent", toilet_tent);
      fromData.append("stay", stay);
      fromData.append("waterbodies", waterbodies);
      fromData.append("ladies_only", ladies_only);
      fromData.append("trek_state", trek_state);
      fromData.append("level", level);
      fromData.append("trip_summary", trip_summary);
      fromData.append("trek_img", image);
      // return


      const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Trek/addtrek`, fromData,
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken} `,
          },
        });
      console.log(data, "data added");

      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Itinerary/addItinerary`, {
        sections: itineraryData
      },
        {
          headers: {
            Authorization: `Bearer ${Intoken.accessToken} `,
          },
        });

      navigate("/admin/trek/trekdataTable");

    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        // console.log(alert(msg));
        // alert(msg)
      }
    }

    //  console.log("agentaddd",agentaddd)
  }

  useEffect(() => {
    $(function () {
      $("#tabs1").tabs();
    });
  }, []);

  const handleNext = () => {
    if (currentTab < 4) {
      setCurrentTab(currentTab + 1);
      $("#tabs1").tabs("option", "active", currentTab + 1);
    }
  };
  const handlePreview = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1);
      $("#tabs1").tabs("option", "active", currentTab - 1);
    }
  };

  const previes = () => {
    navigate("/admin/trek/trekdataTable");
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
              onSubmit={addData}>
              <div className="row">
                <div className="col-md-12">
                  <div id="tabs1">
                    <ul>
                      <li className="tab"><a href="#tab-1">Basic</a></li>
                      <li className="tab"><a href="#tab-2">Features</a></li>
                      <li className="tab"><a href="#tab-3">Location</a></li>
                      <li className="tab"><a href="#tab-4">Image</a></li>
                      <li className="tab"><a href="#tab-5">Itinerary</a></li>
                    </ul>
                    <div id="tab-1">
                      <div>
                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Trek Name</label>
                              <Form.Control
                                required
                                type="text"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Trek Name"
                                name="trek_Name"
                                value={trek_Name}
                                onChange={(e) => setTrek_Name(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a Trek Name
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> State</label>

                              <select
                                required
                                name="trek_state"
                                className="form-control "
                                onChange={(e) => setTrek_state(e.target.value)}
                                value={trek_state}
                              >
                                <option value="">--Selact State --</option>
                                {state_id.map((item) => (
                                  <option key={item.state_id} value={item.state_id}>
                                    {" "}
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a State
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Start Date</label>
                              <Form.Control
                                required
                                type="date"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Start Date"
                                name="start_date"
                                value={start_date}
                                onChange={(e) => setStart_date(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Start Date
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">End Date</label>
                              <Form.Control
                                required
                                type="date"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="End Date"
                                name="end_date"
                                value={end_date}
                                onChange={(e) => setEnd_date(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a End Date
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Price</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="price "
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a Price
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>



                        </div>

                        <div class="row">
                          <div class="col-md-12">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Trip Summary</label>
                              <ReactQuill
                                value={trip_summary}
                                onChange={setTrip_summary}
                                modules={quillModules}
                                theme="snow"
                                className="resizable-quill"
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a Trip summary
                              </Form.Control.Feedback>

                            </Form.Group>
                          </div>
                        </div>

                        <div className="text_right">

                          <button type="button" className="btn btn-secondary" onClick={handlePreview}>
                            Preview
                          </button>

                          <button type="button" className="btn btn-secondary" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>

                    </div>
                    <div id="tab-2">
                      <div>
                        <div class="row">


                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Altitude</label>
                              <Form.Control
                                required
                                type="number"
                                className="form-control f_one"
                                id="exampleInputName1"
                                placeholder="Altitude "
                                name="altitude"
                                value={altitude}
                                onChange={(e) => setAltitude(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a Altitude
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> Category Name </label>

                              <select
                                required
                                name="category_id"
                                className="form-control"
                                value={category_id}
                                onChange={(e) => setCategory_id(e.target.value)}
                              >
                                <option value="">--Select Category --</option>
                                {category.map((item) => (
                                  <option key={item.category_id} value={item.category_id}>
                                    {" "}
                                    {item.categoryName}
                                  </option>
                                ))}
                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Category Name
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> Trailing Name </label>

                              <select
                                required
                                name="trailing_id"
                                className="form-control"
                                value={trailing_id}
                                onChange={(e) => setTrailing_id(e.target.value)}
                              >
                                <option value="">--Select Trailing --</option>
                                {trailing.map((item) => (
                                  <option key={item.trailing_id} value={item.trailing_id}>
                                    {" "}
                                    {item.trailingName}
                                  </option>
                                ))}
                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Trailing Name
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one"> Landscape Name </label>

                              <select
                                required
                                name="landscape_id"
                                className="form-control"
                                value={landscape_id}
                                onChange={(e) => setLandscape_id(e.target.value)}
                              >
                                <option value="">--Select Landscape --</option>
                                {landscape.map((item) => (
                                  <option key={item.landscape_id} value={item.landscape_id}>
                                    {" "}
                                    {item.landscapeName}
                                  </option>
                                ))}
                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Landscape Name
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-6">
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
                                onChange={(e) => setTrek_day(e.target.value)}
                              />
                              {/* list="dayOptions" */}
                              {/* <datalist id="dayOptions">
<option value="6D/5N" />
<option value="5D/4N" />
</datalist> */}


                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Day
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                          <div class="col-md-6">
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
                                onChange={(e) => setdistance(e.target.value)}
                              />

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a Distance
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Waterbodies</label>
                              <select
                                required
                                placeholder="Waterbodies "
                                name="waterbodies"
                                value={waterbodies}
                                onChange={(e) => setWaterbodies(e.target.value)}

                                class="form-control"
                                id="exampleInputPassword1"
                              >
                                <option value=""> Select</option>
                                <option value="1"> Yes</option>
                                <option value="2"> No </option>

                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a waterbodies
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Level</label>
                              <select
                                required
                                placeholder="Level "
                                name="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                class="form-control"
                                id="exampleInputPassword1"
                              >
                                <option value=""> Select</option>
                                <option value="1"> Easy</option>
                                <option value="2"> Moderate </option>
                                <option value="3"> Difficult </option>
                                <option value="4"> Challenging </option>

                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Level
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>


                        </div>

                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">Toilet Tent</label>
                              <select
                                required
                                placeholder="Toilet tent "
                                name="toilet_tent"
                                value={toilet_tent}
                                onChange={(e) => setToilet_tent(e.target.value)}

                                class="form-control"
                                id="exampleInputPassword1"
                              >
                                <option value=""> Select</option>
                                <option value="1"> Yes</option>
                                <option value="2"> No </option>

                              </select>

                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Toilet tent
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">
                                Stay
                              </label>
                              <select
                                required
                                placeholder="stay "
                                name="stay"
                                value={stay}
                                onChange={(e) => setStay(e.target.value)}
                                class="form-control"
                                id="exampleInputPassword1"
                              >
                                <option value=""> Select</option>
                                <option value="1"> Yes</option>
                                <option value="2"> No </option>

                              </select>
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Stay
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleInputName1" className="l_one">
                                Ladies Only
                              </label>
                              <select
                                required
                                placeholder="Ladies only "
                                name="ladies_only"
                                value={ladies_only}
                                onChange={(e) => setLadies_only(e.target.value)}
                                class="form-control"
                                id="exampleInputPassword1"
                              >
                                <option value=""> Select</option>
                                <option value="1"> Yes</option>
                                <option value="2"> No </option>

                              </select>
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please select a Ladies only
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>

                        <div className="text_right">
                          <button type="button" className="btn btn-secondary" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>


                    </div>
                    <div id="tab-3">
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


                            </Form.Group>
                          </div>
                          <div className="map" id="gmp-map" hidden></div>


                        </div>
                        <div className="text_right">

                          <button type="button" className="btn btn-secondary" onClick={handlePreview}>
                            Preview
                          </button>

                          <button type="button" className="btn btn-secondary" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="tab-4">
                      <div>
                        <div class="row">
                          <div class="col-md-12">
                            <label htmlFor="exampleInputName1" className="l_one">File Upload</label>

                            <input
                              type="file"
                              className="form-control visibility-hidden f_two"
                              // id="customFileLang"
                              lang="es"
                              name="image1"
                              multiple
                              onChange={(e) => setimage(e.target.files)}
                            />


                          </div>
                        </div>


                        <div className="text_right">

                          <button type="button" className="btn btn-secondary" onClick={handlePreview}>
                            Preview
                          </button>

                          <button type="button" className="btn btn-secondary" onClick={handleNext}>
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div id="tab-5">
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
                        <div className="selected-value">
                          {row.icon_id
                            ? Icon.find((item) => item.icon_id === row.icon_id)?.iconName
                            : '--Select Icon--'}
                        </div>
                        {isOpen && selectedSectionIndex === sectionIndex && selectedRowIndex === rowIndex && (
                          <div className="options-list">
                            {Icon.map((item) => (
                              <div
                                key={item.icon_id}
                                className="option-item"
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
                      <Form.Control.Feedback type="invalid">
                        Please select an Icon Name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="form-group col-md-2 mt-4">
                    {rowIndex > 0 && (
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleRemoveRow(sectionIndex, rowIndex)}
                      >
                        <i className="remove mdi mdi-close-circle-outline check_one"></i>
                      </button>
                    )}
                    {rowIndex === section.rows.length - 1 && (
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleAddRow(sectionIndex)}
                      >
                        <i className="mdi mdi-loupe check_one"></i>
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
                  <div className="text_right">

                    <button type="button" className="btn btn-secondary" onClick={handlePreview}>
                      Preview
                    </button>


                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="text_right">
          <button className=" btn btn-secondary" onClick={previes}>
            Cancel
          </button>
          <button type="submit" className=" abbtn btn btn-gradient-primary ">
            Submit
          </button>
        </div>
      </Form>
    </div >
        </div >
      </div >
    </>
  );
};

export default ItineraryAddForm;
