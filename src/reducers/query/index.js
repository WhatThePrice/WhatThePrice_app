import { combineReducers } from "redux";

import result from "./result";
import saveQuery from "./saveQuery";
import saveProduct from "./saveProduct";
import getQuery from "./getQuery";
import getProduct from "./getProduct";

export default combineReducers({
    result,
    saveQuery,
    saveProduct,
    getQuery,
    getProduct,
});
