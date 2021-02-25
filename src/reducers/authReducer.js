import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INIT_STATE = {
  signIn: null,
  currentUserID: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      INIT_STATE.signIn = true;
      INIT_STATE.currentUserID = action.payload;
      return { ...state, signIn: true, currentUserID: action.payload };
    case SIGN_OUT:
      INIT_STATE.signIn = false;
      return { ...state, signIn: false, currentUserID: null };

    default:
      return INIT_STATE;
  }
};

export default authReducer;
