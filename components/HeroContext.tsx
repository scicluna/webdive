'use client'
import React, { createContext, useReducer, useContext, PropsWithChildren } from 'react';

// Define the shape of the hero state
export interface Hero {
    name: string;
    level: number;
    health: number;
    defense: number;
    attack: number;
}

const actions = [
    'SET_NAME',
    'INCREASE_LEVEL',
    'DECREASE_HEALTH',
    'INCREASE_HEALTH',
    'SET_ARMOR',
    'SET_WEAPON'
] as const;

// Define the shape of the actions that can be dispatched
export interface Action {
    type: typeof actions[number]
    payload?: any;
}

// Define the initial state
const initialHeroState: Hero = {
    name: '',
    level: 1,
    health: 100,
    defense: 0,
    attack: 1
};

// Create the context
const HeroContext = createContext<{
    state: Hero;
    dispatch: React.Dispatch<any>;
}>({
    state: initialHeroState,
    dispatch: () => null,
});

// Define the reducer
const heroReducer = (state: Hero, action: Action): Hero => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'INCREASE_LEVEL':
            return { ...state, level: state.level + 1 };
        case 'INCREASE_HEALTH':
            return { ...state, health: state.health + action.payload }
        case 'DECREASE_HEALTH':
            return { ...state, health: state.health - action.payload };
        case 'SET_ARMOR':
            return { ...state, defense: Math.max(action.payload, 0) };
        case 'SET_WEAPON':
            return { ...state, attack: Math.max(action.payload, 1) };
        default:
            return state;
    }
};

// Create a provider component
const HeroProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(heroReducer, initialHeroState);

    return (
        <HeroContext.Provider value={{ state, dispatch }}>
            {children}
        </HeroContext.Provider>
    );
};

// Create a custom hook to use the hero context
const useHero = () => {
    const context = useContext(HeroContext);
    if (context === undefined) {
        throw new Error('useHero must be used within a HeroProvider');
    }
    return context;
};

export { HeroProvider, useHero };