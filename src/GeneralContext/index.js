import React, { useState,useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { loadAvailableCategories } from '../Utils';

const GeneralContext = React.createContext()

function GeneralProvider({children}){
    //Taking the functions of the useLocalStorage custom hook
    const{
        saveItem,getItem,routines,exercises
    } = useLocalStorage();
    const [selectedRoutine,setSelectedRoutine] = React.useState(null)
    React.useEffect(()=>setSelectedRoutine(routines[0]),[routines[0]])
    //Random number function 
    const getRandom =(min,max)=>{
        return Math.floor(Math.random()*(max-min))+min
    }
    //Routines: Show routine details
    const [showRoutineDetails,setShowRoutineDetails] = React.useState(false)
    //Routines: Save selected routine data
    const [selectedRoutineDetails,setSelectedRoutineDetails] = React.useState({})
    
    //Available categories according to the list of routines
    const [availableCategories,setAvailableCategories] = useState(null)

    //Filtered routines 
    const [filteredRoutines,setFilteredRoutines] = useState([])
    console.log('original: ',filteredRoutines)

    useEffect(()=>{
        setFilteredRoutines(routines)
    },[routines])

    useEffect(()=>{
        setAvailableCategories(loadAvailableCategories(filteredRoutines))
    },[filteredRoutines])

    //filter by 
    const [filterBy,setFilterBy] = useState([null,null,null,null])

    //Filter by name 
    const [searchByName,setSearchByName] = useState(null)

    //Logic to filter routines
    useEffect(()=>{
        let routinesToSet = []
        //Filter by name
        console.log("evaluar",searchByName)
        console.log("filtered routines a evaluar: ",filteredRoutines)
        if(filteredRoutines.length === 0) routinesToSet = routines
        else routinesToSet = filteredRoutines
        //TODO: ARREGLAR EL FILTRO DE NOMBRES E IMPLEMENTAR LOS DEMAS FILTROS
        if(filterBy[0]==='name'){
            routinesToSet = routinesToSet?.filter(routine => routine.name.includes(searchByName))
            if (routinesToSet?.length ===0 && searchByName === '') routinesToSet = routines
        }
        if(filterBy[1]==='time'){

        }
        if(filterBy[2]==='category'){
            // routinesToSet = routinesToSet.filter(routine => routine.category === )
        }
        if(filterBy[3]==='equipment'){

        }
        setFilteredRoutines(routinesToSet)
    },[searchByName])
    return (
        <GeneralContext.Provider value={{
            saveItem,
            getItem,
            routines,
            exercises,
            getRandom,
            selectedRoutine,
            setSelectedRoutine,
            showRoutineDetails,
            setShowRoutineDetails,
            selectedRoutineDetails,
            setSelectedRoutineDetails,
            filteredRoutines,
            setSearchByName,
            searchByName,
            setFilterBy,
            filterBy,
            availableCategories
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}