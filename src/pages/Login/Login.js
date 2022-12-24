import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

import { OPEN_MODAL_ANTD} from "../../redux/Types/ModalType";
import SignUp from "../../components/SignUp/SignUp";
import { openNotificationWithIcon } from "../../util/Notification/Notification";

import { SIGN_IN_SAGA } from "../../redux/Types/SignInType";
export default function Login(props) {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({
    values: {
      email: "",
      passWord: "",
    },
    errors: {
      email: "",
      passWord: "",
    },
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    let valuesUpdate = { ...login.values };
    let errorsUpdate = { ...login.errors };

    valuesUpdate[name] = value;
    if (value.trim() === "") {
      errorsUpdate[name] = name + " is required";
    } else {
      errorsUpdate[name] = "";
    }
    var regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email") {
      if (regexEmail.test(value)) {
        errorsUpdate[name] = "";
      } else {
        errorsUpdate[name] = name + " is not a valid email address!";
      }
    }
    setLogin({
      values: valuesUpdate,
      errors: errorsUpdate,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let validValues = true;
    let validErrors = true;
    for (let key in login.values) {
      if (login.values[key] === "") {
        validValues = false;
      }
    }
    for (let key in login.errors) {
      if (login.errors[key] !== "") {
        validValues = false;
      }
    }
    if (validValues & validErrors) {
      let signInInfo = login.values;
      dispatch({
        type: SIGN_IN_SAGA,
        signInInfo: signInInfo,
      });
      setLogin({
        values: {
          email: "",
          passWord: "",
        },
        errors: {
          email: "",
          passWord: "",
        },
      });
    } else {
      openNotificationWithIcon("error", "Thông tin không hợp lệ!");
    }
  };
  return (
    <div className="loginCyber">
      <div className="container h-100" style={{ padding: "100px" }}>
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="p-5 bg-light"
            style={{ borderRadius: "5%", width: "500px", height: "450px" }}
          >
            <h3 className=" text-center">Login Page</h3>
            <form className="mb-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <span>Email</span>
                <br></br>
                <Input
                  onChange={handleChange}
                  value={login.values.email}
                  name="email"
                  type="email"
                  size="large"
                  placeholder="Email"
                  prefix={<UserOutlined />}
                />
                <span className="text-danger">{login.errors.email}</span>
              </div>
              <div className="form-group mt-3">
                <span>Password</span>
                <br></br>
                <Input.Password
                  value={login.values.passWord}
                  onChange={handleChange}
                  name="passWord"
                  placeholder="Password"
                />
                <span className="text-danger">{login.errors.passWord}</span>
              </div>
              <Button htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </form>
            <a
              onClick={() => {
         
                dispatch({
                  type: OPEN_MODAL_ANTD,
                  content: <SignUp  />,
                  title: "Đăng ký tài khoản mới",
                });
              }}
              className="text-primary"
            >
              Bấm vào đây để đăng kí tài khoản!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
