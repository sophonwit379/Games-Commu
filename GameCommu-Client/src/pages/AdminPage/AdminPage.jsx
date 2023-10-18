import React from "react";
import { Routes, Route } from "react-router-dom";
import {TablePages} from "../AdminTablePage/TablePages"
import {SideBarMenu} from "./SideBarMenu"
import "./SideBarMenu.css"
import "./AdminPage.css"
import {AddGamePage} from '../AddGamePage/AddGamePage'

function AdminPage() {
  return (
    <div className="AdminPageAll-con">
      <div className="AdminPageSide-con">
        <SideBarMenu/>
      </div>
      <div className="AdminPageContent">
        <Routes>
          <Route path="/ReportTable" element={<TablePages props="report"/>} />
          <Route path="/RequestTable" element={<TablePages props="request"/>} />
          <Route path="/AddGame" element={<AddGamePage/>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
