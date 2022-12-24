import {
  CLOSE_MODAL_ANTD,
  OPEN_MODAL_ANTD,
  SET_SUBMIT_MODAL_ANTD,
} from "../Types/ModalType";
const stateDefault = {
  isModalOpen: false,
  title: "mặc đinh",
  content: <p>Mặc định</p>,
  submitAction: () => {
    alert("123123");
  },
  userEdit: {},
};
export const ModalANTDReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL_ANTD: {
      return {
        ...state,
        isModalOpen: true,
        title: action.title,
        content: action.content,
      };
    }
    case CLOSE_MODAL_ANTD: {
      return { ...state, isModalOpen: false };
    }
    case SET_SUBMIT_MODAL_ANTD: {
      return { ...state, submitAction: action.submitAction };
    }

    default:
      state = { ...state };
      break;
  }
  return { ...state };
};
