

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

const TrekdataTable = () => {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const [user_id, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const navigate = useNavigate();

  const columns = [
    {
      name: "Id",
      // selector : "id",
      // cell: (row, index) => index + 1,
      cell: (row) => {
          return <div>{row._id}</div>;
        },
    },
    {
      name: "TREK NAME",
      selector: (row) => row.trek_Name,
      sortable: true,
    },
    // {
    //   name: "Trek",
    //   selector: (row) => row.trek_Name,
    //   sortable: true,
    //   wrap: true,
    //   cell: (row) => <div style={{ whiteSpace: 'pre-wrap' }}>{row.trek_Name}</div>,
    // },
   
    {
      name: "START DATE",
      selector: (row) => row.start_date,
      sortable: true,
    },
    {
      name: "END DATE",
      selector: (row) => row.end_date,
      sortable: true,
    },
    {
      name: "STATE",
      selector: (row) => row.trek_state,
      sortable: true,
    },
  
    {
      name: "PRICE",
      selector: (row) => row.price,
      sortable: true,
    },
   
   
    {
      name: "ACTION",
      cell: (row) => (
        <NavLink to={{ pathname: `/trek/trekdataUpdateForm/${row._id}` }}>
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
        onClick={() => deleteuser(row._id)}
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
      // console.log(page, "page");
      // console.log(sizePerPage, "sizePerPage");
    },
    onSizePerPageChange: function (page, sizePerPage) {
      // console.log(page, "page");
      // console.log(sizePerPage, "sizePerPage");
    },
  });

  useEffect(() => {
    refreshToken();

    getUsers();
  }, []);
 

  useEffect(() => {
    const result = users.filter((user) => {
      return (
        user.trek_Name?.toLowerCase().match(search.toLowerCase()) ||
      user.price?.toLowerCase().match(search.toLowerCase()) ||
        user.start_date?.toLowerCase().match(search.toLowerCase()) ||
        user.end_date?.toLowerCase().match(search.toLowerCase()) ||
        user.trek_state?.toLowerCase().match(search.toLowerCase())
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
       `${process.env.REACT_APP_BACKEND_URL}/Trek/allTrek`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    console.log("getAll_TrekData=====>",response.data.data)
    setUsers(response.data.data);
    setFilteruser(response.data.data);
    setLoading(false);
  };

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };

  const deleteConfirmed = async (id) => {
   var deleteTrek =  await axios.delete(
         `${process.env.REACT_APP_BACKEND_URL}/Trek/DeleteTrek/${user_id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

     //  navigate("/admin/trek/trekdataTable");
       getUsers();
       toggleDeleteModal();
   };
 
   const deleteuser = (id) => {
    setSelectedUserId(id);
    toggleDeleteModal(); // Open the delete confirmation modal
  };
  const Add_record = () => {
    navigate("/trek/trekdataAddForm");
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
            <div className="table2_b">Trek Data</div>
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

export default TrekdataTable;
