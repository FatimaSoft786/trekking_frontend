import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";

import { Form } from "react-bootstrap";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";

// import "../dashboard/hospital_deshboard.css";
import Admin from "../../../layouts/Admin.js";

const AppSattingUpdate = () => {
    const navigate = useNavigate();
  const { id } = useParams();
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
 
  const [gateway_key, setGateway_key] = useState("");
  const [google_key, setGoogle_key] = useState("");
  const [fcm_key, setFcm_key] = useState("");
  const [token_expire, setToken_expire] = useState("");
   var [check_img, setCheck_img] = useState(0);
  const [profile_img1, setProfile_img1] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    refreshToken();
    // getProductById();
  }, [id]);

  let data = JSON.parse(localStorage.getItem("data"));

  const refreshToken = () => {
    setToken(data.accessToken);
  };

  


  const updateuser = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      // setSubmitted(true);
      
    } else {
    
    const rowData = {
        token_expire:token_expire,
        google_key:google_key,
        fcm_key:fcm_key,
        gateway_key:gateway_key,
    } 

    const resp = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/Satting/updateSatting/${id}`,
      rowData,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken} `,
        },
      }
    );
    console.log(resp, "updatedata");
   
      navigate("/admin/appSetting/appsettingTable");
   
  };
  };

  useEffect(() => {
    const getProductById = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Satting/getByIdSatting/${id}`,
        {
          headers: {
            Authorization: `Bearer ${data.accessToken}`,
          },
        }
      );
      console.log(response, "response");
      setGateway_key(response.data.getId.gateway_key);
      setGoogle_key(response.data.getId.google_key);
      setFcm_key(response.data.getId.fcm_key);
      setToken_expire(response.data.getId.token_expire);
     
    };
    getProductById();
  }, [id]);

  const previes = () => {
    navigate("/admin/appSetting/appsettingTable");
   
    
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
              <div class="col-md-12">
                <Form.Group>
                  <label htmlFor="exampleInputName1" className="l_one">Google KEY</label>
                  <Form.Control
                    required
                    type="text"
                    className="form-control f_one"
                    id="exampleInputName1"
                    placeholder="Google Key"
                    name="google_key"
                    value={google_key}
                    onChange={(e) => setGoogle_key(e.target.value)}
                  />

                
                </Form.Group>
              </div>

          
            </div>
          <div class="row">
          <div class="col-md-12">
                <Form.Group>
                  <label htmlFor="exampleInputName1" className="l_one">GateWay KEY</label>
                  <Form.Control
                    required
                    type="text"
                    className="form-control f_one"
                    id="exampleInputName1"
                    placeholder="Gateway Key"
                    name="gateway_key"
                    value={gateway_key}
                    onChange={(e) => setGateway_key(e.target.value)}
                  />

                
                </Form.Group>
              </div>

          
            </div>

            <div class="row">

            <div class="col-md-12">
                <Form.Group>
                  <label htmlFor="exampleInputName1" className="l_one">Token </label>
                  <Form.Control
                    required
                    type="text"
                    className="form-control f_one"
                    id="exampleInputName1"
                    placeholder="Token"
                    name="token_expire"
                    value={token_expire}
                    onChange={(e) => setToken_expire(e.target.value)}
                  />

                
                </Form.Group>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <Form.Group>
                  <label htmlFor="exampleInputName1" className="l_one">FCM KEY</label>
                  <Form.Control
                    required
                    type="text"
                    className="form-control f_one"
                    id="exampleInputName1"
                    placeholder="FCM Key"
                    name="fcm_key"
                    value={fcm_key}
                    onChange={(e) => setFcm_key(e.target.value)}
                  />

                
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
  )
}

export default AppSattingUpdate