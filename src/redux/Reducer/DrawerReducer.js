import { SET_OPEN_DRAWER, SET_SUBMIT_DRAWER } from "../Types/DrawerType";

const stateDefault = {
  openDrawer: false,
  placement: "",
  submitAction: () => {
    alert("mặc định");
  },
  title: "mặc định",
  component: <p>MẶc định</p>,
};
export const DrawerReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case SET_OPEN_DRAWER: {
      return {
        ...state,
        openDrawer: action.status,
        title: action.title,
        placement: action.placement,
        component: action.component,
      };
    }
    case SET_SUBMIT_DRAWER: {
      return { ...state, submitAction: action.submitAction };
    }
    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
