import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";
import { getStore } from "../../services/encryption";

function* getQuery({ data }) {
    // let token = store.getState().PROFILE.userSession.data;
    let token = data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("query", data.query);

    const { response, error } = yield call(api.getQuery, formData, headers);
    console.log(response, error);

    if (response && response.data.status_code === "200"){
        yield put(Actions.getQuerySuccess(response.data))
    }
    if (error) {
        yield put(Actions.getQueryFail(error))
    }
}

function* watchGetQuery() {
    yield takeLatest(Actions.GET_QUERY, getQuery);
}

export default function* submit() {
    yield all([fork(watchGetQuery)]);
}
