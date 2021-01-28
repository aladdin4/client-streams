import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INIT_STATE = {
  signIn: null,
  userID: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, signIn: true, userID: action.payload };
    case SIGN_OUT:
      return { ...state, signIn: false, userID: null };

    default:
      return INIT_STATE;
  }
};

export default authReducer;
