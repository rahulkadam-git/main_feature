import { combineReducers } from "redux";
import complainReducer from "./complain.reducer"


export default combineReducers({
  complains: complainReducer,
});
