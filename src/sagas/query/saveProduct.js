import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { store } from "store/index";

function* saveProduct({ data }) {
    let token = store.getState().PROFILE.userSession.data.token;
    console.log("token", token);

    // let token = data.token;
    const headers = { Authorization : `Bearer ${token}`};
    
    const formData = new FormData();
    formData.append("product_url", data.product_url);
    formData.append("product_name", data.product_name);

    const { response, error } = yield call(api.saveProduct, formData, headers);
    console.log(response, error);

    if (response && response.data.status === "success"){
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
