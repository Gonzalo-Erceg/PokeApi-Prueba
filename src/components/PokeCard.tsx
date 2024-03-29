
import { pokeTypes } from "../utils/pokeTypes"
import PokeBadge from "./PokeBadge"
import style from "../css/PokeCard.module.css"

import { Poke } from "../type"

export default function PokeCard({sprite,name,types,id,abilities,height, weight}:Poke){
    //Tomo el ID del Pokemon y lo transformo en formato -> #000
    const pokeID = "#" + String(id).padStart(3,"0")
    //Uno loas habilidades en un string para poder mostrarlas cómodamente
    const joinAbilities = abilities.join("/")


    return <article className={style.pokeCard} style={{backgroundImage: `linear-gradient(250deg, ${pokeTypes[types[0]]} 45%, ${types[1]? pokeTypes[types[1]]: pokeTypes[types[0]]} 45%)`}}>
        <h2>{name}</h2>
        {/*Genero un gradiente de fondo para el sprite en base a sus tipos */}
        <div className={style.imgContainer} > <img src={sprite} alt={name}/></div>
        <div className={style.infoContainer}>
            <div >
                <div>{pokeID}</div>
                <span className={style.abilities}>{joinAbilities}</span>
            </div>
            <div className={style.badgeSection}><PokeBadge color={pokeTypes[ types[0]]}>{types[0]}</PokeBadge>
                {types[1] && <PokeBadge color={pokeTypes[ types[1]]}>{types[1]}</PokeBadge> }
       
            </div>
            
            <div>
                <p>height: {height}</p>
                <p>weight: {weight}</p>
            </div>
       </div>
    </article>
}