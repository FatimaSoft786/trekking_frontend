import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";

// import "../dashboard/hospital_deshboard.css";
import Admin from "../../../layouts/Admin.js";

const ItineraryIconUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [iconName, setIconName] = useState("");
  const [iconStatus, setIconStatus] = useState("");
  const [icon_img, setIcon_img] = useState("");
  var [check_img, setCheck_img] = useState(0);
  const [profile_img1, setProfile_img1] = useState("");
  const [profile_img2, setProfile_img2] = useState("");
  const [imageError, setImageError] = useState("");
  const [category_img_url, setCategory_img_url] = useState("");
  const [iconNameNamemsg, setIconNameNamemsg] = useState("");
 
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
        setIcon_img(file);
        // setCategory_img_url(URL.createObjectURL(file));
        setImageError("");
      } else {
        setIcon_img(null);
        // setCategory_img_url("");
        setImageError("Image dimensions must be 60x60 pixels.");
      }
    }
  };

  const updateuser = async (e) => {
    e.preventDefault();
    try{
    const form = e.currentTarget;
    if (form.checkValidity() === false || imageError) {
      e.stopPropagation();
      // setSubmitted(true);
      
    } else {
   
      if (icon_img != profile_img1) {
        check_img = 1;
      }
    const fromData = new FormData();
    fromData.append("iconName", iconName);
        fromData.append("iconStatus", iconStatus);
        fromData.append("icon_img", icon_img);
    fromData.append("check_img", check_img);

    const resp = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Icon/updateIcon/${id}`,
      fromData,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      }
    );
    console.log(resp, "updatedata");
   
    navigate("/admin/itineraryIcon/itineraryIconTable");

   
  }
} catch (error) {
    setIconNameNamemsg(error.response.data.iconNameNamemsg);
       
 }
}

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Icon/oneIcon/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log(response, "response");
      setIconName(response.data.getById.iconName);
      setIconStatus(response.data.getById.iconStatus);
      setIcon_img(response.data.getById.icon_img);
      setProfile_img1(response.data.getById.icon_img);
      setProfile_img2(response.data.getById.icon_img);
       };
    getProductById();
  }, [id]);
  // useEffect(() => {
  //   if (profile_img2) {
  //     const abc = `${process.env.REACT_APP_BACKEND_URL}/${profile_img2}`;
  //     console.log("abcabcabcabc", abc);
  //     setCategory_img_url(abc);
  //   }
  // }, [profile_img2]);
  const previes = () => {
    navigate("/admin/itineraryIcon/itineraryIconTable");

    
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
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Icon Name <span className="text-danger">*</span></label>
                    <Form.Control
                      type="text"
                      className="form-control f_one"
                      id="exampleInputName1"
                      placeholder="Name"
                      name="iconName"
                      value={iconName}
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^[A-Za-z\s]*$/;
                        if (regex.test(value) || value === "") {
                          setIconName(value); // Only update if input is alphabet characters or empty
                          // setCategoryNamemsg(""); // Clear error message if input is valid
                        } else {
                          // setCategoryNamemsg("Only alphabet characters are allowed");
                        }
                      }}
                    />
                  </Form.Group>
                  <p className="valid">{iconNameNamemsg}</p>
                  
                </div>
                <div class="col-md-6">
                <Form.Group>
                  <label className="l_one">File Upload <span className="text-danger">*</span></label>
                  <div className="custom-file">
                    <Form.Control
                      type="file"
                      className="form-control visibility-hidden f_two"
                      id="customFileLang"
                      lang="es"
                      name="icon_img"
                      onChange={handleImageChange}
                    />

                  </div>
                  {imageError && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        {imageError}
                      </div>
                    )}
                </Form.Group>
              </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">Status <span className="text-danger">*</span></label>
                    <select
                      value={iconStatus}
                      onChange={(e) => setIconStatus(e.target.value)}
                      name="iconStatus"
                      class="form-control"
                      id="exampleInputPassword1"
                    >
                    
                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>
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
                <button  type="submit"
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
  );
};

export default ItineraryIconUpdateForm;
