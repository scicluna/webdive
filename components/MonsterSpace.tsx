import { Monster } from "@/utils/tableRoller"
import { v4 } from "uuid"

type MonsterSpaceProps = {
    monsters: Monster[]
}

export default function MonsterSpace({ monsters }: MonsterSpaceProps) {
    return (
        <div className="h-1/2 w-full flex justify-center items-center">
            {monsters.map((monster) => (
                <div className="flex flex-col items-center" key={v4()}>
                    <p>{monster.name}</p>
                    <p>{monster.hp}</p>
                </div>
            ))}
        </div>
    )
}