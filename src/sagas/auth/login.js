import { takeLatest, call, all, fork, put } from "redux-saga/effects";
import Actions from "../../actions";
import * as api from "../../api";

// import { encode } from "../../services/encryption";

function* login({ data }) {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);

  const { response , error } = yield call(api.login, formData);

  console.log(response);

  if (response && response.data.status === "success") {
    yield put(Actions.loginSuccess(response.data.token));
    yield put(Actions.activateUserSession(response.data.token));
  } else if (error) {
    yield put(Actions.loginFail(error.response));
}
}

function* watchLogin() {
  yield takeLatest(Actions.LOGIN, login);
}

export default function* submit() {
  yield all([fork(watchLogin)]);
}
