import { SIGN_IN, SIGN_OUT } from "./types";

//a handler should always return action object with a type property in it
export const signIn = (userID) => {
  return {
    type: SIGN_IN,
    payload: userID,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
