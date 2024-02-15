
import { FLIP_CARD, SHUFFLE_CARDS, RESTART_GAME, WIN_GAME, FETCH_LEADERBOARD_REQUEST,FETCH_LEADERBOARD_SUCCESS,FETCH_LEADERBOARD_FAILURE,
STORE_SCORE_FAILURE,STORE_SCORE_REQUEST,STORE_SCORE_SUCCESS } from '../constants/constants';

export const flipCard = (flippedCard) => ({
  type: FLIP_CARD,
  payload: flippedCard,
});

export const shuffleCards = () => ({
  type: SHUFFLE_CARDS,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});

export const winGame = () => ({
  type: WIN_GAME,
});

export const fetchLeaderboardRequest = () => ({
  type: FETCH_LEADERBOARD_REQUEST,
});

export const fetchLeaderboardSuccess = (data) => ({
  type: FETCH_LEADERBOARD_SUCCESS,
  payload: data,
});

export const fetchLeaderboardFailure = (error) => ({
  type: FETCH_LEADERBOARD_FAILURE,
  payload: error,
});

export const fetchLeaderboard = () => {
  return async dispatch => {
    dispatch(fetchLeaderboardRequest());

    try {
      const response = await fetch('/leaderboard');
      const data = await response.json();

      dispatch(fetchLeaderboardSuccess(data));
    } catch (error) {
      dispatch(fetchLeaderboardFailure(error.message));
    }
  };

}

export const storeScoreRequest = () => ({
  type: STORE_SCORE_REQUEST,
});

export const storeScoreSuccess = () => ({
  type: STORE_SCORE_SUCCESS,
});

export const storeScoreFailure = (error) => ({
  type: STORE_SCORE_FAILURE,
  payload: error,
});

export const storeScore = (username, score) => {
  return async dispatch => {
    dispatch(storeScoreRequest());

    try {
      const response = await fetch('/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'username': username,
        },
        body: JSON.stringify({ score: score }),
      });

      if (!response.ok) {
        throw new Error('Failed to store score');
      }

      dispatch(storeScoreSuccess());
    } catch (error) {
      dispatch(storeScoreFailure(error.message));
    }
  };
}

