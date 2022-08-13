import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login";
import UserData from "./Components/user.details";
import AllUserDetails from "./Components/all.users.details";
import Register from "./Components/user.register";
import CreateNote from "./Components/create.note";
import ManageNotes from "./Components/manage.notes";
import ViewAllNotes from "./Components/notes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/add/note/:id" element={<CreateNote />} />
          <Route exact path="/view/notes/:id" element={<ViewAllNotes />} />
          <Route exact path="/edit/delete/note/:id" element={<ManageNotes />} />
          <Route exact path="/all/userdetails" element={<AllUserDetails />} />
          <Route path="/user/information/:id" element={<UserData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;