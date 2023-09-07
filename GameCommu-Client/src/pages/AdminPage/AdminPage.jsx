import React from "react";
import "./AdminPage.css";
import SideBarMenu from "./SideBarMenu";
import TablePages from "./TablePages";
import HomePage from "../HomePage/HomePage";
import { Routes, Route } from "react-router-dom";

function AdminPage() {
  return (
    <div className="AdminPageAll-con">
      <div className="AdminPageSide-con">
        <SideBarMenu />
      </div>
      <div className="AdminPageContent">
        <Routes>
          <Route path="/table" element={<TablePages />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
