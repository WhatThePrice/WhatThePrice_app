import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";


function* getUser() {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const { response, error } = yield call(api.getUser, headers);
    console.log(response, error);

    // if (response && response.data.status === "success"){
    //     yield put(Actions.getUserSuccess(response.data))
    // }
    // if (error) {
    //     yield put(Actions.getUserFail(error))
    // }
}

function* watchGetUser() {
    yield takeLatest(Actions.GET_USER, getUser);
}

export default function* submit() {
    yield all([fork(watchGetUser)]);
}
