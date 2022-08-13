import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import RegisterCss from "../stylesheets/register.css";
import axios from "axios";
import { matchRoutes, useParams } from "react-router-dom";
import BASEURL from "../url";

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
        userId: "",
        noteTittle: "",
        noteMessage: "",
    };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToViewNotes = this.navigateToViewNotes.bind(this);
    }

    componentDidMount() {
        const path = window.location.pathname.split("/");
        const id = path[path.length - 1];
        this.setState({
            userId: id,
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onValueChange(event) {
        this.setState({
            selectedOption: event.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let note = {
            userId: this.state.userId,
            noteTittle: this.state.noteTittle,
            noteMessage: this.state.noteMessage,
        };
        console.log("User Data", note);
            axios.post(`${BASEURL}note/create`, note).then((response) => {
                console.log("Data :", response);
                    this.state.userId = response.data.data.userId;
                    console.log("UserID :", this.state.userId);
                    alert("Create Successful");

                this.navigateToViewNotes(e, this.state.userId);
            })
            .catch((error) => {
                console.log(error.message);
                alert("fill all the details");
            });
        }

    navigateToViewNotes(e, id) {
        window.location = `/view/notes/${id}`;
    }

    render() {
        return (
            <div style={{ paddingTop: "1rem" }}>
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="5"></Col>
                    <Col sm="5">
                        <h3 className="register">Add New Note</h3>
                        <form onSubmit={this.onSubmit}>
                                <p className="fontPara">Title</p>
                            <input
                                type="text"
                                className="inputfield"
                                placeholder="Title"
                                name="noteTittle"
                                value={this.state.noteTittle}
                                onChange={this.onChange}
                            ></input>
                            <p className="fontPara">Description</p>
                            <textarea
                                type="text"
                                className="inputTextBox"
                                name="noteMessage"
                                placeholder="Description"
                                value={this.state.noteMessage}
                                onChange={this.onChange}
                            ></textarea>
                            <row className="d-flex justify-content-center">
                                <Col sm="1"></Col>
                                <button type="submit" className="saveButton">
                                    Save
                                </button>
                            </row>
                        </form>
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </div>
        );
    }
}

export default CreateNote;
