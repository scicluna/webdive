import { Monster } from "./tableRoller"
import { Hero } from "@/components/HeroContext"
const heroOptions = ['ATK', 'BLK', 'ITM'] as const

export function heroAction(option: typeof heroOptions, target: Monster | Hero | undefined) {

}