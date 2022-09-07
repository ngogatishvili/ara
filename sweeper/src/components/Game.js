import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createMap, updateBoard,restartGame } from '../store/game/gameSlice';
import { ws } from '../utils.js/api';
import { generateCellColor } from '../utils.js/cellColor';
import { openCell } from '../store/game/gameSlice';
import {FaBomb,FaSadCry} from "react-icons/fa"
import { useState } from 'react';

const Game = () => {
  const [error,setError]=useState("");
  const [time,setTime]=useState(0);
  const dispatch=useDispatch();
  useEffect(()=>{
    ws.send("map");
    ws.onmessage=(message)=>{
      if(!message.data.includes("new")) {
        console.log(message.data)
        dispatch(createMap(message.data.split("map:")[1].split("\n").filter(item=>item!=="")));
      }else if(message.data.includes("open")) {
        
      }
        
      
      
    }
  },[dispatch])

  useEffect(()=>{
    console.log("ssss")
  })

  useEffect(()=>{
    const interval=setInterval(setTime(prevTime=>prevTime+1),1000);

    return ()=>{
      clearInterval(interval)
    }

  },[])

  const gameBoard=useSelector(store=>store.game.board);
  console.log(gameBoard)


  const openCellHandler=(x,y)=>{
    console.log(x,y)
    dispatch(openCell({x,y}));
    ws.send("map");
    ws.onmessage=(message)=>{
      if(!message.data.includes("open")) {
        dispatch(updateBoard(message.data.split("map:")[1].split("\n").filter(item=>item!=="")));
      }else{
        if(message.data==="open: You lose") {
          setError("Game Over!");
        }
      }
      
     

    }
  }
 
  
  
  
  return (
    <div className="w-screen h-full flex flex-col items-center justify-center gap-9  overflow-hidden scrollbar-none">
      <h1 className="my-3 text-purple-400 text-4xl">Mine Sweeper</h1>
      <p>{time}</p>
    <div className="scrollbar max-w-[1200px] max-h-[80vh]  scrollbar-thumb-purple-900 scrollbar-track-purple-100">   
      {gameBoard.map((r,index)=>{
        const row=r.split("")
        return (
          <div className="flex text-center">
            {row.map((cell,index2)=>{
              return (
                <button onClick={()=>openCellHandler(index2,index)} className={` ${cell==="0"&&"bg-purple-100"}  p-2 w-10 max-w-10 h-8 flex justify-center items-center cursor-pointer   ${generateCellColor(index2)} border border-purple-900 `}>{cell==="□"?"":cell==="*"?<FaBomb/>:cell}</button>
              )
            })}
          </div>
        )
      })}
    </div>
    {error && (
      <div className="absolute top-0 w-screen h-screen  flex flex-col justify-center items-center">
        <button>
          <FaSadCry className="text-4xl text-red-500"/> 
        </button>
        <h1 className="text-4xl text-red-600">Game Over  </h1>
        <button onClick={()=>dispatch(restartGame())} className="px-4 py-1 my-4 bg-red-500 rounded-md text-white">Try Again</button>
      </div>
    )}
    </div>
   
  )
}

export default Game;
