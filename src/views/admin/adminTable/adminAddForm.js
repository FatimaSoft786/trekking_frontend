import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Admin from "layouts/Admin.js";

const AdminAddForm = () => {
  const navigate = useNavigate();

  const [admin_name, setAdmin_name] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
 const [Admin_profile_img, setAdmin_profile_img] = useState("");
 const [status, setStatus] = useState("");
 const [role, setRole] = useState("");

  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");
  const [passmsg, setPassmsg] = useState("");
  const [namemsg, setNamemsg] = useState("");
  const [emailmsg, setEmailmsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [AadharError, setAadharError] = useState("");
  const [alertstatus, setalertstatus] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [user_img_url, setUser_img_url] = useState("");


  let Intoken = JSON.parse(localStorage.getItem("data"));


 
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setAdmin_profile_img(file);
    setUser_img_url(URL.createObjectURL(file));
  };
  const addData = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false || phone_number.length !== 10) {
      e.preventDefault();
      e.stopPropagation();
      setSubmitted(true)
      if (phone_number === "") {
        // setPhoneError("Please provide a Mobile Number");
      } else if (phone_number.length !== 10) {
        setPhoneError("Please provide a 10-digit Mobile Number");
      }
      if (status !== "") {
        setValidated(true);
        console.log("Form submitted with status:", status);
      } else {
        setValidated(false);
      }
      if (role !== "") {
        setValidated(true);
        console.log("Form submitted with food:", role);
      } else {
        setValidated(false);
      }
    } else {

      try {
        const fromData = new FormData();
        fromData.append("admin_name", admin_name);
        fromData.append("admin_email", admin_email);
        fromData.append("password", password);
        fromData.append("phone_number", phone_number);
        fromData.append("Admin_profile_img", Admin_profile_img);
        fromData.append("status", status);
        fromData.append("role", role);
        const data = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/Admin/addAdmin`,
          fromData
        );

        navigate("/admin/adminTable");


      } catch (error) {
        setMsg(error.response.data.msg);
        setEmailmsg(error.response.data.emailmsg);
        setPassmsg(error.response.data.passmsg);
        setNamemsg(error.response.data.namemsg);
        console.log("error.response.data.msg==>",error.response.data.msg)
      }
    }
    setValidated(true);
  };

  const previes = () => {
    // let data_one = JSON.parse(localStorage.getItem("data"));

    navigate("/admin/adminTable");

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
              onSubmit={addData}
            >
               {/* <div className="text_right">
                <button
                  type="button"
                  className="av"
                >
                  Disable
                </button>
                &nbsp; &nbsp;
                <button type="button" className="av">
                  Delete
                </button>
              </div> */}
              <div className="col-md-6">
              <div className="image-upload-container">
                    <label htmlFor="Admin_profile_img" className="image-upload-icon">
                  {user_img_url ? (
                    <div className="image-preview">
                      <img src={user_img_url} alt="Preview" className="imgBox2" />
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
                      id="Admin_profile_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Name <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="Name"
                      name="admin_name"
                      value={admin_name}
                      onChange={(e) => {
                        // Regex to allow only letters and spaces
                        const regex = /^[A-Za-z\s]*$/;
                        if (regex.test(e.target.value)) {
                          setAdmin_name(e.target.value); // Update name only if it passes validation
                        }
                      }}
                    />

                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide a Name
                    </Form.Control.Feedback>
                    <p className="valid">{namemsg}</p>
                  </Form.Group>
                </div>
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
                      name="admin_email"
                      value={admin_email}
                      onChange={(e) => setAdmin_email(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide a valid Email
                    </Form.Control.Feedback>
<p className="valid">{emailmsg}</p>
                  </div>
                </div>
              </div>

             
              <div class="row">
             
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputphone_number1" className="l_one">
                      {" "}
                      Password <span className="text-danger">*</span>
                    </label>
                    <Form.Control
                      required
                      type="password"
                      className="form-control f_one"
                      id="exampleInputnumber1"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
      
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide Password
                    </Form.Control.Feedback>
                    <p className="valid">{passmsg}</p>
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
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {  // This allows only digits
                          setPhone_number(value);
                        }
                      }}
                    />
                    {phoneError && (
                      <div className="text-danger">{phoneError}</div>
                    )}
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide Mobile Number
                    </Form.Control.Feedback>
                    <p className="valid">{msg}</p>
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
                      onChange={(e) => setStatus(e.target.value)}
                      value={status}
                      name="status"
                      class="form-control f_one"
                      id=""
                    >
                      <option value=""> -- Status --</option>
                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>

                    </select>
                    {submitted && ( status === "") && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        Please select a Status
                      </div>
                    )}
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">Role <span className="text-danger">*</span></label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      name="role"
                      class="form-control f_one"
                      id="exampleInputPassword1"
                    >
                      <option value=""> -- Role --</option>
                      <option value="1"> Admin</option>
                    
                    </select>
                    {submitted && ( role === "") && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        Please select a Role
                      </div>
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

export default AdminAddForm