import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Space, Drawer } from "antd";
import { SET_OPEN_DRAWER } from "../redux/Types/DrawerType";

export default function DrawerAntd() {
  const dispatch = useDispatch();
  const { openDrawer, submitAction, title, component, placement } = useSelector(
    (state) => state.DrawerReducer
  );
  const closeDrawer = () => {
    dispatch({
      type: SET_OPEN_DRAWER,
      status: false,
    });
  };
  return (
    <div>
      {" "}
      <Drawer
        title={title}
        placement={placement}
        width={window.innerWidth/2}
        height={window.innerHeight/3*2}
        onClose={closeDrawer}
        open={openDrawer}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                submitAction();
           
              }}
            >
              OK
            </Button>
          </Space>
        }
      >
        {component}
      </Drawer>
    </div>
  );
}
