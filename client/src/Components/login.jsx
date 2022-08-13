import React, { Component } from "react";
import { Button, Col, Row, Modal } from "reactstrap";
import axios from "axios";
import LoginCss from "../stylesheets/login.css";
import { Mail } from "react-feather";
import login from "../Components/Auth/auth";
import BASEURL from "../url";
import "../stylesheets/login.css"

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateToNotes = this.navigateToNotes.bind(this);
        this.navigateAllUserDetails = this.navigateAllUserDetails.bind(this);
        this.navigateToUserInformation = this.navigateToUserInformation.bind(this);
        this.state = {
            id: "",
            email: "",
            password: "",
            closeModal: false,
            userType: "",
            status: "",
        };
        this.toggle = this.toggle.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let loginForm = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(loginForm);

        axios.post(`${BASEURL}login/user`, loginForm).then((response) => {
            this.setState({
                closeModal: true,
                userType: response.data.result.accountType,
                status: response.data.result.status,
            });
            localStorage.setItem("Login message", response.data.message);
            localStorage.setItem("UserToken", response.data.token);

            let userType = response.data.result.accountType;
            let status = response.data.result.status;
            const val = this.state.closeModal;
            console.log(val);
            this.setState({
                id: response.data.result._id,
            });
        })
        .catch((error) => {
            console.log(error.message);
            alert("Invalid Login. Please retry again");
        });
    }

    toggle(e) {
        this.setState({
            closeModal: !this.state.closeModal,
        });
    }

    onSuccess(e) {
        this.toggle(e);
        if (this.state.status == false) {
            console.log(this.state.status);
            this.navigateToUserInformation(e, this.state.id);
        } else if (this.state.userType == "Student") {
            console.log(this.state.userType);
            this.navigateToNotes(e, this.state.id);
        } else if (this.state.userType == "Admin") {
            console.log(this.state.userType);
            this.navigateAllUserDetails(e);
        }
    }

    navigateToNotes(e, id) {
        window.location = `/view/notes/${id}`;
    }

    navigateAllUserDetails(e) {
        window.location = "/all/userdetails";
    }

    navigateToUserInformation(e, id) {
        window.location = `/user/information/${id}`;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div style={{ paddingTop: "1rem" }}>
                <Row>
                    <Col sm="1"></Col>
                    
                    <div>
                        <img
                            className="logimage"
                            src={require('../images/login.webp')}
                            alt="First slide"
                        />
                    </div>
                    <Col sm="5"></Col>
                    <Col sm="4">
                        
                        <h3 className="login">LOGIN</h3>
                        <input
                            className="input_field"
                            placeholder="Enter Email "
                            name="email"
                            id="email"
                            value={this.state.email}
                            onChange={this.onChange}
                        ></input>

                        <input
                            className="input_field"
                            placeholder="Enter Password "
                            name="password"
                            id="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            type="password"
                        ></input>

                        <row className="d-flex justify-content-center">
                            <Col sm="5"></Col>
                            <button 
                                className="loginbutton" 
                                onClick={(e) => this.onSubmit(e)}>
                                <span className="btnTxt">
                                    LOGIN
                                </span>
                            </button>

                            <Modal
                                isOpen={this.state.closeModal}
                                style={{ alignSelf: "center", marginTop: "5vh" }}
                            >
                                <div
                                    style={{
                                        paddingLeft: "3vh",
                                        paddingRight: "3vh",
                                        paddingBottom: "2vh",
                                        paddingTop: "1vh",
                                    }}
                                >
                                    <Row>
                                        <Col md="12">
                                            <h5
                                                style={{
                                                    textAlign: "center",
                                                    paddingTop: "1vh",
                                                    paddingBottom: "-1vh",
                                                }}
                                            >
                                                Succesfully Login
                                            </h5><br />
                                            <div>
                                                <Button
                                                    className="btn-success"
                                                    outline
                                                    onClick={(e) => this.onSuccess(e)}
                                                    style={{
                                                        width: "140px",
                                                        height: "40px",
                                                        borderRadius: "2vh",
                                                        color: "white",
                                                    }}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Modal>
                        </row>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
            </div>
        );
    }
}

export default Login;
