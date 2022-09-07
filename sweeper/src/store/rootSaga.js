import {all} from "redux-saga/effects"
import gameSaga from "./game/gameSaga"


export default function* rootSaga() {
    yield all([gameSaga()])
}