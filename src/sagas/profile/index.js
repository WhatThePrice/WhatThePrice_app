import { all, fork } from "redux-saga/effects";
import getUser from "./getUser";
import upgrade from "./upgrade";
import downgrade from "./downgrade";



export default function* home() {
    yield all([
        fork(getUser), 
        fork(upgrade), 
        fork(downgrade), 
    ]);
}
