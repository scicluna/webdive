'use client'
import React, { createContext, useReducer, useContext, PropsWithChildren } from 'react';

// Define the shape of the hero state
export interface Hero {
    name: string;
    level: number;
    hp: number;
    defense: number;
    attack: number;
    options: string[];
}

const actions = [
    'UPDATE_HERO',
    'ADD_HERO',
    'REMOVE_HERO',
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
    payload: {
        name?: string;
        hero?: Hero;
        oldName?: string;
        newName?: string;
        amount?: number;
        defense?: number;
        attack?: number;
    }
}
// Define the initial state
const initialHeroState: Hero[] = [{
    name: 'Hero',
    level: 1,
    hp: 100,
    defense: 0,
    attack: 1,
    options: ['ATK', 'BLK', 'ITM']
}];

// Create the context
const HeroContext = createContext<{
    state: Hero[];
    dispatch: React.Dispatch<any>;
}>({
    state: initialHeroState,
    dispatch: () => null,
});

// Define the reducer
const heroReducer = (state: Hero[], action: Action): Hero[] => {
    switch (action.type) {
        case 'UPDATE_HERO':
            return state.map(hero => action.payload.hero && (hero.name === action.payload.name) ? action.payload.hero : hero)
        case 'ADD_HERO':
            // Check if a hero with the same name already exists
            if (state.find(hero => hero.name === action.payload.name)) {
                console.error(`A hero with the name ${action.payload.name} already exists.`);
                return state;
            }
            if (!action.payload.hero) return state
            return [...state, action.payload.hero];
        case 'REMOVE_HERO':
            return state.filter(hero => hero.name !== action.payload);
        case 'SET_NAME':
            return state.map(hero =>
                hero.name === action.payload.oldName ? { ...hero, name: action.payload.newName } as Hero : hero);
        case 'INCREASE_LEVEL':
            return state.map(hero =>
                hero.name === action.payload.name ? { ...hero, level: hero.level + 1 } : hero);
        case 'INCREASE_HEALTH':
            return state.map(hero =>
                action.payload.amount && (hero.name === action.payload.name) ? { ...hero, hp: hero.hp + action.payload.amount } : hero);
        case 'DECREASE_HEALTH':
            return state.map(hero =>
                action.payload.amount && (hero.name === action.payload.name) ? { ...hero, hp: hero.hp - action.payload.amount } : hero);
        case 'SET_ARMOR':
            return state.map(hero =>
                action.payload.defense && (hero.name === action.payload.name) ? { ...hero, defense: Math.max(action.payload.defense, 0) } : hero);
        case 'SET_WEAPON':
            return state.map(hero =>
                action.payload.attack && (hero.name === action.payload.name) ? { ...hero, attack: Math.max(action.payload.attack, 1) } : hero);
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