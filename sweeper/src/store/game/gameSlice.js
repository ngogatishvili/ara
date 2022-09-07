import {createSlice} from "@reduxjs/toolkit";


const initialState={
    board:[],
    gameInitialized:false,
    gameStarted:false,
    level:1
}


const gameSlice=createSlice({
    name:"game",
    initialState,
    reducers:{
        configureGame(state,action) {
            state.gameInitialized=true; 
        },
        createGame(state,action) {
            state.level=action.payload;
            state.gameStarted=true;
        },
        createMap(state,action) {
            state.board=action.payload;
        },
        openCell(state,action) {
            
        },
        updateBoard(state,action) {
            state.board=action.payload;
        },
        restartGame(state,action) {
            state.gameStarted=false;
            state.board=[];
            state.level=1;
        }
    }
})


export const {configureGame,createGame,createMap,openCell,updateBoard,restartGame}=gameSlice.actions;


export default gameSlice.reducer;


