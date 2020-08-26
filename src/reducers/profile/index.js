import { combineReducers } from "redux";

import userSession from "./userSession";
import getUser from "./getUser";
import upgrade from "./upgrade";
import downgrade from "./downgrade";


export default combineReducers({
  userSession,
  getUser,
  upgrade,
  downgrade,
});
