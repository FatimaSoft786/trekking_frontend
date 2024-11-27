import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Button from "react-bootstrap/Button";
// import "../dashboard/hospital_deshboard.css";
import Admin from "../../../layouts/Admin.js";
const UserUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [status, setStatus] = useState("");
  const [address, setaddress] = useState("")
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [profile_img, setProfile_img] = useState("");
  const [profile_img1, setProfile_img1] = useState("");
  const [google_key, setGoogle_key] = useState("");
  const [aadhar_number, setAadhar_number] = useState("");
  const [food, setFood] = useState("");
  const [category_city, setcity] = useState("");
  const [city, setCityId] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setStateId] = useState([]);
  const [AadharError, setAadharError] = useState("");
  var [check_img, setCheck_img] = useState(0);
  // const [password, setPassword] = useState("");
  const [user_DOB, setUser_DOB] = useState("");
  const [user_img_url, setUser_img_url] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [user_id, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [first_namemsg, setfirst_namemsg] = useState("");
  const [emailmsg, setEmailmsg] = useState("");
  
  useEffect(() => {
    refreshToken();
  }, []);
  let data = JSON.parse(localStorage.getItem("data"));
  // let data_one = JSON.parse(localStorage.getItem("data"));
  // console.log("localData====> ", data.data.role)
  // const role1 = data?.data?.role || "";

  const refreshToken = async () => {
    setToken(data.accessToken);
  };

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
       console.log("State data", getres);
      if (getres) {
        setStateId(getres);
    

      }
    };
    getState();
  }, []);

  // //  city ---------------------------

  useEffect(() => {
  
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/State/AllCitys`,
          {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          }
        )
        .then((response) => {
          setCityId(response.data.data);

        });
    

  }, []);


  
  const [validationErrors, setValidationErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    phone_number: false,
    user_DOB: false,
    address: false,
    profile_img: false,
    status: false,
    aadhar_number: false,
    food: false,
    category_city: false,
    state: false,
  });
  


  const Vendorhandle = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = {
      first_name: !first_name, // Mandate org_name
      last_name: !last_name, // Mandate org_name
      address: !address,   // Mandate address
       // Optional fields, only validate if they are provided
      user_DOB: !user_DOB, // Add any specific Gstin validation if needed
      phone_number: !phone_number && phone_number.length !== 10, // Validate mobile if provided
      email: !email  || !emailRegex.test(email),
      aadhar_number: !aadhar_number || aadhar_number.length !== 12,
      status: !status,  // Optional, no validation required
      food: !food,     // Optional, no validation required
      category_city: !category_city, // Optional, no validation required
      state: !state,          // Optional, no validation required
       profile_img: false 
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }
    await updateuser();
  };

  const handleInputChange = (field, value) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [field]: !value || (field === 'phone_number' && value.length !== 10) || (field === 'aadhar_number' && value.length !== 12),
    }));

    switch (field) {
      case 'first_name':
        setFirst_name(value);
        break;
      case 'last_name':
        setLast_name(value);
        break;
      case 'phone_number':
        if (/^\d*$/.test(value) && value.length <= 10) {
          setPhone_number(value);
        }
        // setPhone_number(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'user_DOB':
        setUser_DOB(value);
        break;
      case 'address':
        setaddress(value);
        break;
      case 'aadhar_number':
        if (/^\d*$/.test(value) && value.length <= 12) {
          setAadhar_number(value);
        }
        break;
      case 'food':
        setFood(value);
        break;
      case 'category_city':
        setcity(value);
        break;
      case 'state':
        setstate(value);
        break;
      case 'status':
        setStatus(value);
        break;
      case 'profile_img':
        setProfile_img(value);
        break;
      default:
        break;
    }
  };


  const updateuser = async (e) => {
    try {
 
      const fromData = new FormData();
      fromData.append("first_name", first_name);
      fromData.append("last_name", last_name);
      fromData.append("email", email);
      fromData.append("phone_number", phone_number);
      fromData.append("user_DOB", user_DOB);
      fromData.append("address", address);
      fromData.append("latitude", latitude);
      fromData.append("longitude", longitude);
      fromData.append("profile_img", profile_img);
      fromData.append("status", status);
      fromData.append("aadhar_number", aadhar_number);
      fromData.append("food", food);
      fromData.append("city", category_city);
      fromData.append("state", state);
      fromData.append("check_img", check_img);


      console.log(fromData, "Fromdata");

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/Users/updateUser/${id}`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken} `,
          },
        }
      );

      // localStorage.setItem('name', JSON.stringify(name) )
      // localStorage.setItem('profile_img', profile_img )
      // localStorage.setItem('data', JSON.stringify(data.data))

      // console.log(localupdate, "localupdate")
      navigate("/admin/user/userTable");
    } catch (error) {
      setMsg(error.response.data.msg);
      setfirst_namemsg(error.response.data.first_namemsg);
      setEmailmsg(error.response.data.emailmsg);
      console.log("error.response.data.msg==>", error.response.data.msg)
    }
  };
  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Users/userOne/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      const cleanedDOB = response.data.response.user_DOB.trim();
      console.log("cleanedDOB", cleanedDOB);

      setFirst_name(response.data.response.first_name);
      setLast_name(response.data.response.last_name);
      setEmail(response.data.response.email);
      setaddress(response.data.response.address);
      setLatitude(response.data.response.latitude);
      setLongitude(response.data.response.longitude);
      setPhone_number(response.data.response.phone_number);
      setStatus(response.data.response.status);
      setAadhar_number(response.data.response.aadhar_number);
      setFood(response.data.response.food);
      setcity(response.data.response.city);
      setstate(response.data.response.state);
      setProfile_img(response.data.response.profile_img);
      setProfile_img1(response.data.response.profile_img);
      // setProfile_img1(response.data.response.profile_img);
      setUser_DOB(cleanedDOB);

      // user_DOB: "2006-07-03 "
    };
    getProductById();
  }, [id]);

  useEffect(() => {
    if (profile_img1) {
      const abc = `${process.env.REACT_APP_BACKEND_URL}/${profile_img1}`;
      // console.log("owner_profile_img", abc);
      setUser_img_url(abc);
    }
  }, [profile_img1]);



  // useEffect(() => {
  //   const getUsers = async () => {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_BACKEND_URL}/Satting/getAllSatting`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${data.accessToken}`,
  //         },
  //       }
  //     );

  //     setGoogle_key(response.data.getAllData.google_key);
  //     // console.log("response.data.getAllData.google_key",response.data.getAllData.google_key)

  //   };
  //   getUsers();
  // }, []);
  const apiKey = `${google_key}`;
  // console.log("apiKey",apiKey)

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
              console.log("Latitude:", latLng.lat);
              console.log("Longitude:", latLng.lng);
              setLatitude(latLng.lat);
              setLongitude(latLng.lng);
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
        setaddress(selectedAddress);
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange = (newAddress) => {
    setaddress(newAddress);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // const isValid = await validateImageDimensions(file);
    if (file) {
      setProfile_img(file);
      setUser_img_url(URL.createObjectURL(file));
    } else {
      setProfile_img(null);
      setUser_img_url("");
    }

  };

  
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteConfirmed = async () => {
    await axios.delete(
         `${process.env.REACT_APP_BACKEND_URL}/userDelete/${id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
      
       navigate("/admin/user/userTable");
   };
 
   const deleteuser = (id) => {
    // setSelectedUserId(id);
    toggleDeleteModal(); // Open the delete confirmation modal
  };
  const previes = () => {

    navigate("/admin/user/userTable");

  };
  const toggleStatus = () => {
    const newStatus = status === "1" ? "0" : "1";
    setStatus(newStatus);
  };
  return (
    <>
      <Admin />
      <div className=" grid-margin stretch-card card_p2">
        <div className="card ml">
          <div className="table1_a dd2">
            <div class="table2_b"> Update Data </div>
          </div>

          <div className="card-body card_b1">
            <form className="forms-sample">
              <div className="text_right">
              {status === "1" ? (
                  <button
                    type="button"
                    className="av"
                    onClick={toggleStatus}
                  >
                    Disable
                  </button>
                ) : (
                  <button
                    type="button"
                    className="av"
                    onClick={toggleStatus}
                  >
                    Enable
                  </button>
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
              <div class="row">
                <div className="col-md-6">
                  <div className="image-upload-container">
                    <label htmlFor="profile_img" className="image-upload-icon">
                      {user_img_url ? (
                        <img
                          src={user_img_url}
                          alt="Profile"
                          className="imgBox2"
                        // onChange={handleImageChange}
                        />
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
                      id="profile_img"
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
                    <label htmlFor="exampleInputName1" className="l_one">First Name <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="First Name"
                      name="first_name"
                      value={first_name}
                      onChange={(e) => handleInputChange('first_name', e.target.value)}
                       />
                      {validationErrors.first_name && (
                                <div className="text-danger">Please provide a First Name</div>
                              )}
 <p className="valid">{first_namemsg}</p>
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Last Name <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="Last name"
                      name="last_name"
                      value={last_name}
                      onChange={(e) => handleInputChange('last_name', e.target.value)}
                              
                     />
  {validationErrors.last_name && (
                                <div className="text-danger">Please provide a Last Name</div>
                              )}
                  </Form.Group>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div>
                    <label for="inputEmail3" className="l_one">Email <span className="text-danger">*</span></label>
                    {/* for="inputEmail3" */}
                    <input
                      required
                      type="email"
                      className="form-control f_one"
                      id="inputEmail3"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                              
                      />
                     {validationErrors.email && (
                                <div className="text-danger">Please provide a valid Email</div>
                              )}
                    <p className="valid">{emailmsg}</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputPassword4" className="l_one">User DOB <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="date"
                      className="form-control f_one"
                      id="exampleInputPassword4"
                      name="user_DOB"
                      max={getCurrentDate()}
                      value={user_DOB}
                      onChange={(e) => handleInputChange('user_DOB', e.target.value)}
                              
                    />
                     {validationErrors.user_DOB && (
                                <div className="text-danger">Please provide a DOB</div>
                              )}
                  </Form.Group>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one"> Status <span className="text-danger">*</span></label>
                    <select
                      value={status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                     name="status"
                      class="form-control"
                      id="exampleInputPassword1"
                    >

                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>

                    </select>
                    {validationErrors.status && (
                                <div className="text-danger">Please provide a Status</div>
                              )}
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputphone_number1" className="l_one">
                      {" "}
                      Mobile Number <span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputnumber1"
                      placeholder="Mobile Number"
                      name="phone_number"
                      value={phone_number}
                      onChange={(e) => handleInputChange('phone_number', e.target.value)}
                              
                     />
                    {/* {phoneError && (
                      <div className="text-danger">{phoneError}</div>
                    )} */}
                    {validationErrors.phone_number && (
 <div className="text-danger"> Please provide a valid 10-digit Mobile Number</div>
                              )}
                    {/* <p className="valid">{msg}</p> */}
                  </Form.Group>
                </div>
              </div>


              <div class="row">
                <div class="col-md-12">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Address <span className="text-danger">*</span></label>
                    <PlacesAutocomplete
                      placeholder="address"
                      name="address"
                      value={address}
                      // onChange={(e) => setHospital_address(e.target.value)}
                      onChange={handleAddressChange}
                      onSelect={handleSelect}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                          <input
                            {...getInputProps({
                              placeholder: "Enter your address...",
                              className: "location-search-input form-control f_one addBox",
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
                                <div className="text-danger">Please provide a Address</div>
                              )}
                  </Form.Group>
                </div>
                <div className="map" id="gmp-map" hidden></div>
                <input type="text" placeholder="City" id="locality-input" hidden />

                <input type="text" placeholder="Latitude" value={latitude || ''} readOnly hidden />

                <input type="text" placeholder="Longitude" value={longitude || ''} readOnly hidden />

                <input type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1-input" hidden />

                <input type="text" placeholder="Country" id="country-input" hidden />
                <div className="half-input-container">
                  <input type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code-input" hidden />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Aadhar Number <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="Aadhar number"
                      name="aadhar_number"
                      value={aadhar_number}
                      onChange={(e) => handleInputChange('aadhar_number', e.target.value)}
                              
                    />
                    {/* {AadharError && (
                      <div className="text-danger">{AadharError}</div>
                    )} */}
                    {validationErrors.aadhar_number && (
                                <div className="text-danger">Please provide  a valid 12-digit Aadhar number</div>
                              )}
                  </Form.Group>
                </div>

                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">Food preferences <span className="text-danger">*</span></label>
                    <select
                      value={food}
                      onChange={(e) => handleInputChange('food', e.target.value)}
                      name="food"
                      class="form-control"
                      id="exampleInputPassword1"
                    >

                      <option value="1"> Veg</option>
                      <option value="0"> Nonveg</option>

                    </select>
                    {validationErrors.food && (
                                <div className="text-danger">Please provide a Food Preferences</div>
                              )}
                  </Form.Group>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one"> State <span className="text-danger">*</span></label>
                    <select
                      required
                      name="state"
                      className="form-control "
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      value={state}
          >
                      <option value="">--Select State --</option>
                      {state_id.map((item) => (
                        <option key={item._id} value={item.name}>
                          {" "}
                          {item.name}
                        </option>
                      ))}
                    </select>
                    {validationErrors.state && (
                                <div className="text-danger">Please provide a state</div>
                              )}
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one"> City <span className="text-danger">*</span></label>
                    <select
                      required
                      name="category_city"
                      className="form-control "
                      value={category_city}
                      onChange={(e) => handleInputChange('category_city', e.target.value)}
                     >
                      <option value="">--Select City --</option>
                      {city.map((item) => (
                        <option key={item._id} value={item.city_name}>
                          {" "}
                          {item.city_name}
                        </option>
                      ))}
                    </select>
                    {validationErrors.category_city && (
                                <div className="text-danger">Please provide a City </div>
                              )}
                  </Form.Group>
                </div>



              </div>
              <br></br>
              <div className="text_right">
                <button className=" btn btn-secondary" onClick={previes}>
                  Cancel
                </button>
                &nbsp;
                <button type="submit"
                  className="btn btn-gradient-primary"
                  onClick={Vendorhandle}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserUpdateForm;