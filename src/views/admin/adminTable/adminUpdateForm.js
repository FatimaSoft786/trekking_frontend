import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

// import "../dashboard/hospital_deshboard.css";
import Admin from "../../../layouts/Admin.js";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Button from "react-bootstrap/Button";

const AdminUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [admin_name, setAdmin_name] = useState("");
  const [admin_email, setAdmin_email] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [Admin_profile_img, setAdmin_profile_img] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [profile_img1, setProfile_img1] = useState("");
  const [passmsg, setPassmsg] = useState("");
  const [AadharError, setAadharError] = useState("");
  var [check_img, setCheck_img] = useState(0);
  const [user_img_url, setUser_img_url] = useState("");
  const [namemsg, setNamemsg] = useState("");
  const [phoneError, setPhoneError] = useState("");
  // const [user_id, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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


  const updateuser = async (e) => {
    e.preventDefault();
    
    try {
      if (Admin_profile_img !== profile_img1) {
        check_img = 1;
      }
    
      if (phone_number === "") {
        setPhoneError("Please provide a Mobile Number");
      } else if (phone_number.length !== 10) {
        setPhoneError("Please provide a 10-digit Mobile Number");
      } else {
        const fromData = new FormData();
        fromData.append("admin_name", admin_name);
        fromData.append("admin_email", admin_email);
        fromData.append("password", password);
        fromData.append("phone_number", phone_number);
        fromData.append("Admin_profile_img", Admin_profile_img);
        fromData.append("status", status);
        fromData.append("role", role);
        fromData.append("check_img", check_img);
        console.log(fromData, "Fromdata");
    
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/Admin/updateAdmin/${id}`,
          fromData,
          {
            headers: {
              Authorization: `Bearer ${data.accessToken} `,
            },
          }
        );
    
        
        navigate("/admin/adminTable");
      }
    } catch (error) {
      setPassmsg(error.response.data.passmsg);
      setNamemsg(error.response.data.namemsg);
      // console.error("Error updating user:", error);
      // setPassmsg("Failed to update user. Please try again later.");
    }
  };
  
  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Admin/getOneAdmin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
       console.log("cleanedDOB", response);

      setAdmin_name(response.data.response.admin_name);
      setAdmin_email(response.data.response.admin_email);
      setPhone_number(response.data.response.phone_number);
      setPassword(response.data.response.password);
      setStatus(response.data.response.status);
      setRole(response.data.response.role);
      setAdmin_profile_img(response.data.response.Admin_profile_img);
      setProfile_img1(response.data.response.Admin_profile_img);

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


  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // const isValid = await validateImageDimensions(file);
    if (file) {
      setAdmin_profile_img(file);
      setUser_img_url(URL.createObjectURL(file));
    } else {
      setAdmin_profile_img(null);
      setUser_img_url("");
    }

  };
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteConfirmed = async () => {
    await axios.delete(
         `${process.env.REACT_APP_BACKEND_URL}/Admin/deleteAdmin/${id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
      
       navigate("/admin/adminTable");
   };
 
   const deleteuser = (id) => {
    // setSelectedUserId(id);
    toggleDeleteModal(); // Open the delete confirmation modal
  };
  const previes = () => {

    navigate("/admin/adminTable");

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
              {/* onClick={() => setStatus("0")} */}
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
                      placeholder="*************"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
         <p className="valid">{passmsg}</p>
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide Password
                    </Form.Control.Feedback>
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
                      class="form-control"
                      id=""
                    >
                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>

                    </select>
                   
                  </Form.Group>
                </div>
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">Role <span className="text-danger">*</span></label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      name="role"
                      class="form-control"
                      id="exampleInputPassword1"
                    >
                      <option value="1"> Admin</option>

                    </select>
                 
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
                  onClick={updateuser}>
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
export default AdminUpdateForm