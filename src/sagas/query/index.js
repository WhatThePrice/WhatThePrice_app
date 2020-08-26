import { all, fork } from "redux-saga/effects";
import result from "./result";
import saveQuery from "./saveQuery";
import saveProduct from "./saveProduct";
import getQuery from "./getQuery";

export default function* home() {
    yield all([fork(result), fork(saveQuery), fork(saveProduct), fork(getQuery)]);
}
