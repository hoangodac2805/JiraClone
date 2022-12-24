import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { Button, Layout } from "antd";
import Header from "../../components/Home/Header";
import UserProfileCSS from "./UserProfileTemplate.module.css";
import { USER_LOGIN } from "../../util/constants/SettingSystem";
export const UserProfileTemplate = (propsRoute) => {
  // const { userInfo } = useSelector((state) => state.UserProfileReducer);
 const userInfo = JSON.parse(localStorage.getItem(USER_LOGIN))
  let { Component, ...restRouter } = propsRoute;
  return (
    <Route
      {...restRouter}
      render={(propsRoute) => {
        return (
          <div className={UserProfileCSS.userFrofile}>
            <div
              className="container text-light"
              style={{ paddingTop: "85px" }}
            >
              <div className={UserProfileCSS.header}>
                <div>
                  <h4 className="text-light">USER PROFILE</h4>
                </div>
                <div>
                  <h5 className="text-light">Hi!! {userInfo?.name}</h5>
                  <h5 className="text-light">ID: {userInfo?.id}</h5>
                </div>
              </div>
              <div className={UserProfileCSS.body}>
                <h4 className="text-light text-center pt-5">
                  Your Information
                </h4>
                <div className="row container p-5">
                  <div className="col-6">
                    <div>
                      <i
                        className="fa fa-chart-line text-danger"
                        style={{ fontSize: "30px" }}
                      ></i>
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "30px",
                          color: "rgba(225, 143, 81, 1)",
                        }}
                      >
                        Marketing
                      </span>
                      <p className="px-5">
                        We've created the marketing campaign of the website. It
                        was a very interesting collaboration.
                      </p>
                    </div>
                    <div>
                      <i
                        className="fab fa-laravel text-danger"
                        style={{ fontSize: "30px" }}
                      ></i>
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "30px",
                          color: "rgba(225, 143, 81, 1)",
                        }}
                      >
                        Fully Coded in HTML5
                      </span>
                      <p className="px-5">
                        We've developed the website with HTML5 and CSS3. The
                        client has access to the code using GitHub.
                      </p>
                    </div>
                    <div>
                      <i
                        className="fab fa-connectdevelop text-danger"
                        style={{ fontSize: "30px" }}
                      ></i>

                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "30px",
                          color: "rgba(225, 143, 81, 1)",
                        }}
                      >
                        Built Audience
                      </span>
                      <p className="px-5">
                        There is also a Fully Customizable CMS Admin Dashboard
                        for this product.
                      </p>
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <Component {...propsRoute}></Component>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    ></Route>
  );
};
