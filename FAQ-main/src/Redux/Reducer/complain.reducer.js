import * as actionTypes from "../Types/complain.types";

const initialState = {
  error: "",
  response: "",
};

//reducer

export default function rootReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.COMPLAIN_REGISTER_SUCCESS:
      return {
        ...state,
        response: payload,
      };
    case actionTypes.COMPLAIN_REGISTER_FAIL:
      return {
        ...state,        
        error: payload.err,
      };

    default:
      return state;
  }
}
