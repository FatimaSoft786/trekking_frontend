import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../btn.css";
import "../../table.css";


import { NavLink } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { downloadExcel } from "react-export-table-to-excel";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Nav,
    Container,
    Media,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "../../table.css";
import '../../btn.css';
import Admin from "layouts/Admin.js";
const BookingListing = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [selectedData, setSelectedData] = useState([]);
    const [token, setToken] = useState("");
    const [finalArrayData, setFinalArrayData] = useState([
        {
            name: "",
            phone_number: "",
            age: "",
            food_preference: "",
        },
    ]);

    let Intoken = JSON.parse(localStorage.getItem('data'))
    useEffect(() => {
        refreshToken();
    }, []);

    const refreshToken = async () => {
        if (Intoken) {

            setToken(Intoken.accessToken);
        }

    };
   
    useEffect(() => {
        getProductById();
    }, [id]);
    const getProductById = async () => {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/PaymentBooking/allDetailsByBookingId`,
            {
                booking_id: id,
                Organization: "apl",
                accomodation: "asd",
                mode_of_transportstion: "asd",
                payment_mode: "online"
            },
            {
                headers: {
                    Authorization: `Bearer ${Intoken.accessToken}`,
                },
            }
        );
        setSelectedData(response.data.finalDetails);
        let newArr = [];
        for (let i = 0; i < response.data.finalDetails.trackerDetails.length; i++) {
            newArr.push(response.data.finalDetails.trackerDetails[i]);
        }
        console.log("newArr=============>", newArr)
        setFinalArrayData(newArr, ...finalArrayData);

        // console.log(first)
        // alert(response.data)
        console.log("response.data.finalDetails========>", response.data.finalDetails)

    };
    const previes = () => {
        navigate("/admin/booking/bookingTable");
    };

    return (
        <>
            <Admin />
            <div className=" grid-margin stretch-card card_p2">
                <div className="card ml" >
                    <div className="table1_a dd2">
                        <div className="table2_b">Details</div>
                    </div>

                    <div className="card-body card_b1">
                        <div>
                            <h1 className="add_recipe"> Booking Details:- </h1>
                            <div>
                                <div className="row mb-12">
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Trek Name</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.trek_Name}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Trip Start</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.trip_StartFrom}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Trip End</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.trip_EndAt}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Amount</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.amount}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Number Of Trackers</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.number_of_trackers}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">transaction id</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.transaction_id}
                                        />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label className="mb-2">payment status</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.statusName}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Trek Day</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.trek_day}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">start date</label>
                                        <input
                                            readOnly
                                            type="date"
                                            class="form-control"
                                            value={selectedData.start_date}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">end date</label>
                                        <input
                                            readOnly
                                            type="date"
                                            class="form-control"
                                            value={selectedData.end_date}
                                        />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="mb-2">location</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.location}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Booking Ref No</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.booking_ref_no}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Organization</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.Organization}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">payment mode</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.payment_mode}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">mode of transportstion</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.mode_of_transportstion}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">accomodation</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.accomodation}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Booking Date</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.booking_date}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="mb-2">Total Amount</label>
                                        <input
                                            readOnly
                                            type="text"
                                            class="form-control"
                                            value={selectedData.total_amount}
                                        />
                                    </div>
                                </div>
                                <h1 className="add_recipe"> Trecker Details:- </h1>

                                {finalArrayData.map((x, i) => (
                                    <div key={i}>
                                        {i === 0 ? (
                                            <h5>Trecker :- </h5>
                                        ) : (
                                            <h5>Co Trecker :- </h5>
                                        )}
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">name</label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    value={x.name}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">phone number</label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="phone_number"
                                                    className="form-control"
                                                    value={x.phone_number}
                                                />
                                            </div>

                                            <div className="form-group col-md-6">
                                                <label className="mb-2">age</label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="age"
                                                    className="form-control"
                                                    value={x.age}
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="mb-2">food preference</label>
                                                <input
                                                    readOnly
                                                    type="text"
                                                    name="food_preference"
                                                    className="form-control"
                                                    value={x.food_preference}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                        <div className="text_right">
                            <button className=" btn btn-secondary" onClick={previes}>
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
export default BookingListing;


