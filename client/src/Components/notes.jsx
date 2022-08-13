import { Component } from "react";
import axios from "axios";
import { Col, Row } from "reactstrap";
import ViewOfferBackPanelCss from "../stylesheets/note.css";
import BASEURL from "../url";

class ViewAllNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      notes: [],
    };
    this.navigateToAddNotes = this.navigateToAddNotes.bind(this);
    this.navigateToEditDeletePage = this.navigateToEditDeletePage.bind(this);
  }

  componentDidMount() {
    const path = window.location.pathname.split("/");
    const id = path[path.length - 1];
    this.setState({
      userId: id,
    });

    axios.get(`${BASEURL}note/userid/${id}`).then((response) => {
      this.setState({ notes: response.data.data });
    });
  }

  navigateToAddNotes(e, id) {
    window.location = `/add/note/${id}`;
  }

  navigateToEditDeletePage(e, noteId) {
    window.location = `/edit/delete/note/${noteId}`;
  }

  render() {
    return (
        <div>
            <Row>
                <Col sm="1"></Col>
                <Col sm="10">
                    <Row>
                        <div className="container">
                            <row className="d-flex justify-content">
                                <h1 className="topicviewNotes">View notes</h1>
                                <button
                                    className="searchButton"
                                    onClick={(e) =>
                                        this.navigateToAddNotes(e, this.state.userId)
                                    }
                                >
                                    Add Notes
                                </button>
                            </row>
                                {this.state.notes.length > 0 && this.state.notes.map((item, index) => (
                                    <div
                                        key={index}
                                        className="card text-dark bg-lightbg-light mb-3 "
                                        style={{ marginTop: "20pt" }}
                                    >
                                        <div className="card-body">
                                            <Row>
                                                <Col sm="2">
                                                    <img
                                                        src="https://upload.wikimedia.org/wikipedia/commons/8/8d/Paper-notes.svg"
                                                        alt="item image"
                                                        className="imageBoxOffer"
                                                    />
                                                </Col>
                                                <Col sm="10">
                                                    <Row>
                                                        <Col sm="1"></Col>
                                                        <Col sm="8">
                                                            <h4 className="offerNamefont">
                                                                {item.noteTittle}
                                                            </h4>
                                                            <h5 className="offerDetails">
                                                                {item.noteMessage}
                                                            </h5>
                                                            <br />
                                                        </Col>
                                                        <Col sm="2">
                                                            <button
                                                                className="deleteButton"
                                                                onClick={(e) =>
                                                                    this.navigateToEditDeletePage(e, item._id)
                                                                }
                                                            >
                                                                Edit/Delete
                                                            </button>
                                                        </Col>
                                                        <Col sm="1"></Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </Row>
                </Col>
                <Col sm="1"></Col>
            </Row>
        </div>
    );
  }
}

export default ViewAllNotes;