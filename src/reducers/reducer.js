import { SET_CARDS, SET_MATCHED, TOGGLE_FLIPPED, CLEAR_CARDS, INCREMENT, CLEAR_MOVES } from '../actions/actions'

export function shuffledCards(state = [], action) {    
    switch (action.type) {
        case SET_CARDS:
        return state.concat({
            matched: false,
            flipped: false,
            value: action.value,
            id: action.id
        });      
        case SET_MATCHED:            
        return state.map(item => {
            if (item.value === action.value) {
                return {
                    ...item,
                    matched: !item.matched,
                }
            }
            return item
            });
        case TOGGLE_FLIPPED:            
        return state.map(item => {
            if (item.id === action.id) {
                return {
                    ...item,
                    flipped: !item.flipped,
                }
            }
            return item
            });
        case CLEAR_CARDS:
            return state = [];
        default:
            return state;
    }
}

export function moves(state = 0, action) {    
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case CLEAR_MOVES:
            return state = 0;
        default:
            return state;
    }
}

export default { moves, shuffledCards };