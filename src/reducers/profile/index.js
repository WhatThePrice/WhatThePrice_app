import { combineReducers } from "redux";

import userSession from "./userSession";
import getUser from "./getUser";

export default combineReducers({
  userSession,
  getUser,
});
