import { pokeTypes } from "./utils/pokeTypes"
export type Criteria  = "name" | "id" | "abilities" | "height" | "weight"

export type pokeTypes = keyof typeof pokeTypes
export interface Poke{
    id:number,
    name:string,
    height: number,
    sprite:string,
    weight:number,
    types:poke[]
    abilities:string[]
}




export interface InputProps {
    value: string,
    change: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    filter?: Criteria
}