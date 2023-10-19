import React from "react";
import "bootstrap/js/dist/collapse";
import "bootstrap/js/dist/dropdown";
import "./SideBarMenu.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";
import { useFetchUserQuery } from "../../store";

export function SideBarMenu(props) {
  const {data, isFetching} = useFetchUserQuery();
  if(isFetching){
    return <td>Loading.......</td>;
  }else{
    console.log(data);
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
                  className="nav-link text-white my-1 text-center text-sm-start"
                  aria-current="page"
                >
                  <Link to="ReportTable" className="text-white text-decoration-none" props="request">
                  <i className="bi bi-bell-fill"></i>
                  <span className="ms-2 d-none d-sm-inline">
                      Report
                  </span>
                  </Link>
                </button>
              </li>
              <li className="nav-item my-1 py-2 py-sm-0">
                <button
                  className="nav-link text-white my-1 text-center text-sm-start"
                  aria-current="page"
                >
                  <Link to="RequestTable" className="text-white text-decoration-none" props="request">
                  <i className="bi bi-exclamation-lg"></i>
                  <span className="ms-2 d-none d-sm-inline">
                      Request
                  </span>
                  </Link>
                </button>
              </li><li className="nav-item my-1 py-2 py-sm-0">
                <button
                  className="nav-link text-white my-1 text-center text-sm-start"
                  aria-current="page"
                >
                  <Link to="AddGame" className="text-white text-decoration-none">
                  <i className="bi bi-plus-circle-fill"></i>
                  <span className="ms-2 d-none d-sm-inline">
                      Add Game
                  </span>
                  </Link>
                </button>
              </li><li className="nav-item my-1 py-2 py-sm-0">
                <button
                  className="nav-link text-white my-1 text-center text-sm-start"
                  aria-current="page"
                >
                  <Link to="commus" className="text-white text-decoration-none">
                  <i className="bi bi-building-fill"></i>
                  <span className="ms-2 d-none d-sm-inline">
                      All Community
                  </span>
                  </Link>
                </button>
              </li>
            </ul>
            <div className="dropdown open" id="dropdownLogout">
              <a
                className="btn bordor-none dropdown-toggle text-white text-center text-sm-start"
                type="button"
                id="triggerId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle f5-4"></i>
                <span className="fs-5 ms-2 d-none d-sm-inline">{data.name}</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="triggerId">
                <button className="dropdown-item" href="/admin">
                  <Link to="/">
                    Log out
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default SideBarMenu;
