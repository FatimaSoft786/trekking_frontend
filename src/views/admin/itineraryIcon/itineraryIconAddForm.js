import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import Admin from "layouts/Admin.js";

const ItineraryIconAddForm = () => {
  const navigate = useNavigate();

  const [iconName, setIconName] = useState("");
  const [iconStatus, setIconStatus] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [icon_img, setIcon_img] = useState("");
  const [validated, setValidated] = useState(false);
  const [existmsg, setMsg] = useState("");
  const [img_msg, setImgMsg] = useState("");
  const [alertstatus, setalertstatus] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [imageError, setImageError] = useState("");
  const [category_img_url, setCategory_img_url] = useState("");
 
  const [iconNameNamemsg, setIconNameNamemsg] = useState("");
 
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

  const addData = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false || imageError) {
      e.stopPropagation();
      setSubmitted(true);
      if (iconStatus !== "") {
        setValidated(true);
      } else {
        setValidated(false);
      }
      if (icon_img !== "") {
        setValidated(true);
      } else {
        setValidated(false);
      }
    } else {
      try {
        const fromData = new FormData();
        fromData.append("iconName", iconName);
        fromData.append("iconStatus", iconStatus);
        fromData.append("icon_img", icon_img);

        const data = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/Icon/addIcon`, fromData,
          {
            headers: {
              Authorization: `Bearer ${Intoken.accessToken} `,
            },
          });
        console.log("data added", data);
        // setImgMsg(data.img_msg)

        navigate("/admin/itineraryIcon/itineraryIconTable");

      } catch (error) {
        if (error.response) {
        //   setMsg(error.response.data.existmsg);
          setImgMsg(error.response.data.img_msg)
          setIconNameNamemsg(error.response.data.iconNameNamemsg);
        }
      }
    }
    setValidated(true);
  };

  const previes = () => {
    navigate("/admin/itineraryIcon/itineraryIconTable");

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
            <Form
              className="forms-sample"
              noValidate
              validated={validated}
              onSubmit={addData}
            >
             
              <div className="row">
              <div className="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleInputName1" className="l_one">Icon Name <span className="text-danger">*</span></label>
                    <Form.Control
                      required
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
                    <Form.Control.Feedback type="invalid">
                      Please provide a Icon Name
                    </Form.Control.Feedback>
                    {/* <p className="valid">{existmsg}</p> */}
                    <p className="valid">{iconNameNamemsg}</p>
                  </Form.Group>
                </div>
             
                <div class="col-md-6">
                <Form.Group>
                  <label className="l_one">File Upload <span className="text-danger">*</span></label>
                  <div className="custom-file">
                    <Form.Control
                    required
                      type="file"
                      className="form-control f_two"
                      id="customFileLang"
                      lang="es"
                      name="icon_img"
                      onChange={handleImageChange}
                    />
{/* <p className="valid">{img_msg}</p> */}
                  </div>
                  {imageError && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        {imageError}
                      </div>
                    )}
                     {/* <p className="valid">{img_msg}</p> */}
                     {submitted && (icon_img === "") && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        Please provide a Image
                      </div>
                    )}
                </Form.Group>
              </div>
              </div>
              <div className="row">
              <div className="col-md-6">
                  <Form.Group>
                    <label htmlFor="exampleSelectGender" className="l_one">
                      Status <span className="text-danger">*</span>
                    </label>
                    <select
                      required
                      onChange={(e) => setIconStatus(e.target.value)}
                      name="iconStatus"
                      className="form-control f_one"
                      id="exampleInputPassword1"
                    >
                      <option value=""> -Select Status-</option>
                      <option value="1"> Active</option>
                      <option value="0"> InActive</option>
                    </select>
                    {submitted && (iconStatus === "") && (
                      <div className="invalid-feedback" style={{ display: "block" }}>
                        Please select a Status
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>

              <div className="text_right">
                <button className="btn btn-secondary" onClick={previes}>
                  Cancel
                </button>
                &nbsp;
                <button type="submit" className="abbtn btn btn-gradient-primary">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItineraryIconAddForm;
