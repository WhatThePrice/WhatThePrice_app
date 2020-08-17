import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

function* result({ data }) {
    const { response, error } = yield call(api.result, data);

    console.log(response, error);
}

function* watchResult() {
    yield takeLatest(Actions.RESULT, result);
}

export default function* submit() {
    yield all([fork(watchResult)]);
}
