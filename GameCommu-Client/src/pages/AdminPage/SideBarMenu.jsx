import React from "react";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "./SideBarMenu.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function SideBarMenu() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-auto col-sm bg-dark d-flex flex-column min-vh-100 vw-30">
          <a 
            className="text-decoration-none ms-2 d-flex align-item-center text-white d-none d-sm-inline text-center"
            role="button" style={{ pointerEvents: 'none' }}
          >
            <span className="fs-4 ">
              Menu
            </span>
          </a>
          <hr className="text-white d-none d-sm-block"></hr>
          <ul className="nav nav-pills flex-column mt-2 mt-sm-0" id="parentM">
            <li className="nav-item my-1 py-2 py-sm-0">
              <button
                href="#"
                className="text-decoration-none nav-link text-white text-center text-sm-start"
                aria-current="page"
              >
                <i className="bi bi-house"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <Link to="/admin" className="text-white text-decoration-none">Home</Link>
                </span>
              </button>
            </li>
            <li className="nav-item my-1 py-2 py-sm-0">
              <button
                href="#"
                className="nav-link text-white my-1 text-center text-sm-start"
                aria-current="page"
              >
                <i className="bi bi-bell-fill"></i>
                <span className="ms-2 d-none d-sm-inline">
                  <Link to="table" className="text-white text-decoration-none">
                    Report
                  </Link>
                </span>
              </button>
            </li>
          </ul>

          <div className="dropdown open">
            <a
              className="btn bordor-none dropdown-toggle text-white text-center text-sm-start"
              type="button"
              id="triggerId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-person-circle f5-4"></i>
              <span className="fs-5 ms-2 d-none d-sm-inline">asdasd</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="triggerId">
              <button className="dropdown-item" href="/admin">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarMenu;
