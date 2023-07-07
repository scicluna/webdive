'use client'
import { useHero, Hero } from "@/components/HeroContext"
import { Dispatch, useEffect, useState, useMemo, use } from "react";
import { Monster, tableRoller } from "@/utils/tableRoller";
import { Encounter, Decision } from "@/utils/tableRoller";
import MonsterSpace from "@/components/MonsterSpace";
import HeroSpace from "@/components/HeroSpace";
import { catacombsEncounters, catacombsDecisions } from "@/tables/catacombs";
import { v4 } from "uuid";

//import all catacombs tables here
//create a "traverse catacombs function"
//call it whenever the room is "done"
//keep track of room in a state
//always make 10th room a boss

export default function Catacombs() {
    const rooms = useMemo(() => tableRoller(catacombsDecisions, catacombsEncounters, 10), [catacombsDecisions, catacombsEncounters])
    const [currentRoom, setCurrentRoom] = useState<number>(0)
    const [isDecision, setIsDecision] = useState<boolean>(false);
    const [isEncounter, setIsEncounter] = useState<boolean>(false);
    const [busy, setBusy] = useState<boolean>(true)
    const heroes = useHero();

    console.log(busy)

    useEffect(() => {
        setBusy(true)
        setIsDecision(rooms[currentRoom].type === "Decision");
        setIsEncounter(rooms[currentRoom].type === "Encounter");
    }, [rooms, currentRoom])

    function toggleBusy(bool: boolean) {
        setBusy(bool)
    }

    return (
        <section className="h-full flex">
            <div className="flex relative">
                {isEncounter ? <EncounterRoom heroes={heroes} room={rooms[currentRoom]} toggleBusy={toggleBusy} key={currentRoom} /> : isDecision && <DecisionRoom heroes={heroes} room={rooms[currentRoom]} toggleBusy={toggleBusy} key={currentRoom} />}
                {!busy && <button className="absolute right-2 top-1/2" onClick={() => setCurrentRoom(prev => prev + 1)}>Continue</button>}
            </div>
        </section>
    )
}

type RoomProps = {
    heroes: {
        state: Hero[],
        dispatch: Dispatch<any>
    },
    room: Decision | Encounter
    toggleBusy: (bool: boolean) => void
}

//Encounters
export function EncounterRoom({ heroes, room, toggleBusy }: RoomProps) {
    if (room.type !== "Encounter") return null;
    const [encounter, setEncounter] = useState<Encounter>(room as Encounter)
    const [target, setTarget] = useState<number>(0)

    console.log(encounter.monsters)

    useEffect(() => {
        const allMonstersDead = encounter.monsters.every(monster => !monster.alive);
        if (allMonstersDead) toggleBusy(false)
    }, [encounter.monsters, toggleBusy])

    return (
        <div className="h-full w-screen flex flex-col">
            <MonsterSpace monsters={encounter.monsters} target={target} setTarget={setTarget} />
            <HeroSpace heroes={heroes} target={target} encounter={encounter} setEncounter={setEncounter} />
        </div>
    )
}

//Decisions
export function DecisionRoom({ heroes, room, toggleBusy }: RoomProps) {
    if (room.type !== "Decision") return null;
    const [encounter, setEncounter] = useState<Decision>(room as Decision)

    return (
        <h1>Decision</h1>
    )
}