import { useContext } from 'react'
import './Routines.css'
import {GeneralContext} from '../../GeneralContext'
import {RoutineCard} from '../../Components/RoutineCard'

function Routines(){
    const {
        routines
    } = useContext(GeneralContext)
    return(
        <div className='routines-container'>
            <div className='search-routine'>
                <h1>Search Routine</h1>
                <div className='filter-bar'>
                    <p>Filter</p>
                    <div className='filters'>
                        <button>Name</button>
                        <button>Time</button>
                        <button>Category</button>
                        <button>Require equipment</button>
                    </div>
                </div>
                {routines?.map(routine=>{
                    return <RoutineCard
                    key={routine.name}
                    name={routine.name}/>
                })}
            </div>
            <div className='user-routines'>
                <h1>My Routines</h1>
            </div>
        </div>
    )
}

export {Routines}