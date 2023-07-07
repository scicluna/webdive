import { SetStateAction } from "react"
import { Encounter, Monster } from "./tableRoller"
import { Action, Hero } from "@/components/HeroContext"
import { monsterAction } from "./monsterOptions"

export type HeroOption = 'ATK' | 'BLK' | 'ITM'

export function heroAction(heroes: { state: Hero[], dispatch: React.Dispatch<Action> }, hero: Hero, monsters: Monster[], option: HeroOption, target: number, setEncounter: React.Dispatch<SetStateAction<Encounter>>) {
    switch (option) {
        case 'ATK': {
            const updatedHp = Math.max(monsters[target].hp - Math.max(hero.attack - monsters[target].defense, 1), 0)
            const updatedTarget: Monster = { ...monsters[target], hp: updatedHp, alive: updatedHp === 0 ? false : true }
            setEncounter(prev => (
                { ...prev, monsters: prev.monsters.map(monster => monster.name === prev.monsters[target].name ? updatedTarget : monster) } as Encounter)
            )
        }
    }
    heroes.dispatch({ type: "TOGGLE_ACTIVE", payload: { name: hero.name } })
}