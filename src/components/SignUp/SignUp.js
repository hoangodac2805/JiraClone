import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { SET_SUBMIT_MODAL_ANTD, SET_SUBMIT_POPUP } from "../../redux/Types/ModalType";
import { SIGN_UP_SAGA } from "../../redux/Types/SignUpType";
export default function SignUp() {

  const dispatch = useDispatch();
  let [signUp, setSignUp] = useState({
    values: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    errors: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
  });
  useEffect(() => {
    dispatch({
      type: SET_SUBMIT_MODAL_ANTD,
      submitAction: handleSubmit,
    });

    return () => {};
  }, [signUp.values]);
  const handleSubmit = () => {
    dispatch({
      type: SIGN_UP_SAGA,
      signUpInfo: signUp,
    });
  };
  const handleChange = (e) => {
    let { name, value } = e.target;
    let valuesUpdate = { ...signUp.values };
    let errorsUpdate = { ...signUp.errors };
    valuesUpdate[name] = value;
    //Kiểm tra rỗng
    if (value.trim() === "") {
      errorsUpdate[name] = name + " is required";
    } else {
      errorsUpdate[name] = "";
    }
    //Kiểm tra email
    var regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (name === "email") {
      if (regexEmail.test(value)) {
        errorsUpdate[name] = "";
      } else {
        errorsUpdate[name] = name + " is invalid!";
      }
    }
    //Kiểm tra số
    var regexNumber = /^[0-9]+$/;
    if (name === "phoneNumber") {
      if (regexNumber.test(value)) {
        errorsUpdate[name] = "";
      } else {
        errorsUpdate[name] = name + " is invalid!";
      }
    }

    setSignUp({
      values: valuesUpdate,
      errors: errorsUpdate,
    });
  };
  return (
    <form className="container-fluid">
      <h4 className="text-center">Thông tin đăng ký</h4>
      <div className="row">
        <div className="col-6 form-group">
          <span>Email</span>
          <input
            value={signUp.values.email}
            onChange={handleChange}
            type="email"
            name="email"
            className="form-control"
            placeholder="email@gmail.com"
          ></input>
          <span className="text-danger">{signUp.errors.email}</span>
        </div>
        <div className="col-6 form-group">
          <span>Password</span>
          <input
            value={signUp.values.password}
            onChange={handleChange}
            type="password"
            name="passWord"
            className="form-control"
            placeholder="password"
          ></input>
          <span className="text-danger">{signUp.errors.passWord}</span>
        </div>
        <div className="col-6 form-group">
          <span>Name</span>
          <input
            value={signUp.values.name}
            onChange={handleChange}
            type="type"
            name="name"
            className="form-control"
            placeholder="Ngô Đắc Hoà"
          ></input>
          <span className="text-danger">{signUp.errors.name}</span>
        </div>
        <div className="col-6 form-group">
          <span>PhoneNumber</span>
          <input
            value={signUp.values.phoneNumber}
            onChange={handleChange}
            type="type"
            name="phoneNumber"
            className="form-control"
            placeholder="0901433***"
          ></input>
          <span className="text-danger">{signUp.errors.phoneNumber}</span>
        </div>
      </div>
    </form>
  );
}
