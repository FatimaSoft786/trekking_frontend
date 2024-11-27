import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import $ from 'jquery';
import "jquery-ui/ui/widgets/tabs";
import { useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Admin from "../../../layouts/Admin.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Button from "react-bootstrap/Button";

const TrekdataUpdateForm = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [category, setCategory] = useState([]);
  const [category_id, setCategory_id] = useState("");
  const [landscape, setLandscape] = useState([]);
  const [landscape_id, setLandscape_id] = useState("");
  const [trailing, setTrailing] = useState([]);
  const [trailing_id, setTrailing_id] = useState("");
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
  const [trek_day, setTrek_day] = useState("");
  const [start_date, setStart_date] = useState("");
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  const [end_date, setEnd_date] = useState("");
  const [distance, setdistance] = useState("");
  const [price, setPrice] = useState("")
  const [altitude, setAltitude] = useState("");
  const [toilet_tent, setToilet_tent] = useState("");
  const [stay, setStay] = useState("");
  const [ladies_only, setLadies_only] = useState("");
  const [waterbodies, setWaterbodies] = useState("");
  const [level, setLevel] = useState("");
  const [trip_summary, setTrip_summary] = useState("");
  const [status, setStatus] = useState("");

  const [inclusion, setInclusion] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [food_menu, setFood_menu] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [document1, setDocument] = useState("");
  const [policy, setPolicy] = useState("");
  const [basic_gear, setBasic_gear] = useState("");
  const [clothing, setClothing] = useState("");
  const [head_gear, setHead_gear] = useState("");
  const [foot_gear, setFoot_gear] = useState("");


  const [trek_img, setTrek_img] = useState("");
  const [validated, setValidated] = useState(false);
  const [state_id, setStateId] = useState([]);
  const [trek_state, setTrek_state] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageError, setImageError] = useState("");
  const [updatedImages, setUpdatedImages] = useState([]);
  const [updatedImgName1, setupdatedImgName1] = useState("");
  const [hospitalExists, setHospitalExists] = useState([]);
  const [Icon, setIcon] = useState([]);
  const [sections, setSections] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [error, setError] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    refreshToken();
    //faqItemDataChange();
    //getItineraryById();
  }, [id]);

  let data = JSON.parse(localStorage.getItem("data"));
  const refreshToken = () => {
    setToken(data.accessToken);
  };

  // Category get -----------------------------------

  useEffect(() => {
    const getCategory = async () => {
      const CategoryData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Category/allCategory`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      // console.log("CategoryData=======>",CategoryData)

      const getres = await CategoryData.data.allCategory;

      if (getres) {
        var getresarr = [];
        getres.map((item) => {
          if (item.categoryStatus == "Active") {
            getresarr.push(item);
          }
        });
        setCategory(getresarr);
      } else {
        setCategory(getres);
      }
      // setCategory(getres1)
    };
    getCategory();
  }, []);

  // landscape_id get -----------------------------------
  useEffect(() => {
    const getLandscape = async () => {
      const LandscapeData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Landscape/allLandscape`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      // console.log("CategoryData=======>",CategoryData)

      const getres = await LandscapeData.data.allLandscape;

      if (getres) {
        var getresarr = [];
        getres.map((item) => {
          if (item.landscapeStatus == "Active") {
            getresarr.push(item);
          }
        });
        setLandscape(getresarr);
      } else {
        setLandscape(getres);
      }
      // setCategory(getres1)
    };
    getLandscape();
  }, []);

  // trailing_id get -----------------------------------
  useEffect(() => {
    const getLandscape = async () => {
      const TrailingData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Trailing/allTrailing`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      // console.log("CategoryData=======>",CategoryData)
      console.log(TrailingData)
      const getres = await TrailingData.data.alltrailing;

      if (getres) {
        var getresarr = [];
        getres.map((item) => {
          if (item.trailingStatus == "Active") {
            getresarr.push(item);
          }
        });
        setTrailing(getresarr);
      } else {
        setTrailing(getres);
      }
      // setCategory(getres1)
    };
    getLandscape();
  }, []);


  // / state get -------------------------->
  useEffect(() => {
    const getState = async () => {
      const StateData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/State/allState`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
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


  // Fetch icons data
  useEffect(() => {
    const getIcon = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Icon/allIcon`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      const icons = response.data.allIcon.filter(icon => icon.iconStatus === "Active");
      setIcon(icons);
    };
    getIcon();
  }, [data.accessToken]);

  const getItineraryById = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Itinerary/oneItinerary/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );

      const itinerary = response.data.result;

      if (itinerary) {
        // Set sections with mapped data
        setSections(itinerary.sections.map((section, index) => ({ ...section, id: index + 1 })));

        // Refresh tabs and set the first tab as active after a short delay
        setTimeout(() => {
          $("#tabs").tabs("refresh");
          $("#tabs").tabs("option", "active", 0);  // Set the first tab as active
        }, 0);
      } else {
        console.log("No itinerary data found for the given ID.");
      }
    } catch (error) {
      console.log("Error fetching itinerary data:", error);
    }
  };


  useEffect(() => {
    $(function () {
      $("#tabs").tabs();
    });
  }, [sections]);

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
    const updatedSections = [...sections];
    updatedSections[sectionIndex].rows[rowIndex].IconName = '';
    setSections(updatedSections);
    setSelectedSectionIndex(sectionIndex);
    setSelectedRowIndex(rowIndex);
    setIsOpen(!isOpen);
  };



  const TrekUpdateData = async () => {
    const data = {
      "trek_Name": trek_Name,
      "start_date": start_date,
     "end_date": end_date,
     "price": price,
     "trek_state": trek_state,
     "trip_summary": trip_summary
    }

   
    const resp = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Trek/updateTrek/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      }
    );
  }

  const FeaturesUpdateData = async () => {
    const fecturesUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateFeatures/${id}`, {
      category_id: category_id,
      landscape_id: landscape_id,
      trailing_id: trailing_id,
      altitude: altitude,
      trek_day: trek_day,
      distance: distance,
      level: level,
      stay: stay,
      toilet_tent: toilet_tent,
      waterbodies: waterbodies,
      ladies_only: ladies_only,
    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });
  }
  const LocationUpdateData = async () => {
    const locationUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateLocation/${id}`, {
      location: location,
      loc_lat: loc_lat,
      loc_long: loc_long,
      start_address: start_address,
      start_lat: start_lat,
      start_long: start_long,
      end_address: end_address,
      end_lat: end_lat,
      end_long: end_long,
    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });
  }
  const ImageUpdateData = async () => {
    const formData = new FormData();
    selectedImages.forEach((img) => {
      formData.append("image", img);
    });

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/Trek/oneUrl`,
      formData
    );
    const images = response.data.images;

    if (updatedImgName1) {
      const updatedImagesCopy = updatedImages.map((url) => removeBaseUrl(url));

      // Combine arrays and remove any falsey values (like empty strings) to avoid unnecessary commas
      const newConcatenatedImages = [...updatedImagesCopy, ...images].filter(Boolean);

      const imageUpdateResponse = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/Trek/updateImages/${id}`,
        {
          trek_img: newConcatenatedImages.join(','),
        },
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
    }
    else {
      const updatedImagesCopy = updatedImages.map((url) => removeBaseUrl(url));

      // Combine arrays and remove any falsey values (like empty strings) to avoid unnecessary commas
      const newConcatenatedImages = [...updatedImagesCopy, ...images].filter(Boolean);

      const imageUpdateResponse = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/Images/updateImages/${id}`,
        {
          trek_img: newConcatenatedImages.join(','),
        },
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
    }
  };

  const ItineraryUpdateData = async () => {
    const itineraryData = sections.map(section => ({
      section_id: section.id,
      rows: section.rows.map(row => ({
        icon_id: parseInt(row.icon_id, 10),
        day_name: row.day_name,
        description: row.description
      }))
    }));

    const ItineraryUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateItinerary/${id}`, {
      sections: itineraryData
    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });
  }
  const InclusionUpdateData = async () => {
    const InclusionUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateInclusion/${id}`, {
      inclusion: inclusion,
      exclusion: exclusion,
      food_menu: food_menu
    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });
  }
  const EligibilityUpdateData = async () => {
    const eligibilityUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateEligibility/${id}`, {
      eligibility: eligibility,
      document: document1
    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });
  }
  const PolicyUpdateData = async () => {
    const policyUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updatePolicy/${id}`, {
      policy: policy

    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });

  }
  const ThingsUpdateData = async () => {
    const thingsUpdateData = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Trek/updateThings/${id}`, {
      basic_gear: basic_gear,
      clothing: clothing,
      head_gear: head_gear,
      foot_gear: foot_gear,

    },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      });

  }
  const FaqUpdateData = async () => {
    

    axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Trek/updateFaqData/${id}`,
      {
        finalArrayData: finalArrayData,
      },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    navigate("/admin/trek/trekdataTable");
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


    await TrekUpdateData();
    // await ImageUpdateData();
    handleNext();

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
      [field]: !value,
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
// const locationRegex = /^[a-zA-Z0-9\s,.-]*$/;
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
  const [imageValidationErrors, setImageValidationErrors] = useState({
    trek_img: false,

  });
  const Imagehandle = (event) => {
    event.preventDefault();

    const errors = {
      trek_img: selectedImages.length === 0, // Check if there are no selected images
    };

    setImageValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    //ImageUpdateData();
    handleNext();
  };

  //  const Imagehandle = () => {
  //     if (updatedImgName1 === "") {
  //      setImageError("Please select at least one image.");
  //      return;
  //     }
  //     ImageUpdateData();
  //     handleNext();
  //   };

  const handleImageInputChange = (name, value) => {
    if (name === 'updatedImgName1') {
      setupdatedImgName1(value);
    }

    setImageValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
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




  // Location Address Field

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

  // bullet point peragraph
  const quillModules = {
    toolbar: [
      // [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline"], // Bold, Italic, Underline, Strikethrough
      [{ list: "ordered" }, { list: "bullet" }], // Numbered list, Bullet points
    ],
  };

  // const quillModules = {
  //   toolbar: [
  //     [{ header: [1, 2, 3, false] }],
  //     ['bold', 'italic', 'underline', 'strike'], // Bold, Italic, Underline, Strikethrough
  //     [{ list: 'ordered' }, { list: 'bullet' }], // Numbered list, Bullet points
  //     [{ indent: '-1' }, { indent: '+1' }], // Indent, Outdent
  //     [{ align: [] }], // Alignment
  //     ['link', 'image'], // Link, Image
  //     ['blockquote', 'code-block'], // Blockquote, Code Block
  //     [{ color: [] }, { background: [] }], // Text and Background Color
  //     [{ font: [] }], // Font
  //     [{ size: ['small', 'medium', 'large', 'huge'] }], // Font Size
  //     ['clean'] // Clean Formatting
  //   ]
  // };


  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Trek/trekOne/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log("getbyidTrek===>>", response);
      setTrek_Name(response.data.data.trek_Name);
      setStart_date(response.data.data.start_date);
      setEnd_date(response.data.data.end_date);
      setPrice(response.data.data.price);
      setTrip_summary(response.data.data.trip_summary);
      setTrek_state(response.data.data.trek_state);
      setStatus(response.data.data.status);
      setAltitude(response.data.data.altitude)
      setTrek_day(response.data.data.trek_day)
      setdistance(response.data.data.distance)
      setToilet_tent(response.data.data.toilet_tent)
       setStay(response.data.data.stay)
       setWaterbodies(response.data.data.waterbodies)
       setLadies_only(response.data.data.ladies_only)
       setLevel(response.data.data.level)
       setimage(response.data.data.trek_img)
       setLocation(response.data.data.location);
       setLoc_late(response.data.data.loc_lat);
       setLoc_long(response.data.data.loc_long);
       setStart_address(response.data.data.start_address);
       setStart_lat(response.data.data.start_lat);
       setStart_long(response.data.data.start_long);
       setEnd_address(response.data.data.end_address);
       setEnd_lat(response.data.data.end_lat);
       setEnd_long(response.data.data.end_long);
       setInclusion(response.data.data.inclusion);
       setExclusion(response.data.data.exclusion);
       setFood_menu(response.data.data.food_menu);
       setSections(response.data.data.sections.map((section, index) => ({ ...section, id: index + 1 })));
       setFinalArrayData(response.data.data.finalArrayData.map((section, index) => ({ ...section, id: index + 1 })))
       setTimeout(() => {
         $("#tabs").tabs("refresh");
         $("#tabs").tabs("option", "active", 0);  // Set the first tab as active
       }, 0);
       setEligibility(response.data.data.eligibility);
      setDocument(response.data.data.document);
      setPolicy(response.data.data.policy);
      setBasic_gear(response.data.data.basic_gear);
      setClothing(response.data.data.clothing);
      setHead_gear(response.data.data.head_gear);
      setFoot_gear(response.data.data.foot_gear);
       
       
      
    };
    getProductById();
  }, [id]);

  // useEffect(() => {
  //   const getProductById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/Images/oneImages/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${data.accessToken}`,
  //           },
  //         }
  //       );

  //       const trekImgString = response.data?.data?.trek_img?.trim() || "";

  //       // Remove leading comma if it exists
  //       const cleanedTrekImgString = trekImgString.startsWith(",")
  //         ? trekImgString.slice(1)
  //         : trekImgString;

  //       setimage(cleanedTrekImgString);
  //       setupdatedImgName1(response.data.data);

  //       const newData = cleanedTrekImgString.split(",");

  //       const filteredImages = newData
  //         .filter((url) => url.trim() !== "/Images/blankUser.png" && url.trim() !== "")
  //         .map((url) => `${process.env.REACT_APP_BACKEND_URL}/${url}`);

  //       setUpdatedImages(filteredImages);
  //       setSelectedImages(filteredImages);

  //       // Clear the validation error even if the image string is empty
  //       setImageValidationErrors((prevErrors) => ({
  //         ...prevErrors,
  //         trek_img: false,
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching product by ID:", error);
  //       // You can handle any additional error scenarios here if needed
  //     }
  //   };

  //   getProductById();
  // }, [id]);





  // useEffect(() => {
  //   const getLocationById = async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/Location/oneLocation/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${data.accessToken}`,
  //         },
  //       }
  //     );
  //     console.log("getbyidTrek===>>", response);
  //     setLocation(response.data.getById?.location);
  //     setLoc_late(response.data.getById?.loc_lat);
  //     setLoc_long(response.data.getById?.loc_long);
  //     setStart_address(response.data.getById?.start_address);
  //     setStart_lat(response.data.getById?.start_lat);
  //     setStart_long(response.data.getById?.start_long);
  //     setEnd_address(response.data.getById?.end_address);
  //     setEnd_lat(response.data.getById?.end_lat);
  //     setEnd_long(response.data.getById?.end_long);
  //   };
  //   getLocationById();
  // }, [id]);

  // Inclustion by id apis
  // useEffect(() => {
  //   const getInclusionById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BACKEND_URL}/Inclusion/oneInclusion/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${data.accessToken}`,
  //           },
  //         }
  //       );
  //       console.log("getbyidTrek===>>", response);

  //       // Destructure response.data.getById with optional chaining
  //       const { inclusion, exclusion, food_menu } = response.data.getById ?? {};

  //       // Set state only if the values are defined
  //       if (inclusion !== undefined) {
  //         setInclusion(inclusion);
  //       }
  //       if (exclusion !== undefined) {
  //         setExclusion(exclusion);
  //       }
  //       if (food_menu !== undefined) {
  //         setFood_menu(food_menu);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   getInclusionById();
  // }, [id]);



  // Eligibility get by id apis
  useEffect(() => {
    const geteligibilityById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Eligibility/oneEligibility/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log("getbyidTrek===>>", response);
      setEligibility(response.data.getById?.eligibility);
      setDocument(response.data.getById?.document);
    };
    // geteligibilityById();
  }, [id]);

  // Policy get by id apis
  useEffect(() => {
    const getpolicyById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Policy/onePolicy/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log("getbyidTrek===>>", response);
      setPolicy(response.data.getById?.policy);

    };
    // getpolicyById();
  }, [id]);


  // Things get by id apis
  useEffect(() => {
    const getThingsById = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/Things/oneThings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          }
        );
        console.log("getbyidTrek===>>", response);

        const getById = response.data.getById;
        if (getById) {
          setBasic_gear(getById?.basic_gear);
          setClothing(getById?.clothing);
          setHead_gear(getById?.head_gear);
          setFoot_gear(getById?.foot_gear);
        } else {
          // console("No data found for the given ID.");
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
  //  getThingsById();
  }, [id]);


  useEffect(() => {
    $(function () {
      const $tabs = $("#tabs1").tabs({
        activate: function (event, ui) {
          const newIndex = $tabs.tabs("option", "active");
          setCurrentTab(newIndex);
        }
      });
    });
  }, []);

  const handleNext = () => {
    const $tabs = $("#tabs1");
    if (currentTab < 10) {
      // Set the next tab as active
      $tabs.tabs("option", "active", currentTab + 1);
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



  // const onDrop = (acceptedFiles) => {
  //   setError(null); // Clear any previous errors

  //   acceptedFiles.forEach((file) => {
  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);
  //     img.onload = () => {
  //       if (img.width !== 360 || img.height !== 350) {
  //         setError(`Image dimensions must be 360x350. The selected image is ${img.width}x${img.height}.`);
  //       } else {
  //         const newSelected = [...selectedImages, ...acceptedFiles];
  //         setSelectedImages(newSelected);
  //       }
  //     };
  //   });
  // };


  // const onDrop = (acceptedFiles) => {
  //   // Update the state with the selected images
  //   const newSelacted = [...selectedImages, ...acceptedFiles];
  //   setSelectedImages(newSelacted);
  // };

  const onDrop = (acceptedFiles) => {
    setError(null); // Clear any previous errors
  
    const resizedImages = [];
  
    acceptedFiles.forEach((file) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
  
      img.onload = () => {
        // Create a canvas to resize the image
        const canvas = document.createElement('canvas');
        canvas.width = 360;
        canvas.height = 350;
        const ctx = canvas.getContext('2d');
  
        // Draw the image onto the canvas with the desired size
        ctx.drawImage(img, 0, 0, 360, 350);
  
        // Convert the canvas content back to a blob and create a new file
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          });
  
          // Add the resized image to the array
          resizedImages.push(resizedFile);
  
          // When all files are processed, update the selected images state
          if (resizedImages.length === acceptedFiles.length) {
            const newSelected = [...selectedImages, ...resizedImages];
            setSelectedImages(newSelected);
          }
        }, file.type);
      };
    });
  };
  
  

  const [finalArrayData, setFinalArrayData] = useState([
    {
      question: "",
      answer: "",
      check_status: "1",
    },
  ]);

  const faqHandleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...finalArrayData];
    list[index][name] = value;
    setFinalArrayData(list);
    // alert(value)
    console.log(list, "list");
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
        check_status: "1",
      },
    ]);
  };


  const faqItemDataChange = async () => {
    const abc = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/Faq/oneFaqData/${id}`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );

    let newArr = [];
    for (let i = 0; i < abc.data.data.length; i++) {
      newArr.push(abc.data.data[i]);
    }
    setFinalArrayData(newArr, ...finalArrayData);
  };

  const faqDynamicDataChange = (id) => {
    for (var i = 0; i < finalArrayData.length; i++) {
      finalArrayData[i]["trek_id"] = id;
    }

    axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Faq/updateFaqData/${id}`,
      {
        finalArrayData: finalArrayData,
      },
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
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
    return selectedImages.map((file, index) => {
      if (!file || !(file instanceof File) || selectedImages.length === 0) {
        return null; // Skip rendering if the image is not valid
      }

      return (
        <div key={index} className="selected-image">
          <div className="image-container">
            <img
              src={URL.createObjectURL(file)}
              alt={`Selected Image ${index}`}
            />
            <button
              className="btn btn-danger remove-button"
              onClick={() => handleImageRemoval(index, false)} // Pass false to indicate it's a selected image
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      );
    });
  };


  const renderGetImages = () => {
    if (updatedImages.length === 0) {
      return null; // or return <p>No images available</p>;
    }

    return updatedImages.map((file, index) => {
      if (!file || file === 'http://localhost:8080/' || file === 'http://3.208.52.220:6456/') {
        return null; // Skip rendering if the image src is blank
      }

      return (
        <div key={index} className="selected-image">
          <div className="image-container">
            <img src={file} alt={`Selected Image ${index}`} />
            <button
              className="btn btn-danger remove-button"
              onClick={() => handleImageRemoval(index, true)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      );
    });
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
        check_status: "1",
      },
    ]);

  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };


  const deleteConfirmed = async () => {
    console.log(id)
    // var deleteTrek = await axios.delete(
    //   `${process.env.REACT_APP_BACKEND_URL}/Trek/DeleteTrek/${id}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // navigate("/admin/trek/trekdataTable");
  };

  const deleteuser = (id) => {
    // setSelectedUserId(id);
    toggleDeleteModal(); // Open the delete confirmation modal
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
            <div class="table2_b"> Update Data </div>
          </div>
          <div className="card-body card_b1">
            {/* <p className="card-description"> Basic form elements </p> */}
            {/* <Form className="forms-sample"> */}

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
                      {status && (status === "Active" || status === "InActive") && (
                        status === "Active" ? (
                          <button
                            type="button"
                            className="av"
                            onClick={() => setStatus("InActive")}
                          >
                            Disable
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="av"
                            onClick={() => setStatus("Active")}
                          >
                            Enable
                          </button>
                        )
                      )}
                      &nbsp; &nbsp;
                      <button type="button" className="av" onClick={deleteuser}>
                        Delete
                      </button>

                    </div>
                    <Modal isOpen={deleteModalOpen} toggle={toggleDeleteModal} className="model_one">
                      <ModalHeader toggle={toggleDeleteModal} className="model_two"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=" model_ten lucide lucide-xcircle stroke-1.5 w-16 h-16 mx-auto mt-3 text-danger"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg></ModalHeader>
                      <ModalBody className="model_eaght">
                        <h4 className="model_three"> Are you sure? </h4>
                      </ModalBody>
                      <ModalBody className="model_eaght">
                        <p className="model_four">Do you really want to delete these records?
                          This process cannot be undone.</p>
                      </ModalBody>
                      <ModalFooter className="model_seven">
                        <Button color="secondary" onClick={toggleDeleteModal} className="model_five">Cancel</Button>
                        &nbsp; &nbsp;
                        <Button color="danger" onClick={deleteConfirmed} className="model_six">Delete</Button>
                      </ModalFooter>
                    </Modal>
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
                              <div className="text-danger">Trek name must be at least 3 characters long</div>
                            )}
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

                        {status && (status === "Active" || status === "InActive") && (

                          <div className="col-md-6">
                            <Form.Group>
                              <label htmlFor="exampleSelectGender" className="l_one">
                                Status <span className="text-danger">*</span>
                              </label>
                              <select
                                required
                                onChange={(e) => setStatus(e.target.value)}
                                value={status}
                                name="status"
                                className="form-control f_one"
                                id="exampleInputPassword1"
                              >
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                              </select>
                              <Form.Control.Feedback type="invalid">
                                Please select a status
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>

                        )}
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
                            <label htmlFor="exampleInputName1" className="l_one">Altitude <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Category Name <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Trailing Name <span className="text-danger">*</span></label>
                            <select
                              required
                              name="trailing_id"
                              className="form-control f_one"
                              value={trailing_id}
                              onChange={(e) => handleFeaturesInputChange('trailing_id', e.target.value)}
                            >
                              <option value="">--Select Trailing --</option>
                              {trailing.map((item) => (
                                <option key={item._trailing_id} value={item._trailing_id}>
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
                            <label htmlFor="exampleInputName1" className="l_one">Landscape Name <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Day <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Distance <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Waterbodies <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Level <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Toilet Tent <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Stay <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Ladies Only <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Location <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">Start Point <span className="text-danger">*</span></label>
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
                            <label htmlFor="exampleInputName1" className="l_one">End Point <span className="text-danger">*</span></label>
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
                      <div className="text_right">

                        {/* <button type="button" className="btn btn-secondary" onClick={handlePrevious}>
                            Previous
                          </button> */}
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
                          <label htmlFor="exampleInputName1" className="l_one">File Upload <span className="text-danger">*</span></label>
                          <div {...getRootProps()} className="dropzone">
                            <input {...getInputProps()} />
                            <p className="drag">
                              Drag & drop some images here, or click to select images
                            </p>
                          </div>
                          {imageValidationErrors.trek_img && (
                            <div className="text-danger">Please select at least one image</div>
                          )}
                          {error && <div className="valid">{error}</div>}
                          <div className="selected-images-container">
                            {renderSelectedImages()}
                          </div>
                          {/* <p className="valid">{imageError}</p> */}
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
                          <br></br>
                          <br></br>
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
                                      <div class="col-md-3">
                                        <Form.Group>
                                          <label htmlFor="exampleInputName1" className="l_one">Icon Name <span className="text-danger">*</span></label>
                                          <div className="custom-dropdown" onClick={() => toggleDropdown(sectionIndex, rowIndex)}>
                                            <div className="selected-value f_one_Icon" value={row.icon_id}>
                                              {row.IconName}
                                              {/* {row.icon_id} */}
                                              {row.icon_id
                                                ? Icon.find((item) => item.icon_id === row.icon_id)?.iconName
                                                : '--Select Icon--'}
                                            </div>
                                            {isOpen && selectedSectionIndex === sectionIndex && selectedRowIndex === rowIndex && (
                                              <div className="options-list">
                                                {Icon.map((item) => (
                                                  <div
                                                    key={item.icon_id}
                                                    value={row.iconName}
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
                                          {itineraryValidationErrors[sectionIndex]?.rows[rowIndex]?.icon_id && (
                                            <div className="text-danger">Please select an Icon Name</div>
                                          )}
                                        </Form.Group>
                                      </div>
                                      <div className="form-group col-md-3">
                                        <label className="mb-2 l_one">name <span className="text-danger">*</span></label>
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
                                        <label className="mb-2 l_one">Description <span className="text-danger">*</span></label>
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
                                            className="btn btn-danger removeit1"
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
                            <label htmlFor="exampleInputName1" className="l_one">Inclusion <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={inclusion}
                              onChange={(value) => handleInclusionInputChange('inclusion', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            /><p></p>
                            {inclusionValidationErrors.inclusion && (
                              <div className="text-danger">Please provide an Inclusion</div>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Exclusion <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={exclusion}
                              onChange={(value) => handleInclusionInputChange('exclusion', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
                            {inclusionValidationErrors.exclusion && (
                              <div className="text-danger">Please provide an Exclusion</div>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Food Menu <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={food_menu}
                              onChange={(value) => handleInclusionInputChange('food_menu', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
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
                            <label htmlFor="exampleInputName1" className="l_one">Eligibility <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={eligibility}
                              onChange={(value) => handleEligibilityInputChange('eligibility', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
                            {eligibilityValidationErrors.eligibility && (
                              <div className="text-danger">Please provide an Eligibility</div>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Document <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={document1}
                              onChange={(value) => handleEligibilityInputChange('document1', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
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
                            <label htmlFor="exampleInputName1" className="l_one">Policy <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={policy}
                              onChange={(value) => handlePolicyInputChange('policy', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
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
                            <label htmlFor="exampleInputName1" className="l_one">Basic Gear <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={basic_gear}
                              onChange={(value) => handleThingsInputChange('basic_gear', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
                            {thingsValidationErrors.basic_gear && (
                              <div className="text-danger">Please provide Basic Gear</div>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Clothing <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={clothing}
                              onChange={(value) => handleThingsInputChange('clothing', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
                            {thingsValidationErrors.clothing && (
                              <div className="text-danger">Please provide Clothing</div>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Head Gear <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={head_gear}
                              onChange={(value) => handleThingsInputChange('head_gear', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
                            {thingsValidationErrors.head_gear && (
                              <div className="text-danger">Please provide Head Gear</div>
                            )}
                          </Form.Group>
                        </div>
                      </div> <br></br>
                      <div className="row">
                        <div className="col-md-12">
                          <Form.Group>
                            <label htmlFor="exampleInputName1" className="l_one">Foot Gear <span className="text-danger">*</span></label>
                            <br></br>
                            <ReactQuill
                              value={foot_gear}
                              onChange={(value) => handleThingsInputChange('foot_gear', value)}
                              modules={quillModules}
                              theme="snow"
                              className="resizable-quill"
                            />
                            <p></p>
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
                              <label className="mb-2 l_one">Question <span className="text-danger">*</span></label>
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
                              <label className="mb-2 l_one">Answer <span className="text-danger">*</span></label>
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
                                  className="btn btn-danger removeit1"
                                  onClick={() => faqOnRemove(i)}
                                >
                                  {/* <i className="remove mdi mdi-close-circle-outline check_one"></i> */}
                                  <img
                                    src={require("../../../assets/img/minus.png")}
                                    alt="Remove Icon"
                                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                                  />
                                </button>
                              )}
                              {finalArrayData.length - 1 === i && (
                                <button
                                  type="button"
                                  className="btn btn-success addit1"
                                  onClick={faqaddRow}
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
                        </div>
                      ))}
                    </div>


                    <div className="text_right">
                      <button type="button" className="P_btn" onClick={fcqhandle}>
                        Update Trek
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

            <br></br>

            {/* </Form> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default TrekdataUpdateForm