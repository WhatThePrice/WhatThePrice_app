import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

function* result({ data }) {
    const { response, error } = yield call(api.result, data);
    console.log(response, error);

    if (response && response.data.status_code === 200){
        yield put(Actions.resultSuccess(response.data))
    }
    if (error) {
        yield put(Actions.resultFail(error))
    }
}

function* watchResult() {
    yield takeLatest(Actions.RESULT, result);
}

export default function* submit() {
    yield all([fork(watchResult)]);
}
