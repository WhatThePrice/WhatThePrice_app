import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";

function* saveProduct({ data }) {
    // let token = store.getState().PROFILE.userSession.data;
    let token = data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("query", data.query);

    const { response, error } = yield call(api.saveProduct, formData, headers);
    console.log(response, error);

    if (response && response.data.status_code === "200"){
        yield put(Actions.saveProductSuccess(response.data))
    }
    if (error) {
        yield put(Actions.saveProductFail(error))
    }
}

function* watchSaveProduct() {
    yield takeLatest(Actions.SAVE_PRODUCT, saveProduct);
}

export default function* submit() {
    yield all([fork(watchSaveProduct)]);
}
