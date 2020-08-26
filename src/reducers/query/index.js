import { combineReducers } from "redux";

import result from "./result";
import saveQuery from "./saveQuery";
import saveProduct from "./saveProduct";

export default combineReducers({
    result,
    saveQuery,
    saveProduct
});
