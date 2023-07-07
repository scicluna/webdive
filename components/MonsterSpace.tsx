import { Monster } from "@/utils/tableRoller"
import { SetStateAction } from "react"
import { v4 } from "uuid"

type MonsterSpaceProps = {
    monsters: Monster[]
    target: number
    setTarget: React.Dispatch<SetStateAction<number>>
}

export default function MonsterSpace({ monsters, target, setTarget }: MonsterSpaceProps) {
    return (
        <div className="h-1/2 w-full flex justify-center items-center">
            {monsters.map((monster, i) => (
                <div className={`flex flex-col items-center ${target === i ? 'p-4 border-dashed border-black border' : 'border-none'} ${monster.alive ? 'text-black' : 'text-red-500'}`} key={v4()} onClick={() => setTarget(i)}>
                    <p>{monster.name}</p>
                    <p>{monster.hp}</p>
                </div>
            ))}
        </div>
    )
}