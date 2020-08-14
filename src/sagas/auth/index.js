import { all, fork } from "redux-saga/effects";
import login from "./login";

export default function* home() {
  yield all([fork(login)]);
}
