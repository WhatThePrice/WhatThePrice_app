import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";


function* downgrade() {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    const { response, error } = yield call(api.downgrade, headers);

    console.log(response, error);

    if (response && response.data.status === "success"){
        yield put(Actions.downgradeSuccess(response.data))
    }
    if (error) {
        yield put(Actions.downgradeFail(error))
    }
}

function* watchDowngrade() {
    yield takeLatest(Actions.DOWNGRADE, downgrade);
}

export default function* submit() {
    yield all([fork(watchDowngrade)]);
}
