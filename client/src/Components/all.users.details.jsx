import React, { Component } from "react";
import axios from "axios";
import { Col, Row } from "reactstrap";
import BASEURL from "../url";

class AllUserDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userDetails: [],
            searchValue: "",
            isSearching: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.navigateToRegisterUser = this.navigateToRegisterUser.bind(this);
        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        axios.get(`${BASEURL}user/get/all`).then((response) => {
            this.setState({ userDetails: response.data.data });
            console.log(this.state.userDetails);
        })
        .catch((error) => {
            alert(error.message);
        });
    }

    onSearch(e, key) {
        this.setState({ isSearching: true });
        console.log(this.state.searchValue);
            axios.get(`${BASEURL}user/search/${key}`).then((response) => {
                this.setState({ userDetails: response.data.data });
                console.log(this.state.userDetails);
            })
            .catch((error) => {
                alert(error.message);
            });
        this.setState({ isSearching: false });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state.searchValue);
    }

    navigateToRegisterUser(e) {
        window.location = `/register`;
    }

    reload(e) {
        if ((this.state.searchValue = "")) {
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <Row className="userRow">
                    <Col sm="1"></Col>
                    <Col sm="10">
                        <Row>
                            <Col sm="6"></Col>
                            <Col sm="6">
                                <row className="d-flex justify-content-right">
                                    <button
                                        type="submit"
                                        className="searchbutton"
                                        onClick={(e) => this.navigateToRegisterUser(e)}
                                    >
                                        Add New User
                                    </button>
                                    <input
                                        type="text"
                                        className="inputfieldUser"
                                        placeholder="Search"
                                        name="searchValue"
                                        value={this.state.searchValue}
                                        required
                                        onChange={this.onChange}
                                    ></input>
                                    <button
                                        type="submit"
                                        className="searchbutton"
                                        onClick={(e) => this.onSearch(e, this.state.searchValue)}
                                    >
                                        Search
                                    </button>
                                </row>
                            </Col>
                        </Row>

                        <h1 className="userTopic">User Details</h1>
                        <table className="table">
                            <tr
                                style={{
                                    borderBottom: "3px solid #ddd",
                                    background: "#341E71",
                                    color: "white",
                                }}
                            >
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Account Type</th>

                                <hr />
                                <hr />
                            </tr>

                            {this.state.userDetails.length > 0 &&
                                this.state.userDetails.map((item, index) => (
                                <tr
                                    key={index}
                                    style={{ borderBottom: "2px solid #ddd" }}
                                    className="rowHover"
                                >
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.dateOfBirth}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.accountType}</td>
                                    <hr /> 
                                    <hr />
                                </tr>
                            ))}
                        </table>
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </div>
        );
    }
}

export default AllUserDetails;
