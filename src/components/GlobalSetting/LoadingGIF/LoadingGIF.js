import React from "react";
import { useSelector } from "react-redux";
import styleLoading from "./LoadingComponent.module.css";
export default function LoadingGIF() {
  const { isLoading } = useSelector((state) => state.LoadingReducer);
  if (isLoading) {
    return (
      <div className={styleLoading.bgLoading}>
        <img src='./img/loadingGIF.gif'></img>
      </div>
    );
  } else {
    return "";
  }
}
