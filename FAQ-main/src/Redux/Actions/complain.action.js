import * as actionTypes from "../Types/complain.types";
import { complainRegistraion } from "../../API/complain.api";

export const newComplainAction = (newComplain) => async (dispatch) => {
  console.log(newComplain)
  try {
    const complainRegisterSuccesfully = await complainRegistraion(newComplain);

   
    dispatch({
      type: actionTypes.COMPLAIN_REGISTER_SUCCESS,
      payload: complainRegisterSuccesfully.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.COMPLAIN_REGISTER_FAIL,
      payload: { err: error.response.data || "Complain could not register" },
    });
  }
};
