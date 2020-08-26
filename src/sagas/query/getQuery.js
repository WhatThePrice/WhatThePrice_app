import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";


function* getQuery() {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const { response, error } = yield call(api.getQuery, headers);
    // console.log(response, error);

    if (response && response.data.status === "success"){
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
