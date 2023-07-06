'use client'
import { useHero, Hero } from "@/components/HeroContext"
import { Dispatch, useEffect, useState, useMemo } from "react";
import { tableRoller } from "@/utils/tableRoller";
import { Encounter, Decision } from "@/utils/tableRoller";
import MonsterSpace from "@/components/MonsterSpace";
import HeroSpace from "@/components/HeroSpace";
import { catacombsEncounters, catacombsDecisions } from "@/tables/catacombs";

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
    const [notBusy, setNotBusy] = useState<boolean>(true)
    const heroes = useHero();

    console.log(rooms)

    useEffect(() => {
        setNotBusy(false)
        setIsDecision(rooms[currentRoom].type === "Decision");
        setIsEncounter(rooms[currentRoom].type === "Encounter");
    }, [rooms, currentRoom])

    function toggleBusy() {
        setNotBusy(prev => !prev)
    }

    console.log(isEncounter)
    console.log(isDecision)

    return (
        <section className="h-full flex">
            <div>
                {isEncounter ? <EncounterRoom heroes={heroes} room={rooms[currentRoom]} toggleBusy={toggleBusy} /> : isDecision && <DecisionRoom heroes={heroes} room={rooms[currentRoom]} toggleBusy={toggleBusy} />}
                {notBusy && <button onClick={() => setCurrentRoom(prev => prev + 1)}>Continue</button>}
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
    toggleBusy: () => void
}

//Encounters
export function EncounterRoom({ heroes, room, toggleBusy }: RoomProps) {
    if (room.type !== "Encounter") return null;
    const [encounter, setEncounter] = useState<Encounter>(room as Encounter)

    return (
        <div className="h-full w-screen flex flex-col">
            <MonsterSpace monsters={encounter.monsters} />
            <HeroSpace heroes={heroes} />
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