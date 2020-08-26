import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";


function* upgrade() {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    const { response, error } = yield call(api.upgrade, headers);

    console.log(response, error);

    if (response && response.data.status === "success"){
        yield put(Actions.upgradeSuccess(response.data))
    }
    if (error) {
        yield put(Actions.upgradeFail(error))
    }
}

function* watchUpgrade() {
    yield takeLatest(Actions.UPGRADE, upgrade);
}

export default function* submit() {
    yield all([fork(watchUpgrade)]);
}
