import React, { useState,useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { loadAvailableCategories,loadEquipmentOptions,filterRoutinesByTimeRange } from '../Utils';

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

    //Equipment options according to the list of routines
    const [equipmentOptions,setEquipmentOptions] = useState(null)

    //Filtered routines 
    const [filteredRoutines,setFilteredRoutines] = useState([])

    useEffect(()=>{
        setFilteredRoutines(routines)
    },[routines])

    useEffect(()=>{
        setAvailableCategories(loadAvailableCategories(routines))
        setEquipmentOptions(loadEquipmentOptions(routines))
    },[routines])

    //filter by 
    const [filterBy,setFilterBy] = useState([null,null,null,null])

    //Filter by name 
    const [searchByName,setSearchByName] = useState('')

    //Values of the time filter
    const [minSec,setMinSec] = useState('00')
    const [minMinutes,setMinMinutes] = useState('00')
    const [minHrs,setMinHrs] = useState('00')
    const [maxSec,setMaxSec] = useState('00')
    const [maxMin,setMaxMin] = useState('00')
    const [maxHrs,setMaxHrs] = useState('00')

    //Filter by category
    const [searchByCategory,setSearchByCategory] = useState([])

    //Filter by equipment
    const [searchByEquipment,setSearchByEquipment] = useState([])

    const [executeFilters,setExecuteFilters] = useState(false)

    const resetFilters = () => {
        setFilterBy([null,null,null,null])
        setSearchByName('')
        setMinHrs('00')
        setMinMinutes('00')
        setMinSec('00')
        setMaxHrs('00')
        setMaxMin('00')
        setMaxSec('00')
        setSearchByCategory([])
        setSearchByEquipment([])
        setExecuteFilters(true)
    }
    //Logic to filter routines
    useEffect(()=>{
        let routinesToSet = routines
        if(filterBy[0]==='name'){
            routinesToSet = routinesToSet?.filter(routine => routine.name.includes(searchByName))
            if (routinesToSet?.length ===0 && searchByName === '') routinesToSet = routines
        }
        if(filterBy[1]==='time'){
            routinesToSet = filterRoutinesByTimeRange(routinesToSet,minHrs,minMinutes,minSec,maxHrs,maxMin,maxSec)
        }
        if(filterBy[2]==='category'){
            if(searchByCategory.length>0){
                routinesToSet = routinesToSet.filter(routine => {
                    if(searchByCategory.find(cat => cat === routine.category)){
                        return routine
                    }
                })
            }
        }
        if(filterBy[3]==='equipment'){
            if(searchByEquipment.length>0){
                routinesToSet = routinesToSet.filter(routine => {
                    if(searchByEquipment.find(equip => equip === routine.equipment)){
                        return routine
                    }
                })
            }
        }
        setFilteredRoutines(routinesToSet)
        setExecuteFilters(false)
    },[searchByName,executeFilters])
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
            availableCategories,
            setSearchByCategory,
            searchByCategory,
            setExecuteFilters,
            equipmentOptions,
            setSearchByEquipment,
            searchByEquipment,
            setMinHrs,
            minHrs,
            setMinMinutes,
            minMinutes,
            setMinSec,
            minSec,
            setMaxHrs,
            maxHrs,
            setMaxMin,
            maxMin,
            setMaxSec,
            maxSec,
            resetFilters
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}