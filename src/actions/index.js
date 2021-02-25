import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
} from "./types";

import streamsAxios from "../apis/streams";
import history from "../history";

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

// 5 async action creators that receive form data and return fn() that uses axios to add to the database

//#1 - to create one stream
export const streamCreator = (formValues) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.currentUserID;

    const response = await streamsAxios.post("/Streams", {
      ...formValues,
      creatorID: userId,
    });

    console.log(userId);
    dispatch({
      type: CREATE_STREAM,
      payload: response.data,
    });

    history.push("/");
  };
};

//#2 - to fetch a streams
export const streamFetcher = (id) => {
  return async (dispatch) => {
    const response = await streamsAxios.get(`streams/${id}`);

    dispatch({
      type: FETCH_STREAM,
      payload: response.data,
    });

    //
  };
};

//#3 - to fetch all streams
export const streamsFetcher = () => {
  return async (dispatch) => {
    const response = await streamsAxios.get("/streams");

    dispatch({
      type: FETCH_STREAMS,
      payload: response.data,
    });
  };
};

//#4 - to edit a stream
export const streamEditor = (id, formValues) => {
  return async (dispatch) => {
    const response = await streamsAxios.patch(`/streams/${id}`, formValues);

    dispatch({
      type: EDIT_STREAM,
      payload: response.data,
    });

    history.push("/");
  };
};

//#5 - to delete a stream
export const streamDeleter = (id) => {
  return async (dispatch) => {
    await streamsAxios.delete(`/streams/${id}`);
    dispatch({
      type: DELETE_STREAM,
      payload: id,
    });

    history.push("/");
  };
};
