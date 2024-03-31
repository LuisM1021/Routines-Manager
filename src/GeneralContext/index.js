import React from 'react';
import { useLocalStorage } from './useLocalStorage';

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

    return (
        <GeneralContext.Provider value={{
            saveItem,getItem,routines,exercises,getRandom,selectedRoutine,setSelectedRoutine
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}