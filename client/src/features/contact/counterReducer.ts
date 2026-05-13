import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    data: number;
}

const initialState: CounterState = {
    data: 42
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state, { payload }: { payload: number; }) => {
            state.data += payload;
        },
        decrement: (state, { payload }: { payload: number; }) => {
            state.data -= payload;
        }
    }
});

export const { increment, decrement } = counterSlice.actions;

export function incrementLegacy(amount = 1) {
    return { type: 'increment', payload: amount };
}

export function decrementLegacy(amount = 1) {
    return { type: 'decrement', payload: amount };
}

export default function counterReducer(state = initialState, { payload, type }: { type: string; payload: number; }): CounterState {

    switch (type) {
        case 'increment':
            return {
                ...state,
                data: state.data + payload
            };
        case 'decrement':
            return {
                ...state,
                data: state.data - payload
            };

        default:
            return state;
    }
}