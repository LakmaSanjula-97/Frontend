import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import RegisterCss from "../stylesheets/register.css";
import axios from "axios";
import BASEURL from "../url";

class ManageNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            noteTittle: "",
            noteMessage: "",
            noteId: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.navigateToViewNotes = this.navigateToViewNotes.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        const path = window.location.pathname.split("/");
        const id = path[path.length - 1];
        axios.get(`${BASEURL}note/viewnote/${id}`).then((response) => {
            this.setState({
                userId: response.data.data.userId,
                noteTittle: response.data.data.noteTittle,
                noteMessage: response.data.data.noteMessage,
                noteId: id,
            });
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
            noteTittle: this.state.noteTittle,
            noteMessage: this.state.noteMessage,
        };
        console.log("User Data", note);
        axios.put(`${BASEURL}note/updatenote/${this.state.noteId}`, note).then((response) => {
            console.log("Data :", response);
            this.state.userId = response.data.data.userId;
            console.log("UserID :", this.state.userId);
            alert("Success");

            this.navigateToViewNotes(e, this.state.userId);
        })
        .catch((error) => {
            console.log(error.message);
            alert("Please fill the required details");
        });
    }

    onDelete(e) {
        axios
        .delete(`${BASEURL}note/deletenote/${this.state.noteId}`).then((response) => {
            this.navigateToViewNotes(e, this.state.userId);
        })
        .catch((error) => {
            console.log(error.message);
            alert(error.message);
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
                        <h3 className="register">Edit Note</h3>

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
                        <row className="d-flex justify-content-between">
                            <Col sm="2"></Col>
                            <button
                                type="submit"
                                className="saveButton"
                                onClick={(e) => this.onSubmit(e)}
                            >
                                Update
                            </button>
                            <button
                                type="submit"
                                className="saveButton"
                                onClick={(e) => this.onDelete(e)}
                            >
                                Delete
                            </button>
                            <Col sm="1"></Col>
                        </row>
                    </Col>
                    <Col sm="1"></Col>
                </Row>
            </div>
        );
    }
}

export default ManageNotes;
