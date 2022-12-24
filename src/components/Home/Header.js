import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div id="navbar-header" style={{ maxHeight: "50px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <div className="row " style={{ width: "100%" }}>
            <div className="col-4">
              <img
                className="navbar-brand"
                src={require("../../assets/img/download.jpg")}
                style={{ width: "35px" }}
              />

              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
            </div>
            <div className="col-8 ">
              <div
                className="collapse navbar-collapse ml-auto w-50"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Jira
                    </a>
                    <div className="dropdown-menu">
                      <NavLink
                        to="./projectManagement"
                        className="dropdown-item"
                        href="#"
                      >
                        Project Management
                      </NavLink>
                      <NavLink
                        to="./userManagement"
                        className="dropdown-item"
                        href="#"
                      >
                        UserManagement
                      </NavLink>
                    </div>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      activeClassName="activeHeader"
                      className="nav-link"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item ">
                    <NavLink
                      activeClassName="activeHeader"
                      className="nav-link"
                      to="/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
