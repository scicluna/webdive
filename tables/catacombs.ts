import { Encounter } from "@/utils/tableRoller";
const catacombsEncounters: Encounter[] = [
    {
        type: "Encounter",
        roomNumber: 1,
        monsters: [{
            name: "Ghastly Ghost",
            hp: 10,
            defense: 0,
            attack: 3,
            loot: [],
            specialAttacks: []
        }]
    },
    {
        type: "Encounter",
        roomNumber: 2,
        monsters: [{
            name: "Dreadful Zombie",
            hp: 15,
            defense: 1,
            attack: 4,
            loot: [],
            specialAttacks: []
        }]
    },
    {
        type: "Encounter",
        roomNumber: 3,
        monsters: [{
            name: "Catacombs Spider",
            hp: 7,
            defense: 1,
            attack: 2,
            loot: [],
            specialAttacks: []
        }]
    },
    {
        type: "Encounter",
        roomNumber: 4,
        monsters: [{
            name: "Skeleton Warrior",
            hp: 20,
            defense: 3,
            attack: 5,
            loot: [],
            specialAttacks: []
        }]
    },
    {
        type: "Encounter",
        roomNumber: 5,
        monsters: [{
            name: "Ancient Lich",
            hp: 30,
            defense: 4,
            attack: 6,
            loot: [],
            specialAttacks: []
        }]
    },
];

import { Decision } from "@/utils/tableRoller";
const catacombsDecisions: Decision[] = [
    {
        type: "Decision",
        roomNumber: 1,
        wallText: "An eerie green glow illuminates a side path, while a skeletal figure can be seen down the main path. Which do you take?",
        options: [{
            description: "Brave the skeleton and take the main path.",
            action: [{ type: 'INCREASE_LEVEL', payload: { amount: 1 } }]
        }, {
            description: "Investigate the green glow down the side path.",
            action: [{ type: 'DECREASE_HEALTH', payload: { amount: 3 } }]
        }]
    },
    {
        type: "Decision",
        roomNumber: 2,
        wallText: "You find a fountain filled with dark water. Do you drink it or ignore it?",
        options: [{
            description: "Drink the water.",
            action: [{ type: 'DECREASE_HEALTH', payload: { amount: 5 } }]
        }, {
            description: "Ignore the fountain.",
            action: []
        }]
    },
    {
        type: "Decision",
        roomNumber: 3,
        wallText: "You discover a chest encrusted with ancient symbols. Do you try to open it or leave it be?",
        options: [{
            description: "Try to open the chest.",
            action: [{ type: 'INCREASE_LEVEL', payload: { amount: 2 } }]
        }, {
            description: "Leave the chest alone.",
            action: []
        }]
    },
    {
        type: "Decision",
        roomNumber: 4,
        wallText: "You encounter a spectral figure that offers to share its knowledge for a price. Do you accept?",
        options: [{
            description: "Accept the figure's offer.",
            action: [{ type: 'INCREASE_LEVEL', payload: { amount: 3 } }, { type: 'DECREASE_HEALTH', payload: { amount: 10 } }]
        }, {
            description: "Politely decline.",
            action: []
        }]
    },
    {
        type: "Decision",
        roomNumber: 5,
        wallText: "A narrow bridge stretches across a seemingly bottomless pit. Do you cross it or look for another way around?",
        options: [{
            description: "Cross the bridge.",
            action: [{ type: 'DECREASE_HEALTH', payload: { amount: 5 } }]
        }, {
            description: "Look for another way around.",
            action: []
        }]
    },
];

export { catacombsEncounters, catacombsDecisions }