import { all, fork } from "redux-saga/effects";
import result from "./result";
import saveQuery from "./saveQuery";

export default function* home() {
    yield all([fork(result), fork(saveQuery)]);
}
