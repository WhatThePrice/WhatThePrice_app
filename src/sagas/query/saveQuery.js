import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";
import { getStore } from "../../services/encryption";

function* saveQuery({ data }) {
    // let token = store.getState().PROFILE.userSession.data;
    let token = data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("query", data.query);

    const { response, error } = yield call(api.saveQuery, formData, headers);
    console.log(response, error);

    // if (response && response.data.status_code === "200"){
    //     yield put(Actions.saveQuerySuccess(response.data))
    // }
    // if (error) {
    //     yield put(Actions.saveQueryFail(error))
    // }
}

function* watchSaveQuery() {
    yield takeLatest(Actions.SAVE_QUERY, saveQuery);
}

export default function* submit() {
    yield all([fork(watchSaveQuery)]);
}
