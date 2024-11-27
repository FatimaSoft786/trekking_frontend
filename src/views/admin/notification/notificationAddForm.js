import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import axios from "axios";
import "../../table.css";
import '../../btn.css';
import Admin from "layouts/Admin.js";

const NotificationAddForm = () => {
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [validated, setValidated] = useState(false);
    const [alertUsertype, setalertusertype] = useState(true);
    const [showAgentDropdown, setShowAgentDropdown] = useState(false);
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
    const [showHospitalDropdown, setShowHospitalDropdown] = useState(false);
    const [user_id, setUser_id] = useState("");
    const [userData, setUserData] = useState([]);
    const [booking_id, setBooking_id] = useState("");
    const [BookingData, setBookingData] = useState("");

    let Intoken = JSON.parse(localStorage.getItem('data'))
    useEffect(() => {
        refreshToken();
    }, []);
    const refreshToken = async () => {
        //   try {
        //     const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/token`);
        if (Intoken) {
            setToken(Intoken.accessToken);
        }
    };

    // customer get -----------------------------------

    useEffect(() => {
        const getUser = async () => {
            const getUser_Data = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/allUser`,
                {
                    headers: {
                        Authorization: `Bearer ${Intoken.accessToken}`,
                    },
                }
            );
            setUserData(getUser_Data.data.users);
            console.log("getUser_Data.data.users",getUser_Data.data.users)
        };
        getUser();
    }, []);


    const addData = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {

            try {
                // const token = await generateToken();
                const postData = {
                    title: title,
                    message: message,
                    user_id: user_id,
                    booking_id: "1",
                };
                console.log("postData===>", postData)
                // return
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_URL}/Notification/Add_notification`,
                    postData,
                    {
                        headers: {
                            Authorization: `Bearer ${Intoken.accessToken} `,
                        },
                    }
                );
                console.log("Data added successfully", response);
                navigate("/admin/notification/notificationTable");
            } catch (error) {
                console.error("Error adding data:", error);
            }
        }
        setValidated(true);
    };

    const previes = () => {
        navigate("/admin/notification/notificationTable");
    };

    return (
        <>
            <Admin />
            <div className=" grid-margin stretch-card card_p2">
                <div className="card ml">
                    <div className="table1_a dd2">
                        <div class="table2_b">AddForm </div>
                    </div>
                    <div className="card-body card_b1">
                        <Form
                            className="forms-sample"
                            noValidate
                            validated={validated}
                            onSubmit={addData}
                        >
                            <div class="row">
                                <div class="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputName1" className="l_one"> Title</label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="form-control f_one"
                                            id="exampleInputName1"
                                            placeholder="Title"
                                            name="title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {" "}
                                            Please provide a title
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                                <div class="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputName1" className="l_one"> Message</label>
                                        <Form.Control
                                            required
                                            type="text"
                                            className="form-control f_one"
                                            id="exampleInputName1"
                                            placeholder="message"
                                            name="Message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {" "}
                                            Please provide a message
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <Form.Group>
                                        <label htmlFor="exampleInputName1" className="l_one">Agent </label>
                                        <select
                                            required
                                            name="user_id"
                                            className="form-control"
                                            value={user_id}
                                            onChange={(e) => setUser_id(e.target.value)}
                                        >
                                            <option value="0">--Select User--</option>
                                           <option value="All">All User</option>
                                            {userData.map((item) => (
                                                <option key={item.user_id} value={item.user_id}>
                                                    {" "}
                                                    {item.first_name}
                                                </option>
                                            ))}
                                        </select>
                                        <Form.Control.Feedback type="invalid">
                                            {" "}
                                            Please provide a Name
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>

                            </div>

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

export default NotificationAddForm