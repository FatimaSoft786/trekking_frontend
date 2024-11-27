import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import $ from 'jquery';
import "jquery-ui/ui/widgets/tabs";
import axios from "axios";
import "../../table.css";
import { useNavigate, useParams } from "react-router-dom";
import Admin from "../../../layouts/Admin.js";

const ItineraryUpdateForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [Icon, setIcon] = useState([]);
    const [sections, setSections] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        refreshToken();
        getItineraryById();
    }, [id]);

    const data = JSON.parse(localStorage.getItem("data"));

    const refreshToken = () => {
        setToken(data.accessToken);
    };

    // Fetch icons data
    useEffect(() => {
        const getIcon = async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/Icon/allIcon`,
                {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                }
            );
            const icons = response.data.allIcon.filter(icon => icon.iconStatus === "Active");
            setIcon(icons);
        };
        getIcon();
    }, [data.accessToken]);

    // Fetch itinerary data by ID
    const getItineraryById = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/Itinerary/oneItinerary/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${data.accessToken}`,
                },
            }
        );
        const itinerary = response.data.result;
        setSections(itinerary.sections.map((section, index) => ({ ...section, id: index + 1 })));
        setTimeout(() => {
            $("#tabs").tabs("refresh");
        }, 0);
        
    };

    useEffect(() => {
        $(function () {
            $("#tabs").tabs();
        });
    }, [sections]);

    const handleInputChange = (e, sectionIndex, rowIndex) => {
        const { name, value } = e.target;
        const updatedSections = [...sections];
        updatedSections[sectionIndex].rows[rowIndex][name] = value;
        setSections(updatedSections);
    };

    const handleAddRow = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].rows.push({ icon_id: "", day_name: "", description: "" });
        setSections(updatedSections);
    };

    const handleRemoveRow = (sectionIndex, rowIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].rows.splice(rowIndex, 1);
        setSections(updatedSections);
    };

    const handleAddTab = () => {
        const newSectionId = sections.length + 1;
        setSections([...sections, { id: newSectionId, rows: [{ icon_id: "", day_name: "", description: "" }] }]);

        setTimeout(() => {
            $("#tabs").tabs("refresh");
            $("#tabs").tabs("option", "active", -1);
        }, 0);
    };

    const handleRemoveTab = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        const reindexedSections = updatedSections.map((section, i) => ({
            ...section,
            id: i + 1,
        }));
        setSections(reindexedSections);

        setTimeout(() => {
            $("#tabs").tabs("refresh");
        }, 0);
    };

    const updateuser = async (e) => {
        e.preventDefault();
        const itineraryData = sections.map(section => ({
            section_id: section.id,
            rows: section.rows.map(row => ({
                icon_id: row.icon_id,
                day_name: row.day_name,
                description: row.description
            }))
        }));

        const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/Itinerary/updateItinerary/${id}`, {
            sections: itineraryData
        },
            {
                headers: {
                    Authorization: `Bearer ${data.accessToken} `,
                },
            });
        console.log(res, "updatedata");

        navigate("/admin/itinerary/itineraryTable");
    };

    const previes = () => {
        navigate("/admin/itinerary/itineraryTable");
    };

    return (
        <>
            <Admin />
            <div className="grid-margin stretch-card card_p2">
                <div className="card ml">
                    <div className="table1_a dd2">
                        <div className="table2_b"> Update Data </div>
                    </div>
                    <div className="card-body card_b1">
                        <Form className="forms-sample">
                            <div className="row">
                                <div className="col-md-12">
                                    <input type="button" id="addTab" value="Add Tab" onClick={handleAddTab} />
                                    <div id="tabs">
                                        <ul>
                                            {sections.map((section, index) => (
                                                <li key={section.id} className="tab">
                                                    <a href={`#tab-${section.id}`}>Section {section.id}</a>
                                                    <span className="ui-icon ui-icon-close" role="presentation" onClick={() => handleRemoveTab(index)}>Remove Tab</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {sections.map((section, sectionIndex) => (
                                            <div key={section.id} id={`tab-${section.id}`}>
                                                {section.rows.map((row, rowIndex) => (
                                                    <div key={rowIndex} className="row mb-6">
                                                        <div className="col-md-3">
                                                            <Form.Group>
                                                                <label htmlFor="exampleInputName1" className="l_one"> Icon Name </label>
                                                                <select
                                                                    required
                                                                    name="icon_id"
                                                                    className="form-control"
                                                                    value={row.icon_id}
                                                                    onChange={(e) => handleInputChange(e, sectionIndex, rowIndex)}
                                                                >
                                                                    <option value="">--Select Icon--</option>
                                                                    {Icon.map((item) => (
                                                                        <option key={item.icon_id} value={item.icon_id}>
                                                                            {item.iconName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please select an Icon Name
                                                                </Form.Control.Feedback>
                                                            </Form.Group>
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label className="mb-2 l_one"> Name</label>
                                                            <input
                                                                type="text"
                                                                name="day_name"
                                                                className="form-control f_one"
                                                                onChange={(e) => handleInputChange(e, sectionIndex, rowIndex)}
                                                                value={row.day_name}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-3">
                                                            <label className="mb-2 l_one">Description</label>
                                                            <input
                                                                type="text"
                                                                name="description"
                                                                className="form-control f_one"
                                                                onChange={(e) => handleInputChange(e, sectionIndex, rowIndex)}
                                                                value={row.description}
                                                            />
                                                        </div>
                                                        <div className="form-group col-md-2 mt-4">
                                                            {rowIndex > 0 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleRemoveRow(sectionIndex, rowIndex)}
                                                                >
                                                                    <i className="remove mdi mdi-close-circle-outline check_one"></i>
                                                                </button>
                                                            )}
                                                            {rowIndex === section.rows.length - 1 && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-success"
                                                                    onClick={() => handleAddRow(sectionIndex)}
                                                                >
                                                                    <i className="mdi mdi-loupe check_one"></i>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="text_right">
                                <button className=" btn btn-secondary" onClick={previes}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-gradient-primary" onClick={updateuser}>
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

export default ItineraryUpdateForm;
