import { all, fork } from "redux-saga/effects";
import getUser from "./getUser";

export default function* home() {
    yield all([
        fork(getUser), 
    ]);
}
