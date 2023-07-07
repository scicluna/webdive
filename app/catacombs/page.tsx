'use client'
import { useHero } from "@/components/HeroContext"
import { useEffect, useState, useMemo } from "react";
import { tableRoller } from "@/utils/tableRoller";
import { catacombsEncounters, catacombsDecisions } from "@/tables/catacombs";
import EncounterRoom from "@/components/EncounterSpace";
import DecisionRoom from "@/components/DecisionSpace";

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



//Encounters


//Decisions
