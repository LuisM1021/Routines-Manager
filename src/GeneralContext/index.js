import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const GeneralContext = React.createContext()

function GeneralProvider({children}){
    //Taking the functions of the useLocalStorage custom hook
    const{
        saveItem,getItem
    } = useLocalStorage();
    return (
        <GeneralContext.Provider value={{
            saveItem,getItem
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}