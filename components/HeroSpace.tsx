import { Encounter, Monster } from "@/utils/tableRoller";
import { SetStateAction } from "react";
import { Hero } from "./HeroContext";
import { HeroOption, heroAction } from "@/utils/heroOptions";

type herospaceProp = {
    heroes: {
        state: Hero[]
        dispatch: React.Dispatch<any>
    }
    target: number
    encounter: Encounter
    setEncounter: React.Dispatch<SetStateAction<Encounter>>
}

export default function herospace({ heroes, encounter, target, setEncounter }: herospaceProp) {
    return (
        <div className="h-1/2 w-full flex justify-center items-center">
            {heroes.state.map(hero => (
                <div className={`flex flex-col gap-5 justify-center items-center ${hero.active ? 'text-black' : 'text-gray-500'}`} key={hero.name}>
                    <div className="flex gap-5">
                        {hero.options.map(option => <button onClick={() => heroAction(heroes, hero, encounter.monsters, option as unknown as HeroOption, target, setEncounter)} key={option}>{option}</button>)}
                    </div>
                    <div className="flex gap-5">
                        <p>{hero.name}</p>
                        <p>{hero.hp} hp</p>
                    </div>
                </div>
            ))}
        </div>
    )
}