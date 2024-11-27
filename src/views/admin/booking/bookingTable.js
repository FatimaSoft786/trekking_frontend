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
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const BookingTable = () => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [filteruser, setFilteruser] = useState([]);
  const [category_id, setSelectedUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();

  const columns = [
    {
      name: "Id",
      // selector : "id",
      cell: (row, index) => index + 1,
      // cell: (row) => {
      //     return <div>{Number(row.id) + 1}</div>;
      //   },
    },

 
    {
      name: "User Name",
      selector: (row) => row.first_name,
      sortable: true,
    },
    {
      name: "Trek",
      selector: (row) => row.trek_Name,
      sortable: true,
    },
    // {
    //     name: "Trek",
    //     selector: (row) => row.trek_Name,
    //     sortable: true,
    //     wrap: true,
    //     cell: (row) => <div style={{ whiteSpace: 'pre-wrap' }}>{row.trek_Name}</div>,
    //   },
    {
        name: "start date",
        selector: (row) => row.start_date,
        sortable: true,
      },
    {
      name: "Amount",
      selector: (row) => row.price,
      sortable: true,
    },
    // {
    //   name: "insurance",
    //   selector: (row) => row.insurance,
    //   sortable: true,
    // },
    {
      name: "booking Ref no",
      selector: (row) => row.booking_ref_no,
      sortable: true,
    },
   
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    
    {
      name: "total",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
        cell: (row) => (
          <NavLink
          
            to={{ pathname: `/booking/bookingListing/${row.booking_id}` }}
          >
            {" "}
            <button className="ab_btn">
              {" "}
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-square stroke-1.5 w-4 h-4 mr-1"><path d="m9 11 3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              List </button>
          </NavLink>
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
        user.number_of_trackers.toLowerCase().match(search.toLowerCase()) ||
        user.fees.toLowerCase().match(search.toLowerCase()) ||
        user.insurance.toLowerCase().match(search.toLowerCase()) ||
        user.status.toLowerCase().match(search.toLowerCase()) ||
        // user.gst.toLowerCase().match(search.toLowerCase()) ||
        user.total_amount.toLowerCase().match(search.toLowerCase()) ||
        user.base_fare.toLowerCase().match(search.toLowerCase())
      );
    });

    setFilteruser(result);
  }, [search]);

  let data = JSON.parse(localStorage.getItem("data"));

  const refreshToken = () => {
    setToken(data.accessToken);
  };

  // Get user

  const getUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/BookingTemp/getAllBooking`,
      {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      }
    );
    setUsers(response.data.finalArr1);
    setFilteruser(response.data.finalArr1);
    setLoading(false);
  };

  
  const toggleDeleteModal = () => {
    setDeleteModalOpen(!deleteModalOpen);
  };
  // delete Api

  const deleteConfirmed = async () => {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/Category/deleteCategory/${category_id}`,
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
   navigate("/category/categoryAddForm");
  };

  //  Excel function -----------------------------
  const header = [
    "Id",

    "NAME",
    "EMAIL",
    "PHONE NUMBER",
    "GENDER",
    "IMAGE",
    "STATUS",
  ];
  function handleDownloadExcel() {
    downloadExcel({
      fileName: "User Report-to-excel -> downloadExcel method",
      sheet: "User Report-table-to-excel",
      tablePayload: {
        header: header,
        body: users,
      },
    });
  }

  // PDF function -----------------

  const downloadPdf = () => {
    const headers = [
      ["Id", "NAME", "EMAIL", "PHONE NUMBER", "GENDER", "IMAGE", "STATUS"],
    ];
    const doc = new jsPDF();
    doc.text("Users Details", 20, 10);
    doc.autoTable({
      theme: "grid",
      // columns : columns.map(col=>({...col,datakey:col.selector})),
      //   head : headers,
      body: users,
    });
    doc.save("user.pdf");
  };

  //   print function -----------------------

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    // onAfterPrint: ()=> alert("Print success")
  });

  return (
    <div  class="w3-container w3-center w3-animate-bottom"> 
    <div className="col-lg-12 grid-margin stretch-card card_pad">
      <div className="card ">
        <div className="table1_a mt1">
          <div class="table2_b">Booking Data </div>
          </div>
          <div className="search_fix">
            <div class="table3_c">

              {/* <button className= "tbn" onClick={Add_record}>
                Add Record
              </button> */}
              {/* <UncontrolledDropdown>
            <DropdownToggle  className="un_drop" >
              <Media className="" >
              <div className="plus_card">   <i class="fa fa-print print_one"  /></div>
                </Media>
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem to="/admin/user-profile" >
              <i class="fa fa-print"  />
               Print
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem to="/admin/user-profile" >
              <i class="fa fa-file-pdf"  />
               PDF
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem >
              <i class="fa fa-file-excel"  />
                Excel
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown> */}
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
                  <Button color="danger" onClick={deleteConfirmed} className="model_six">Delete</Button>
                </ModalFooter>
              </Modal>
            <div
              ref={componentRef}
              style={{ width: "100%", height: window.innerHeight }}
            >
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

export default BookingTable;