import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Admin from "layouts/Admin.js";
import { contains } from "jquery";

const UserAddForm = () => {
  const navigate = useNavigate();

  const [first_name, setFirst_name] = useState("");
  const [aadhar_number, setAadhar_number] = useState("");
  const [food, setFood] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user_DOB, setUser_DOB] = useState("");

  const [phone_number, setPhone_number] = useState("");

  const [address, setaddress] = useState("")
  // const [role, setRole] = useState("");
  const [profile_img, setProfile_img] = useState("");
  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");
  const [first_namemsg, setfirst_namemsg] = useState("");
  const [emailmsg, setEmailmsg] = useState("");
  const [status, setStatus] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [phoneError, setPhoneError] = useState("");
  const [AadharError, setAadharError] = useState("");
  const [alertstatus, setalertstatus] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [category_city, setcity] = useState("");
  const [city, setCityId] = useState([]);
  const [state, setstate] = useState("");
  const [state_id, setStateId] = useState([]);
  const [user_img_url, setUser_img_url] = useState("");
  const [google_key, setGoogle_key] = useState("");

  // useEffect(() => {
  //   refreshToken();
  // }, []);
  let data = JSON.parse(localStorage.getItem("data"));
  // let data_one = JSON.parse(localStorage.getItem("data"));
  // console.log("localData====> ", data.data.role)
  // const role1 = data?.data?.role || "";

  // const refreshToken = async () => {
  //  // setToken(data.accessToken);
  // };


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

  // // //  city ---------------------------

  //  const newSelacted = state;
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setProfile_img(file);
    setUser_img_url(URL.createObjectURL(file));
  };
  
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
    await addData();
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
          // Allow only numeric input and prevent more than 10 digits
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

  const addData = async () => {

   
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
        const data = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/Users/addUsers`,
          fromData
        );
        console.log(data, "data added");



        navigate("/admin/user/userTable");


      } catch (error) {
        setMsg(error.response.data.msg);
        setfirst_namemsg(error.response.data.first_namemsg);
        setEmailmsg(error.response.data.emailmsg);
        console.log("error.response.data.msg==>", error.response.data.msg)
      }
    
    setValidated(true);
  };

//   useEffect(() => {
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
  const apiKey = "AIzaSyBx5a-gq-_kUHSP_2_D4ay7JHISwYJnCT8" //`${google_key}`;
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
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          address: false,
        }));
      })
      .catch((error) => console.error("Error geocoding address:", error));
  };

  const handleAddressChange = (newAddress) => {
    setaddress(newAddress);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      address: !address,
    }));
  };

  const previes = () => {
    // let data_one = JSON.parse(localStorage.getItem("data"));

    navigate("/admin/user/userTable");

  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };


  return (
    <>
      <Admin />
      <div className=" grid-margin stretch-card card_p2 ">
        <div className="card ml">
          <div className="table1_a dd2">
            <div class="table2_b"> Add Data </div>
          </div>
          <div className="card-body card_b1">
            {/* <h4 className="card-title">Staff AddForm</h4> */}
            {/* <p className="card-description"> Basic form elements </p> */}
            <Form
              className="forms-sample"
              noValidate
              validated={validated}
              onSubmit={Vendorhandle}
            >
              {/* <div className="text_right">
                      <button type="button" className="av">
                        Disable
                      </button>
                      &nbsp; &nbsp;
                      <button type="button" className="av">
                        Delete
                      </button>
                      </div> */}
              <div class="row">
                <div class="col-md-6">
                  <div className="image-upload-container  ">
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
                      className="form-control f_one "
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
                    <label htmlFor="" className="l_one">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      onChange={(e) => handleInputChange('status', e.target.value)}
                              
                      value={status}
                      name="status"
                      class="form-control f_one"
                      id=""
                    >
                      <option value="">--Status--</option>
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
                    <p className="valid">{msg}</p>
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
                              className: "location-search-input form-control addBox",
                            })}
                            value={address}
                          />
                          <div className="autocomplete-dropdown-container ">
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
                    <label htmlFor="exampleSelectGender" className="l_one">Food preferences <span className="text-danger">*</span> </label>
                    <select
                      value={food}
                      onChange={(e) => handleInputChange('food', e.target.value)}
                      name="food"
                      class="form-control f_one"
                      id="exampleInputPassword1"
                    >
                      <option value="">--Food Preferences--</option>
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
                      className="form-control f_one"
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
                    <label htmlFor="exampleInputName1" className="l_one"> City <span className="text-danger">*</span> </label>
                    <select
                      required
                      name="category_city"
                      className="form-control f_one"
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
                <button type="submit" className=" abbtn btn btn-gradient-primary ">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserAddForm;
