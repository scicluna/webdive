import { monsterAction } from "@/utils/monsterOptions";
import { Decision, Encounter } from "@/utils/tableRoller";
import { Dispatch, useState, useEffect } from "react";
import { Hero } from "./HeroContext";
import HeroSpace from "./HeroSpace";
import MonsterSpace from "./MonsterSpace";

type RoomProps = {
    heroes: {
        state: Hero[],
        dispatch: Dispatch<any>
    },
    room: Decision | Encounter
    toggleBusy: (bool: boolean) => void
}

export default function EncounterRoom({ heroes, room, toggleBusy }: RoomProps) {
    if (room.type !== "Encounter") return null;
    const [encounter, setEncounter] = useState<Encounter>(room as Encounter)
    const [target, setTarget] = useState<number>(0)

    console.log(encounter.monsters)

    useEffect(() => {
        const allMonstersDead = encounter.monsters.every(monster => !monster.alive);
        if (allMonstersDead) toggleBusy(false)
    }, [encounter.monsters, toggleBusy])

    useEffect(() => {
        if (heroes.state.every(hero => !hero.active)) {
            encounter.monsters.forEach(monster => {
                monsterAction(monster, heroes)
            })
            heroes.state.forEach(hero => heroes.dispatch({ type: "TOGGLE_ACTIVE", payload: { name: hero.name } }));
        }
    }, [heroes.state, heroes.dispatch]);

    return (
        <div className="h-full w-screen flex flex-col">
            <MonsterSpace monsters={encounter.monsters} target={target} setTarget={setTarget} />
            <HeroSpace heroes={heroes} target={target} encounter={encounter} setEncounter={setEncounter} />
        </div>
    )
}