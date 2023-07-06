import { SetStateAction } from "react"
import { Encounter, Monster } from "./tableRoller"
import { Hero } from "@/components/HeroContext"

export type HeroOption = 'ATK' | 'BLK' | 'ITM'


export function heroAction(hero: Hero, monsters: Monster[], option: HeroOption, target: number, setEncounter: React.Dispatch<SetStateAction<Encounter>>) {
    switch (option) {
        case 'ATK': {
            const updatedTarget: Monster = { ...monsters[target], hp: monsters[target].hp - Math.max(hero.attack - monsters[target].defense, 1) }
            setEncounter(prev => (
                { ...prev, monsters: monsters.map(monster => monster.name === monsters[target].name ? updatedTarget : monster) } as Encounter)
            )
        }
    }
}