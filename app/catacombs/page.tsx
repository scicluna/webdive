'use client'
import { useHero } from "@/components/HeroContext"
import { useState } from "react";

//import all catacombs tables here
//create a "traverse catacombs function"
//call it whenever the room is "done"
//keep track of room in a state
//always make 10th room a boss

export default function Catacombs() {
    const [currentRoom, setCurrentRoom] = useState<number>(0)
    const hero = useHero();

    return (
        <h1>Catacombs</h1>
    )
}