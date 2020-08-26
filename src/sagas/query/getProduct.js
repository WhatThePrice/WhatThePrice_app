import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";
import { store } from "store/index";


function* getProduct() {
    let token = store.getState().PROFILE.userSession.data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const { response, error } = yield call(api.getProduct, headers);
    // console.log(response, error);

    if (response && response.data.status === "success"){
        yield put(Actions.getProductSuccess(response.data))
    }
    if (error) {
        yield put(Actions.getProductFail(error))
    }
}

function* watchGetProduct() {
    yield takeLatest(Actions.GET_PRODUCT, getProduct);
}

export default function* submit() {
    yield all([fork(watchGetProduct)]);
}
