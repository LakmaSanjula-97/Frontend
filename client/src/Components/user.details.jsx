import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import RegisterCss from "../stylesheets/register.css";
import axios from "axios";
import { matchRoutes, useParams } from "react-router-dom";
import BASEURL from "../url";

class UserData extends Component {
    constructor(props) {
        super(props);
        this.state = {
        id: "",
        fullName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        status: "",
        dateOfBirth: "",
        accountType: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToLogin = this.navigateToLogin.bind(this);
    }

    componentDidMount() {
        const path = window.location.pathname.split("/");
        const id = path[path.length - 1];

        axios.get(`${BASEURL}user/get/id/${id}`).then((response) => {
            this.setState({
                id: id,
                email: response.data.data.email,
                password: response.data.data.password,
                status: response.data.data.status,
                accountType: response.data.data.accountType,
            });
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        let user = {
            firstName: this.state.fullName,
            lastName: this.state.lastName,
            dateOfBirth: this.state.dateOfBirth,
            mobile: this.state.mobile,
            status: true,
            password: this.state.password,
        };
        console.log("User Data", user);

        axios.put(`${BASEURL}user/update/${this.state.id}`, user).then((response) => {
            console.log("Data :", response);
            this.state.id = response.data.data._id;
            console.log("UserID :", this.state.id);
            alert("Success");
            this.navigateToLogin(e);
        })
        .catch((error) => {
            console.log(error.message);
            alert("fill required details");
      });
    }

    navigateToLogin(e) {
        window.location = `/`;
    }

    render() {
        return (
            <div style={{ paddingTop: "1rem" }}>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5"></Col>
                    <Col sm="5">
                        <h3 className="register">Fill your Details</h3>
                        <h6 className="instructions">
                            Please fill the following form and go through the guided process
                        </h6>
                        <form onSubmit={this.onSubmit}>
                            <input
                                className="inputfield"
                                placeholder="First Name"
                                name="fullName"
                                value={this.state.fullName}
                                required
                                onChange={this.onChange}
                            ></input>
                            <input
                                className="inputfield"
                                placeholder="Last Name"
                                name="lastName"
                                value={this.state.lastName}
                                required
                                onChange={this.onChange}
                            ></input>
                            <input
                                className="inputfield"
                                placeholder="Date Of Birth"
                                type="date"
                                id="date"
                                name="dateOfBirth"
                                value={this.state.dateOfBirth}
                                onChange={this.onChange}
                            ></input>
                            <input
                                type="email"
                                className="inputfield"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                required
                                onChange={this.onChange}
                                disabled
                            ></input>
                            <input
                                type="number"
                                className="inputfield"
                                placeholder="Mobile Number"
                                name="mobile"
                                value={this.state.mobile}
                                required
                                onChange={this.onChange}
                            ></input>
                            <input
                                className="inputfield"
                                placeholder="New Password"
                                name="password"
                                required
                                onChange={this.onChange}
                            ></input>
                            <input
                                className="inputfield"
                                placeholder="Account Type"
                                name="accountType"
                                value={this.state.accountType}
                                required
                                onChange={this.onChange}
                                disabled
                            ></input>

                            <row className="d-flex justify-content-center">
                                <Col sm="1"></Col>
                                <button
                                    type="submit"
                                    className="registerButton"
                                >
                                    Save
                                </button>
                            </row>
                        </form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default UserData;
