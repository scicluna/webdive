import { Action } from "@/components/HeroContext"

export type Item = {
    type: string,
    itemName: string,
    description: string,
    action: Action[],
}

export type SpecialAttack = {
    type: string,
    attackName: string,
    action: Action[],
}

export type Monster = {
    name: string,
    hp: number,
    defense: number,
    attack: number,
    loot: Item[],
    specialAttacks: SpecialAttack[]
    alive: boolean
}

export type DecisionOption = {
    description: string,
    action: Action[],
}

export type Encounter = {
    type: string,
    roomNumber: number,
    monsters: Monster[]
}

export type Decision = {
    type: string,
    roomNumber: number,
    wallText: string,
    options: DecisionOption[]
}

function getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
}

export function tableRoller(decisions: Decision[], encounters: Encounter[], length: number): (Decision | Encounter)[] {
    const rooms: (Decision | Encounter)[] = []

    for (let i = 0; i < length; i++) {
        const rng = Math.floor(Math.random() * 100)
        if (rng <= 40) {
            rooms.push(encounters[getRandomNumber(encounters.length)]);
        } else {
            rooms.push(decisions[getRandomNumber(decisions.length)]);
        }
    }

    return rooms
}