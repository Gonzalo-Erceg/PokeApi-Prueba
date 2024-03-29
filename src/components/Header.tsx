import { ChangeEvent } from "react"
import style from "../css/header.module.css"
import { Criteria } from "../type"
import { Icon } from "./assets/pokeapi"
import { InputProps } from "../type"
interface Props{
    changeFilter:(event:ChangeEvent<HTMLSelectElement>)=>void,
    filter: Criteria,
    value:string,
    change:(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    reset:()=>void
}



const InputName = ({value, change}:InputProps)=>{
    return <input type="text" value={value} onChange={change} placeholder="Pokemon name"/>
}

const InputNumber = ({value, change,filter}:InputProps)=>{
    return <input type="number" min={0} value={value} onChange={change} placeholder={`Pokemon ${filter}`}/>
}

const InputAbilities = ({change}:InputProps)=>{
    return <select defaultValue="" onChange={change}>
        <option value="" >---------</option>
        <option value={"stench"}>stench</option>
        <option value={"drizzle"}>drizzle</option>
        <option value="speed-boost">speed-boost</option>
        <option value="battle-armor">battle-armor</option>
        <option value="sturdy">sturdy</option>
        <option value="damp">damp</option>
        <option value="limber">limber</option>
        <option value="sand-veil">sand-veil</option>
        <option value="static">static</option>
        <option value="volt-absorb">volt-absorb</option>
        <option value="water-absorb">water-absorb</option>
        <option value="oblivious">oblivious</option>
        <option value="cloud-nine">cloud-nine</option>
        <option value="compound-eyes">compound-eyes</option>
        <option value="insomnia">insomnia</option>
        <option value="color-change">color-change</option>
        <option value="immunity">immunity</option>
        <option value="shield-dust">shield-dusts</option>
        <option value="own-tempo">own-tempo</option>
    </select>
}






export default function Header({changeFilter,filter,value,change,reset}:Props){

    //este objeto se encarga de recopilar los inputs necesarios para que luego pueda intercambiarlos de forma dinámica
    const filterComponents = {
        name: <InputName value={value} change={change}/>,
        id: <InputNumber value={value} change={change} filter={filter}/>,
        weight: <InputNumber value={value} change={change} filter={filter}/>,
        height: <InputNumber value={value} change={change} filter={filter}/>,
        abilities: <InputAbilities value={value} change={change}/>
    }
    return <header className={style.header}>
         <Icon/>
         <section className={style.inputSection}>
            <div>
                
                <h2>Search your favorite Pokemon</h2>
                <div className={style.inputGroup}>
                    {filterComponents[filter]}
                    <label htmlFor="search">
                        Search by: 
                    </label>
                    <select onChange={changeFilter} id="search">
                    
                        <option value="name">Name</option>
                        <option value="id">ID</option>
                        <option value="abilities">Abilities</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                    </select>
                    <button onClick={()=>reset()}>Reset search</button>
                </div>
            </div>
         </section>
    </header>
}