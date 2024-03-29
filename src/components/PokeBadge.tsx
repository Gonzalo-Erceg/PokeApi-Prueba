import { ReactNode } from "react"
import style from "../css/PokeBadge.module.css"

interface Props{
    children: ReactNode,
    color:string
}

export default function PokeBadge({children,color}:Props){
    return <span className={style.pokeBadge} style={{background:color}}>{children}</span>
}