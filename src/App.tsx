import { Criteria} from "./type"
import Main from './components/Main'
import Header from './components/Header'

import { ChangeEvent,  useState, useMemo } from 'react'
import { Poke } from "./type"
function App() {
  //List guarda la lista de Pokemon una vez llega desde la api
  const [list,setList] = useState<Poke[]>([])
  //Input se encarga de controlar los inputs de búsqueda
  const [input, setInput] = useState("")
  
  //filer guarda el criterio de búsqueda actual
  const [filter,setFilter] = useState<Criteria>("name")

  //filterForTypes guarda el tipo actual por el que se esta filtrando, si hay un string vació significa que no se esta filtrando por nada
  const [filterForTypes, setFilterForTypes] = useState<string>("")

 
  const changeFilter =(event:ChangeEvent<HTMLSelectElement>)=>{setFilter(event.target.value as Criteria); setInput("")}

  const updateList = (newList: Poke[])=>{setList(newList)}
  const handleInput = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>setInput(e.target.value)
  
  const changeFilterType = (e:string)=>{if(e === filterForTypes) {setFilterForTypes("")} else {setFilterForTypes(e)} }
  const resetFilters = ()=>{setFilterForTypes("");setInput("")}

  // Filtros --------------------------------

  // Filtra lo buscado por el usuario al escribir en el campo de texto
  const filterPokes = useMemo(()=>{
    return input.length > 0 ? list.filter(poke=>{
      //Filtra en caso de que se este buscando por nombre
      if(filter === "name" && poke.name.includes(input.toLocaleLowerCase())){
        return true
      }
        //Filtra en caso de que se este buscando por id
      if(filter === "id" && poke.id === parseInt(input)){
        return true
      }
       //Filtra en caso de que se este buscando por altura
      if(filter === "height" && poke.height === parseInt(input)){
        return true
      }
       //Filtra en caso de que se este buscando por peso
      if(filter === "weight" && poke.weight === parseInt(input)){
        return true
      }
       //Filtra en caso de que se este buscando por habilidad
      if(filter === "abilities" && poke.abilities.includes(input)){
        return true
      }
       //En caso de que no haya ninguna coincidencia este valor no se agrega
      return false


    } ):list
  },[list,input,filter])


  // Filtra dependiendo del Tipo de Pokemon seleccionado
  const filterTypes = useMemo(()=>{

    // Primero verifica si filterForTypes no es un string vació
    if(filterForTypes.length === 0){
      return filterPokes
    }
    //Luego ve si el tipo existe dentro de los Pokemon y los filtra
    return filterPokes.filter(poke=> poke.types.includes(filterForTypes))
  },[filterForTypes,filterPokes])





  
  return (
    <>  
   
      <Header changeFilter={changeFilter} reset={resetFilters} value={input} filter={filter} change={handleInput}/>
      <Main list={filterTypes} update={updateList} filterType={changeFilterType}/>
    </>
  )
}

export default App
