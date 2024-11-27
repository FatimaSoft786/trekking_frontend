import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";

// import "../dashboard/hospital_deshboard.css";
import Admin from "../../../layouts/Admin.js";

const TrailingUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [trailingName, setTrailingName] = useState("");
  const [trailingStatus, setTrailingStatus] = useState("");
  const [trailing_img, setTrailing_img] = useState("");
  var [check_img, setCheck_img] = useState(0);
  const [profile_img1, setProfile_img1] = useState("");
  const [imageError, setImageError] = useState("");
  const [trailingNamemsg, settrailingNamemsg] = useState("");
  const [trailing_img_url, setTrailing_img_url] = useState("");
 
  useEffect(() => {
    refreshToken();
    // getProductById();
  }, [id]);

  let data = JSON.parse(localStorage.getItem("data"));

  const refreshToken = () => {
    setToken(data.accessToken);
  };

  const validateImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width === 60 && img.height === 60) {
          resolve(true);
        } else {
          resolve(false);
        }
      };
      img.onerror = () => {
        reject(false);
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = await validateImageDimensions(file);
      if (isValid) {
        setTrailing_img(file);
        setTrailing_img_url(URL.createObjectURL(file));
     
        setImageError("");
      } else {
        setTrailing_img("");
        setImageError("Image dimensions must be 60x60 pixels.");
      }
    }
  };

  const updateuser = async (e) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      if (form.checkValidity() === false || imageError) {
        e.stopPropagation();
        // setSubmitted(true);

      } else {
        if (trailing_img != profile_img1) {
          check_img = 1;
        }

        const fromData = new FormData();
        fromData.append("trailingName", trailingName);
        fromData.append("trailingStatus", trailingStatus);
        fromData.append("trailing_img", trailing_img);
        fromData.append("check_img", check_img);

        const resp = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/Trailing/updateTrailing/${id}`,
          fromData,
          {
            headers: {
              Authorization: `Bearer ${data.accessToken} `,
            },
          }
        );
        console.log(resp, "updatedata");

        navigate("/admin/trailing/trailingTable");

      };
    } catch (error) {
      settrailingNamemsg(error.response.data.trailingNamemsg);
    }
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Trailing/oneTrailing/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log(response, "response");
      setTrailingName(response.data.getById.trailingName);
      setTrailingStatus(response.data.getById.trailingStatus);
      setTrailing_img(response.data.getById.trailing_img);
      setProfile_img1(response.data.getById.trailing_img);
    };
    getProductById();
  }, [id]);

  useEffect(() => {
    if (profile_img1) {
      const abc = `${process.env.REACT_APP_BACKEND_URL}/${profile_img1}`;
      // console.log("abcabcabcabc", abc);
      setTrailing_img_url(abc);
    }
  }, [profile_img1]);
  const previes = () => {
    navigate("/admin/trailing/trailingTable");

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
            <Form className="forms-sample">
            <div class="row">
                <div className="col-md-6">
                <div className="image-upload-container">
                    <label htmlFor="trailing_img" className="image-upload-icon">
                   {trailing_img_url ? (
                      <div className="image-preview">
                        <img src={trailing_img_url} alt="Preview" className="imgBox2" />
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
                      id="trailing_img"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                {imageError && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        {imageError}
                      </div>
                    )}
              </div>
              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one"> Trailing Name <span className="text-danger">*</span></label>
                    <Form.Control
                      required
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="Name"
                      name="trailingName"
                      value={trailingName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^[A-Za-z\s]*$/;
                        if (regex.test(value) || value === "") {
                          setTrailingName(value); // Only update if input is alphabet characters or empty
                          // setCategoryNamemsg(""); // Clear error message if input is valid
                        } else {
                          // setCategoryNamemsg("Only alphabet characters are allowed");
                        }
                      }}
                    />
                    <p className="valid">{trailingNamemsg}</p>

                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide a Trailing Name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      onChange={(e) => setTrailingStatus(e.target.value)}
                      value={trailingStatus}
                      name="trailingStatus"
                      class="form-control f_one"
                      id="exampleInputPassword1"
                    >

                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>
                    </select>

                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please select a Status
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                {/* <div class="col-md-6">
                  <Form.Group>
                    <label className="l_one">File Upload <span className="text-danger">*</span></label>
                    <div className="custom-file">
                      <Form.Control
                        type="file"
                        className="form-control visibility-hidden f_two"
                        id="customFileLang"
                        lang="es"
                        name="trailing_img"
                        onChange={handleImageChange}
                      />

                    </div>
                    {imageError && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        {imageError}
                      </div>
                    )}
                  </Form.Group>
                </div> */}
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
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrailingUpdateForm