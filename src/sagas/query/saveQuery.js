import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";

function* saveQuery({ data }) {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    const formData = new FormData();
    formData.append("query", data.query);
    
    const { response, error } = yield call(api.saveQuery, formData, headers);
    if (response && response.data.status === "success"){
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
