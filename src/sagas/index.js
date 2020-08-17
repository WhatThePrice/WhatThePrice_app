import { all, fork } from "redux-saga/effects";

import auth from "./auth";
import query from "./query";

export default function* submit() {
  yield all([fork(auth), fork(query)]);
}
