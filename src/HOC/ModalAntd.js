import { Modal } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_MODAL_ANTD } from "../redux/Types/ModalType";
export default function ModalAntd() {
  const { isModalOpen, submitAction, title, content } = useSelector(
    (state) => state.ModalANTDReducer
  );
  const dispatch = useDispatch();
  return (
    <Modal
      title={title}
      open={isModalOpen}
      onOk={submitAction}
      onCancel={() => {
        dispatch({
          type: CLOSE_MODAL_ANTD,
        });
      }}
    >
      {content}
    </Modal>
  );
}
