export const SET_CARDS = 'SET_CARDS';
export const SET_MATCHED = 'SET_MATCHED';
export const TOGGLE_FLIPPED = 'TOGGLE_FLIPPED';
export const CLEAR_CARDS = 'CLEAR_CARDS';
export const INCREMENT = 'INCREMENT';
export const CLEAR_MOVES = 'CLEAR_MOVES';

export function setCards (value, id) {
    return {
        type: SET_CARDS,
        value,
        id
    }
}

export function setMatched (value) {
    return {
        type: SET_MATCHED,
        value
    }
}

export function toggleFlipped (id) {
    return {
        type: TOGGLE_FLIPPED,        
        id
    }
}

export function clearCards () {
    return {
        type: CLEAR_CARDS
    }
}

export function addMove () {
    return {
        type: INCREMENT
    }
}

export function clearMoves () {
    return {
        type: CLEAR_MOVES
    }
}