import {all,call,fork,take} from "redux-saga/effects"
import { configureGame, createGame, openCell } from "./gameSlice"
import { createConnnection, createGameApi, openCellApi} from "../../utils.js/api";



function* connectToGameSaga() {
    yield call(createConnnection);
}


function* createGameSaga(level) {
    yield call(createGameApi,level);
    
    
}



function* connectionWatcher() {
    while(true) {
        yield take(configureGame.type);
        yield fork(connectToGameSaga)
    }
}





function* startGameWatcher() {
    while(true) {
        const {payload}=yield take(createGame.type);
        yield call(createGameSaga,payload);
        
        
    }
}

function* openCellWatcher() {
    while(true) {
       const {payload}=yield take(openCell.type);
       yield call(openCellApi,payload.x,payload.y);
    }
}




export default function* gameSaga() {
    yield all([connectionWatcher(),startGameWatcher(),openCellWatcher()])
}