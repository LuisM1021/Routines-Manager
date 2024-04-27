import React from 'react';
import {getTimer,initializeStorage} from '../Utils'

function useLocalStorage(){
    const [routines,setRoutines] = React.useState([]);
    const [exercises,setExercises] = React.useState([]);

    const saveItem = (itemName,item)=>{
        const stringifiedItem = JSON.stringify(item)
        localStorage.setItem(itemName,stringifiedItem)
    }
    const getItem = (itemName)=>{
        const item = localStorage.getItem(itemName)
        return(JSON.parse(item))
    }
    React.useEffect(()=>{
        initializeStorage()
        const getRoutines = getItem('routines')
        const routinesWithTimer = getTimer(getRoutines)
        setRoutines(routinesWithTimer)

    },[])
    React.useEffect(()=>{
        initializeStorage()
        setExercises(getItem('exercises'))
    },[])


    return {
        saveItem, getItem,routines,exercises
    }
}

export {useLocalStorage}