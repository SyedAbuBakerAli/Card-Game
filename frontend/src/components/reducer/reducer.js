
import { FLIP_CARD, SHUFFLE_CARDS, RESTART_GAME,WIN_GAME,FETCH_LEADERBOARD_REQUEST,FETCH_LEADERBOARD_SUCCESS,FETCH_LEADERBOARD_FAILURE
,STORE_SCORE_REQUEST, STORE_SCORE_SUCCESS, STORE_SCORE_FAILURE  } from '../constants/constants';
import image from '../../data/Image';

const initialState = {
  cards: [],
  score: 0,
  gameOver: false,
  defused: false,
  leaderboard: [],
  loading: false,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIP_CARD:
      const flippedCard = action.payload;
      if (flippedCard.name === "boom") {
        if (!state.defused) {
          return {
            ...state,
            gameOver: true,
          };
        } else {
          return {
            ...state,
            defused: false,
            cards: state.cards.filter(card => card.id !== flippedCard.id),
          };
        }
      } else if (flippedCard.name === "shuffle") {
        const newCards = [];
        while (newCards.length < 5) {
          const randomIndex = Math.floor(Math.random() * image.length);
          newCards.push(image[randomIndex]);
        }
        const shuffledDeck = [...newCards, ...newCards.slice(0, 5 - newCards.length)]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }));
        return {
          ...state,
          cards: shuffledDeck,
          gameOver: false,
          defused: false,
        };
      } else if (flippedCard.name === "cat") {
        return {
          ...state,
          cards: state.cards.filter(card => card.id !== flippedCard.id),
        };
      } else if (flippedCard.name === "defused") {
        return {
          ...state,
          defused: true,
          cards: state.cards.filter(card => card.id !== flippedCard.id),
        };
      }  else {
        const updatedState = {
          ...state,
          turns: state.turns + 1,
        };
 
        if (updatedState.cards.length === 1) {
          return {
            ...updatedState,
            score: updatedState.score + 1,
            gameOver: true,
          };
        }
        return updatedState;
}
      case SHUFFLE_CARDS:
        const selectedCards = [];
  while (selectedCards.length < 5) {
    const randomIndex = Math.floor(Math.random() * image.length);
    selectedCards.push(image[randomIndex]);
  }
    const shuffledCard = [...selectedCards, ...selectedCards.slice(0, 5 - selectedCards.length)];
    const shuffledDeck = shuffledCard
    .sort(()=> Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}))
        return {
          ...state,
          cards: shuffledDeck,
          turns: 0,
          gameOver: false,
        };
case RESTART_GAME:
      return initialState;
      case WIN_GAME:
        return {
          ...state,
          score: state.score + 1,
          gameOver: true,
        };
        case FETCH_LEADERBOARD_REQUEST:
          return {
            ...state,
            loading: true,
            error: null
          };
        case FETCH_LEADERBOARD_SUCCESS:
          return {
            ...state,
            loading: false,
            leaderboard: action.payload,
            error: null
          };
        case FETCH_LEADERBOARD_FAILURE:
          return {
            ...state,
            loading: false,
            error: action.payload
          };
          case STORE_SCORE_REQUEST:
            return {
              ...state,
              loading: true,
              error: null
            };
          case STORE_SCORE_SUCCESS:
            return {
              ...state,
              loading: false,
            };
          case STORE_SCORE_FAILURE:
            return {
              ...state,
              loading: false,
              error: action.payload
            };
        default:
          return state;
    
  };
};




export default rootReducer;

