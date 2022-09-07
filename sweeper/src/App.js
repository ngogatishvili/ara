import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.css';
import Game from './components/Game';
import {configureGame, createGame} from './store/game/gameSlice';

function App() {
  const [level, setLevel] = useState(1);
  const dispatch = useDispatch();
  const gameStarted = useSelector((state) => state.game.gameStarted);
  useEffect(() => {
    dispatch(configureGame());
  }, [dispatch]);

  const createGameHandler = () => {
    dispatch(createGame(level));
  };
  return (
    <div>
      <h1 className='text-3xl text-center bg-purple-600 text-white p-4'>
        Mine Sweeper
      </h1>
      {gameStarted ? (
        <Game />
      ) : (
        <div className='mt-20 flex flex-col items-center'>
          <h1 className='text-center text-purple-600 text-3xl m-4'>
            Are you ready for playing the game?{' '}
          </h1>
          <p className='text-4xl text-purple-300 text-center m-8'>
            Select the level of difficulty
          </p>
          <select
            onChange={(e) => setLevel(e.target.value)}
            className='text-center bg-transparent cursor-pointer text-purple-600 outline-purple-500 w-80 py-4'>
            <option value='1'>Easy</option>
            <option value='2'>Medium</option>
            <option value='3'>Hard</option>
            <option value='4'>Very Hard</option>
          </select>
          <button
            onClick={createGameHandler}
            className='my-40 bg-purple-600 px-20 py-5 shadow-md hover:bg-purple-800 text-white text-2xl transition-all duration-300 rounded-md'>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
