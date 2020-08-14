import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

import { encode } from "../../services/encryption";

function* login({ data }) {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  const { response } = yield call(api.login, formData);

  if (response && response.data.code === 1) {
    // const loginInfo = {
    //   timestamp: new Date().valueOf(),
    //   userId: response.data.data.userId,
    //   token: response.data.data.xToken
    // };

    yield put(Actions.loginSuccess(response.data.data));
    // yield put(
    //   Actions.activateUserSession({ xToken: encode(JSON.stringify(loginInfo)) })
    // );
  } else {
    yield put(Actions.loginFail(response.data.message));
  }
}

function* watchLogin() {
  yield takeLatest(Actions.LOGIN, login);
}

export default function* submit() {
  yield all([fork(watchLogin)]);
}
