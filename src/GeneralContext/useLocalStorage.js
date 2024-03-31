import React from 'react';

function useLocalStorage(){
    const [routines,setRoutines] = React.useState([]);
    const [exercises,setExercises] = React.useState([]);

    const saveItem = (itemName,item)=>{
        console.log('item before: '+item)
        const stringifiedItem = JSON.stringify(item)
        localStorage.setItem(itemName,stringifiedItem)
        console.log('NOW: ',stringifiedItem)
    }
    const getItem = (itemName)=>{
        const item = localStorage.getItem(itemName)
        // console.log(item)
        return(JSON.parse(item))
    }
    React.useEffect(()=>{
        setRoutines(getItem('routines'))
    },[])
    React.useEffect(()=>{
        setExercises(getItem('exercises'))
    },[])


    return {
        saveItem, getItem,routines,exercises
    }
}

export {useLocalStorage}