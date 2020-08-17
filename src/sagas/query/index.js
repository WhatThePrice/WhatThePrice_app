import { all, fork } from "redux-saga/effects";
import result from "./result";

export default function* home() {
    yield all([fork(result)]);
}
