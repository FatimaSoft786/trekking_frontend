import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../btn.css";
import "../../table.css";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import { downloadExcel } from "react-export-table-to-excel";
import paginationFactory from "react-bootstrap-table2-paginator";

import Button from "react-bootstrap/Button";
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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AdminTable = () => {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const [admin_id, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const navigate = useNavigate();

  const columns = [
    {
      name: "Id",
      // selector : "id",
      // cell: (row, index) => index + 1,
      cell: (row) => {
          return <div>{row.admin_id}</div>;
        },
    },

    {
      name: "IMAGE",
      selector: (row) => (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${row.Admin_profile_img}`}
          style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
        />
      ),
      // style={{width: 40, height: 40, borderRadius: 40/ 2}}
    },
    {
      name: "NAME",
      selector: (row) => row.admin_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.admin_email,
      sortable: true,
    },

    {
      name: "PHONE NUMBER",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      sortable: true,
    },
   
   
    {
      name: "ACTION",
      cell: (row) => (
        <NavLink to={{ pathname: `/adminUpdateForm/${row.admin_id}` }}>
         <button className="ab_btn">
            {" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-square stroke-1.5 w-4 h-4 mr-1"><path d="m9 11 3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
             Edit </button>
        </NavLink>
      ),
      // cell : row => <button> delete</button>
    },
    {
      cell: (row) => (
        <button
        className="de_btn"
        onClick={() => deleteuser(row.admin_id)}
        // onclick="document.getElementById('id01').style.display='block'" class="w3-button w3-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 stroke-1.5 w-4 h-4 mr-1"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
       Delete
      </button>
      ),
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,

    onPageChange: function (page, sizePerPage) {
      console.log(page, "page");
      console.log(sizePerPage, "sizePerPage");
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log(page, "page");
      console.log(sizePerPage, "sizePerPage");
    },
  });

  useEffect(() => {
    refreshToken();

    getUsers();
  }, []);
 

  useEffect(() => {
    const result = users.filter((user) => {
      return (
        user.admin_name?.toLowerCase().match(search.toLowerCase()) ||
        user.admin_email?.toLowerCase().match(search.toLowerCase()) ||
        user.phone_number?.toLowerCase().match(search.toLowerCase()) ||
        user.status?.toLowerCase().match(search.toLowerCase()) ||
        user.role?.toLowerCase().match(search.toLowerCase())
         );
    });

    setFilteruser(result);
  }, [search]);


  let data = JSON.parse(localStorage.getItem("data"));
  const refreshToken = async () => {
      if (data) {
      setToken(data.accessToken);
    }
  };


  const getUsers = async () => {
    const response = await axios.get(
       `${process.env.REACT_APP_BACKEND_URL}/Admin/getAllAdmin`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    console.log("response.data_User=====>",response.data)
    setUsers(response.data.users);
    setFilteruser(response.data.users);
    setLoading(false);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteConfirmed = async (id) => {
    await axios.delete(
         `${process.env.REACT_APP_BACKEND_URL}/Admin/deleteAdmin/${admin_id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );
       getUsers();
       toggleDeleteModal();
   };
 
   const deleteuser = (id) => {
    setSelectedUserId(id);
    toggleDeleteModal(); // Open the delete confirmation modal
  };
  const Add_record = () => {
    navigate("/adminAddForm");
  };


  const conditionalRowStyles = [
    {
      when: (row) => row.status === "InActive",
      style: {
        backgroundColor: "darkgray",
        // color: "white",
      },
    },
  ];
  return (
    <div className="w3-container w3-center w3-animate-bottom">
      <div className="col-lg-12 grid-margin stretch-card card_pad">
        <div className="card">
          <div className="table1_a mt1">
            <div className="table2_b">Admin Data</div>
          </div>
          <div className="search_fix">
            <div class="table3_c">

              <button className= "tbn" onClick={Add_record}>
                Add Record
              </button>
             
              {/* <div className="plus_card"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus stroke-1.5 w-4 h-4"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg> </div> */}
            </div>
            <InputGroup className="input-group-alternative search_one" >
              <Input placeholder="Search" type="text" className="ab_control search_two"  value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="search_three" >
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>

          </div>
          <div className="card-body new_cardb">
            <div className="table-responsive">
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
            <div>
            {loading ? (
                            // Show loading spinner when data is being loaded
                            <div className="text-center mt-3">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        ) : (
              <DataTable
              bootstrap4
              keyField="id"
              columns={columns}
              data={filteruser}
              pagination={pagination}
              // fixedHeader
              // fixedHeaderScrollHeight={`${window.innerHeight - 200}px`}
              subHeader
              // highlightOnHover
              // paginationTotalRows={filteruser}
              conditionalRowStyles={conditionalRowStyles} // Apply conditional row styles here
             
              subHeaderAlign="left"
              />
                        )}
            </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminTable;
