import {  useEffect,useState } from "react"
import { Poke } from "../type"
import PokeCard from "./PokeCard"
import style from "../css/Main.module.css"
import { pokeTypes } from "../utils/pokeTypes"

interface Props{
    list:Poke[],
    filterType: (e:string)=>void,
    update:(arg0:Poke[])=>void
}

export default function Main({list,update,filterType}:Props){
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        const pokes = async ():Promise<Poke[]>=>{
            const pokeInfo:Poke[] = []
            const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=386")
            const res= await response.json()
            // Del primer fetch solo recibo el link para hacer la petición de informornacion de cada Pokemon, asi que itero el resultado para hacer una llamada individual para cada uno
            for(const element of res.results){
                const response = await fetch(element.url)
                const result = await response.json()
                // Luego guardo la información necesaria recibida de cada Pokemon
                const poke: Poke = {
                    id:result.id,
                    name:result.name,
                    abilities:result.abilities.map((e:{ability:{name:string}})=>e.ability.name),
                    weight: result.weight,
                    height: result.height,
                    types:result.types.map((e:{type:{name:string}})=>e.type.name),
                    sprite:result.sprites.front_default,
                }
                pokeInfo.push(poke)
            }
           return pokeInfo
        }
        pokes().then(element=>{update(element);setLoading(false)})
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return<main>
        <div className={style.types}>
          
            <div className={style.typeList}>
                {Object.keys(pokeTypes).map((key,index)=><button key={index} style={{background:pokeTypes[key]}} onClick={()=>filterType(key)}>{key}</button>)}
            </div>
            <span >Tap one and filter by your favorite Pokemon type</span>
        </div>
        {loading?<div className={style.loaderContainer}><span className={style.loader}></span> <span>This may take a few seconds while the information is recovered.</span></div>:
         <section className={style.pokeCardSection}>
         {list.length > 0 ? list.map(element=><PokeCard {...element}/>): <h2>Wow, we haven't found anything that matches your search.</h2>}
        </section>
    
        }
      
       
    </main>
}