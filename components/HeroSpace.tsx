import { Hero } from "./HeroContext";

type heroespaceProp = {
    heroes: {
        state: Hero[]
        dispatch: React.Dispatch<any>
    }
}

export default function heroespace({ heroes }: heroespaceProp) {
    return (
        <div className="h-1/2 w-full flex justify-center items-center">
            {heroes.state.map(hero => (
                <div className="flex flex-col gap-5 justify-center items-center">
                    <div className="flex gap-5">
                        {hero.options.map(option => <button>{option}</button>)}
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