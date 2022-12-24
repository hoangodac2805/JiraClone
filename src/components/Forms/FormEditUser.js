import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_SUBMIT_MODAL_ANTD } from "../../redux/Types/ModalType";
import { EDIT_USER_SAGA } from "../../redux/Types/UserManagementType";
export default function FormEditUser() {
  const { userEdit } = useSelector((state) => state.UserManagementReducer);
  const dispatch = useDispatch();
  let [editInfo, setEditInfo] = useState({
    values: {
      id: "",
      passWord: "",
      email: "",
      name: "",
      phoneNumber: "",
    },
    errors: {
      id: "",
      passWord: "",
      email: "",
      name: "",
      phoneNumber: "",
    },
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    let valuesUpdate = { ...editInfo.values };
    let errorsUpdate = { ...editInfo.errors };
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

    setEditInfo({
      values: valuesUpdate,
      errors: errorsUpdate,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: EDIT_USER_SAGA,
      data: editInfo,
    });
  };
  useEffect(() => {
    if (editInfo.values.id !== userEdit.userId) {
      setEditInfo({
        ...editInfo,
        values: {
          id: userEdit.userId,
          passWord: "",
          email: userEdit.email,
          name: userEdit.name,
          phoneNumber: userEdit.phoneNumber,
        },
      });
    }

    dispatch({
      type: SET_SUBMIT_MODAL_ANTD,
      submitAction: handleSubmit,
    });
    return () => {};
  }, [editInfo, userEdit]);

  return (
    <form className="row">
      <div className="form-group col-12">
        <p className="mb-1">ID:</p>
        <input
          name="userId"
          className="form-control"
          disabled
          value={editInfo.values.id}
        ></input>
      </div>
      <div className="form-group col-6">
        <p className="mb-1">Name:</p>
        <input
          onChange={handleChange}
          name="name"
          className="form-control"
          value={editInfo.values.name}
        ></input>
        <span className="text-danger ml-2">{editInfo.errors.name}</span>
      </div>
      <div className="form-group col-6">
        <p className="mb-1">Email:</p>
        <input
          onChange={handleChange}
          name="email"
          className="form-control"
          value={editInfo.values.email}
        ></input>
        <span className="text-danger ml-2">{editInfo.errors.email}</span>
      </div>
      <div className="form-group col-6">
        <p className="mb-1">PassWord:</p>
        <input
          onChange={handleChange}
          type="password"
          name="passWord"
          className="form-control"
          value={editInfo.values.passWord}
        ></input>
        <span className="text-danger ml-2">{editInfo.errors.passWord}</span>
      </div>
      <div className="form-group col-6">
        <p className="mb-1">PhoneNumber:</p>
        <input
          onChange={handleChange}
          name="phoneNumber"
          className="form-control"
          value={editInfo.values.phoneNumber}
        ></input>
        <span className="text-danger ml-2">{editInfo.errors.phoneNumber}</span>
      </div>
    </form>
  );
}
