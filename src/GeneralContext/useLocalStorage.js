import { useState, useEffect } from 'react';
import { getTimer, initializeStorage } from '../Utils'

function useLocalStorage(){
    const [routines,setRoutines] = useState([]);
    const [exercises,setExercises] = useState([]);
    const [userRoutines, setUserRoutines] = useState([]);

    const saveItem = (itemName,item)=>{
        const stringifiedItem = JSON.stringify(item)
        localStorage.setItem(itemName,stringifiedItem)
    }
    const getItem = (itemName)=>{
        const item = localStorage.getItem(itemName)
        return(JSON.parse(item))
    }
    //Initialize routines and add their timers
    useEffect(()=>{
        initializeStorage()
        const getRoutines = getItem('routines')
        const routinesWithTimer = getTimer(getRoutines)
        setRoutines(routinesWithTimer)

    },[])
    useEffect(()=>{
        initializeStorage()
        setExercises(getItem('exercises'))
    },[])
    useEffect(()=>{
        setUserRoutines(getItem('userRoutines'))
    },[])

    return {
        saveItem,
        getItem,
        routines,
        exercises,
        userRoutines,
        setUserRoutines
    }
}

export {useLocalStorage}