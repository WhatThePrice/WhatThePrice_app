import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

function* saveQuery({ data }) {
    const { response, error } = yield call(api.saveQuery, data);
    // console.log(response, error);

    if (response && response.data.status_code === "200"){
        yield put(Actions.saveQuerySuccess(response.data))
    }
    if (error) {
        yield put(Actions.saveQueryFail(error))
    }
}

function* watchSaveQuery() {
    yield takeLatest(Actions.SAVE_QUERY, saveQuery);
}

export default function* submit() {
    yield all([fork(watchSaveQuery)]);
}
