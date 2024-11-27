
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
  } from "reactstrap";
  import React, { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  
  // import { Form } from 'react-bootstrap';
  import { useNavigate } from 'react-router-dom';
  import axios from 'axios';
  
  import "./login.css";
  const Login = () => {
    const [admin_email, setadmin_email] = useState("");
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [validated, setValidated] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility
  
    // const navigate = useNavigate();
    const navigate = useNavigate();
  
    const Addlogin = async (e) => {
      e.preventDefault();
  
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(false);
      } else {
        try {
          // setIsLoading(true); // Show loader when login process starts
  
          const resp = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/Admin/adminLogin`,
            {
              admin_email: admin_email,
              password: password,
            }
          );
          const user = resp.data;
          console.log("user====>", user)
          // localStorage.setItem("data", JSON.stringify(data.data));
          if (user.data.role !== undefined && user.data.role !== null) {
  
            localStorage.setItem('data', JSON.stringify(user));
  
            if (user.data.role === 1) {
  
              navigate('/admin/dashboard');
              // window.location.reload()
            }
            else if (user.data.role === 0) {
              navigate('/admin/dashboard');
              // window.location.reload();
            }
          } else {
            setMsg('You do not have the required role.');
          }
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
            // console.log(alert(msg))
          }
        }
       
        
      }
      setValidated(true);
      setIsLoading(false); // Hide loader when login process ends
    };
  
      
    return (
      <div class="row">
        {/* <div class="col-lg-6 right_one">
          <div className="sh_text">
  
            <img src={require(".././assets/img/brand/doct.png")} />
            
               </div>
        </div> */}
        <div class="col-lg-6 left_one">
  
          <Card className=" sh_a border-0">
            <CardHeader className="bg-transparent card_bor ">
  
              <h3 className="h3"> LOGIN </h3>
  
            </CardHeader>
            <CardBody className="sh_card" >
              <div className="text-center text-muted ">
              </div>
              <Form role="form"
              noValidate
              validated={validated}
              >
                  <p className="valid">{msg}</p>
                  
                  
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                     
                    </InputGroupAddon>
                    <Input
                    required 
                    type="email"
                     placeholder="Email"
                     value={admin_email}
                      onChange={(e) => setadmin_email(e.target.value)}
                      size="lg"
                      className="sh_card_b"
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                    
                    </InputGroupAddon>
                    <Input
                      required  
                      type="password"
                       placeholder="Password" 
                       size="lg" 
                       className="sh_card_b"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="row">
                  <div className="col text-right"> 
                    <div className="link_h">
                      <Link className="link_h forgot_one">
                        Forgot password
                      </Link>
                    </div>
                  </div>
                </div> */}
               
                <div className=" shcard_f">
                
                    <Button className="my-4 bt_color" color="primary" type="button" onClick={Addlogin}>
                      Sign in
                    </Button>
                  
                </div>
              </Form>
            </CardBody>
          </Card>
  
  
        </div>
      </div>
    );
  };
  
  export default Login;
  