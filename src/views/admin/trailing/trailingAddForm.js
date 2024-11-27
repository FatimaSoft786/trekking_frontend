import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import Admin from "layouts/Admin.js";

const TrailingAddForm = () => {
  const navigate = useNavigate();

  const [trailingName, setTrailingName] = useState("");
  const [trailingStatus, setTrailingStatus] = useState("");
  const [trailing_img, setTrailing_img] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [validated, setValidated] = useState(false);
  const [msg, setMsg] = useState("");
  const [trailingNamemsg, settrailingNamemsg] = useState("");
  const [alertstatus, setalertstatus] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [imageError, setImageError] = useState("");



  let Intoken = JSON.parse(localStorage.getItem('data'))
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    if (Intoken) {

      setToken(Intoken.accessToken);
    }

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
        setImageError("");
      } else {
        setTrailing_img("");
        setImageError("Image dimensions must be 60x60 pixels.");
      }
    }
  };



  const addData = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false || imageError) {
      e.preventDefault();
      e.stopPropagation();
      setSubmitted(true)
      if (trailingStatus !== "0" && trailingStatus !== "") {
        setValidated(true);
        console.log("Form submitted with status:", trailingStatus);
      } else {
        setValidated(false);
      }
    } else {

      try {
        const fromData = new FormData();
        fromData.append("trailingName", trailingName);
        fromData.append("trailingStatus", trailingStatus);
        fromData.append("trailing_img", trailing_img);

        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Trailing/addTrailing`, fromData,
          {
            headers: {
              Authorization: `Bearer ${Intoken.accessToken} `,
            },
          });
        console.log(data, "data added");


        navigate("/admin/trailing/trailingTable");

      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
          settrailingNamemsg(error.response.data.trailingNamemsg);
          // console.log(alert(msg));
          // alert(msg)
        }
      }
    }
    setValidated(true);
  };
  const previes = () => {
    navigate("/admin/trailing/trailingTable");
  };

  return (
    <>
      <Admin />
      <div className=" grid-margin stretch-card card_p2">
        <div className="card ml">
          <div className="table1_a dd2">
            <div class="table2_b"> Add Data </div>
          </div>
          <div className="card-body card_b1">

            {/* <p className="card-description"> Basic form elements </p> */}
            <Form
              className="forms-sample"
              noValidate
              validated={validated}
              onSubmit={addData}
            >
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
                    <p className="valid">{msg}</p>
                    <p className="valid">{trailingNamemsg}</p>
                    <Form.Control.Feedback type="invalid">
                      {" "}
                      Please provide a Trailing Name
                    </Form.Control.Feedback>
                  </Form.Group>
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
                </div>
              </div>

              <div class="row">

                <div class="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      onChange={(e) => setTrailingStatus(e.target.value)}

                      name="trailingStatus"
                      class="form-control f_one"
                      id="exampleInputPassword1"
                    >
                      <option value=""> Select</option>
                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>
                    </select>
                    {submitted && (trailingStatus === "") && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        Please select a Status
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>
              &nbsp;
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
  )
}

export default TrailingAddForm