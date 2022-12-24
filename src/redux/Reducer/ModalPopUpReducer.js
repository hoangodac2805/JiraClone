import { OPEN_MODAL_POPUP, SET_SUBMIT_POPUP } from "../Types/ModalType";
const stateDefault = {
  content: <p>Nội dung mặc định</p>,
  title: "Mặc định",
  submitAction: () => {
    alert("mặc định");
  },
};
export const ModalPopUpReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case OPEN_MODAL_POPUP: {
      return {
        ...state,
        content: action.content,
        title: action.title,
      };
    }
    case SET_SUBMIT_POPUP: {
      return {
        ...state,

        submitAction: action.submitAction,
      };
    }
    default:
      state = { ...state };
      break;
  }

  return { ...state };
};
