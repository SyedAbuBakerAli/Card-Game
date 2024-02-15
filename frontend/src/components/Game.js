
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shuffleCards, restartGame, flipCard, winGame, fetchLeaderboard, storeScore } from '../components/action/action';
import Card from '../components/Card';

function Game({ username }) {
  const { cards, score, gameOver, defused, leaderboard, loading, error } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const handleFlip = (flippedCard) => {
    setTimeout(() => {
      dispatch(flipCard(flippedCard));
      if (cards.length === 2) {
        dispatch(winGame());
        dispatch(storeScore(username, 1));
      }
    }, 1500)
  };

  const handleRestart = () => {
    dispatch(restartGame());
    dispatch(fetchLeaderboard());
  };

  const handleShuffle = () => {
    dispatch(shuffleCards());
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      <h1>Welcome, {username}!</h1>
      <p>Score: {score}</p>
      {gameOver ? (
        <div>
          {score > 0 ? (
            <h2>You Won! Score: {score}</h2>
          ) : (
            <h2>You Lost!</h2>
          )}
          <button onClick={handleRestart}>Restart</button>
          <p>Score: {score}</p>
        </div>
      ) : (
        <div>
          <button onClick={handleShuffle}>Start</button>
          <div className='image_container'>
            {cards.map(card => (
              <Card key={card.id} card={card} handleFlip={handleFlip} />
            ))}
          </div>
        </div>
      )}
      
      {/* Display leaderboard data */}
      <div>
        <h2>Leaderboard</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {Object.entries(leaderboard).map(([name, score]) => (
              <li key={name}>{name}: {score}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Game;


