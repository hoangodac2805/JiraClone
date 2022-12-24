import React, { useEffect } from "react";
import "./ProjectDetail.css";
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_SAGA } from "../../../redux/Types/ProjectManagementType";
import { Avatar } from "antd";
import MainBoard from "./MainBoard";
import InfoModal from "./InfoModal";
import { Redirect } from "react-router-dom";
import { GET_USER_BY_PROJECT_SAGA } from "../../../redux/Types/UserManagementType";
export default function MainProjectDetail(props) {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector(
    (state) => state.ProjectManagementReducer
  );

  let { projectId } = props.computedMatch.params;
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_DETAIL_SAGA,
      projectId: projectId,
    });
    dispatch({
      type: GET_USER_BY_PROJECT_SAGA,
      projectId: projectId,
    });

    return () => {};
  }, []);
  if (projectDetail.success !== false) {
    return (
      <div>
        {/* Main Board */}
        <MainBoard projectDetail={projectDetail}></MainBoard>

        {/* Info Modal */}
        <InfoModal projectDetail={projectDetail}></InfoModal>
      </div>
    );
  } else {
    return (
      <div className="container">
        <p>Hiện tại trang đang lỗi! Vui lòng thủ lại sau</p>
      </div>
    );
  }
}
