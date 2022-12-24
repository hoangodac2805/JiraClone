import React from "react";

import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../util/constants/SettingSystem";
export default function UserProfile() {


  if (localStorage.getItem(USER_LOGIN)) {
    const userInfo = JSON.parse(localStorage.getItem(USER_LOGIN))
    return (
      <div>
        <div className="py-3">
          <i
            className="fa fa-user-astronaut "
            style={{ fontSize: "25px", color: "rgba(224, 182, 122, 1)" }}
          ></i>
          <span
            style={{
              marginLeft: "10px",
              fontSize: "25px",
              color: "rgba(102, 147, 227, 1)",
            }}
          >
            Name:
          </span>
          <p>{userInfo.name}</p>
        </div>
        <div className="py-3">
          <i
            className="fa fa-blender-phone "
            style={{ fontSize: "25px", color: "rgba(224, 182, 122, 1)" }}
          ></i>

          <span
            style={{
              marginLeft: "10px",
              fontSize: "25px",
              color: "rgba(102, 147, 227, 1)",
            }}
          >
            Phone:
          </span>
          <p>{userInfo.phoneNumber}</p>
        </div>
        <div className="py-3">
          <i
            className="fa fa-envelope-open-text"
            style={{ fontSize: "25px", color: "rgba(224, 182, 122, 1)" }}
          ></i>
          <span
            style={{
              marginLeft: "10px",
              fontSize: "25px",
              color: "rgba(102, 147, 227, 1)",
            }}
          >
            Email:
          </span>
          <p>{userInfo.email}</p>
        </div>
      </div>
    );
  } else {
    alert("Vui lòng đăng nhập để vào trang này !");
    return <Redirect to="./login"></Redirect>;
  }
}
