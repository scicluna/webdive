import { Monster } from "./tableRoller";
import { Action, Hero } from "@/components/HeroContext";

export function monsterAction(monster: Monster, heroes: { state: Hero[], dispatch: React.Dispatch<Action> }): void {
    // Select a random hero
    const targetIndex = Math.floor(Math.random() * heroes.state.length);
    const target = heroes.state[targetIndex];

    // Calculate damage
    const damage = Math.max(monster.attack - target.defense, 0);

    // Update the hero's HP
    const updatedHero: Hero = {
        ...target,
        hp: Math.max(target.hp - damage, 0)
    };

    // Call the updateHero function to actually apply the changes
    heroes.dispatch({ type: "UPDATE_HERO", payload: { name: target.name, hero: updatedHero } })

    console.log(`${monster.name} attacked ${updatedHero.name} for ${damage} damage!`);
}
