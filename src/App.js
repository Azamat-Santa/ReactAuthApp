import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Registration from "./pages/Registration/Registration";
import Authorization from "./pages/Authorization/Authorization";
import "antd/dist/antd.css";
import UserList from './pages/UsersList/UserList';
const App = () => {
  const [modalActive, setModalActive] = useState(false);
  
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Registration
              modalActive={modalActive}
              setModalActive={setModalActive}
            />
          }
        />
        <Route
          exact
          path="/auth"
          element={
            <Authorization
              modalActive={modalActive}
              setModalActive={setModalActive}
            />
          }
        />
        <Route
          exact
          path="/userList"
          element={
            <UserList
              modalActive={modalActive}
              setModalActive={setModalActive}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
