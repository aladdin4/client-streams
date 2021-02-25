//the reducer that will handle the streams part of the state, it will be dealing with the async. streams action creators
import _ from "lodash";
import {
  CREATE_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
} from "../actions/types";

export const streamsReducer = (state = {}, actionObj) => {
  switch (actionObj.type) {
    case CREATE_STREAM:
      return { ...state, [actionObj.payload.id]: actionObj.payload };

    case EDIT_STREAM:
      return { ...state, [actionObj.payload.id]: actionObj.payload };

    case FETCH_STREAM:
      return { ...state, [actionObj.payload.id]: actionObj.payload };

    case FETCH_STREAMS:
      return {
        ...state,
        ..._.mapKeys(actionObj.payload, "id"),
      }; //note: he didn't built it that way, but i think this way would work,too

    case DELETE_STREAM:
      return _.omit(state, actionObj.payload);

    default:
      return state;
  }
};
