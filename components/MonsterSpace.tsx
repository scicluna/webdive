import { Monster } from "@/utils/tableRoller"
import { uuid } from "uuidv4"

type MonsterSpaceProps = {
    monsters: Monster[]
}

export default function MonsterSpace({ monsters }: MonsterSpaceProps) {
    return (
        <div className="h-1/2 w-full flex justify-center items-center">
            {monsters.map((monster) => (
                <div className="flex flex-col items-center">
                    <p key={uuid()}>{monster.name}</p>
                    <p>{monster.hp} hp</p>
                </div>
            ))}
        </div>
    )
}