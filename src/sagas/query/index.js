import { all, fork } from "redux-saga/effects";
import result from "./result";
import saveQuery from "./saveQuery";
import saveProduct from "./saveProduct";

export default function* home() {
    yield all([fork(result), fork(saveQuery), fork(saveProduct)]);
}
