import { Decision, Encounter } from "@/utils/tableRoller";
import { Dispatch, useState } from "react";
import { Hero } from "./HeroContext";

type RoomProps = {
    heroes: {
        state: Hero[],
        dispatch: Dispatch<any>
    },
    room: Decision | Encounter
    toggleBusy: (bool: boolean) => void
}

export default function DecisionRoom({ heroes, room, toggleBusy }: RoomProps) {
    if (room.type !== "Decision") return null;
    const [encounter, setEncounter] = useState<Decision>(room as Decision)

    return (
        <h1>Decision</h1>
    )
}