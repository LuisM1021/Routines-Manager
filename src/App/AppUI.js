import React from 'react'
import { GeneralContext } from '../GeneralContext';
function AppUI(){
    const {
        saveItem,getItem
    } = React.useContext(GeneralContext)
    const rutina = {
        nombre: 'hiit 5 minutos',
        ejercicios: ['pierna','brazo']
    }
    return(
        <div className="App">
            ready to program
        </div>
    );
}

export {AppUI};