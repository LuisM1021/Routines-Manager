import { useContext } from 'react'
import './Routines.css'
import {GeneralContext} from '../../GeneralContext'
import {RoutineCard} from '../../Components/RoutineCard'
import {ChevronDoubleUpIcon} from '@heroicons/react/24/outline'


function Routines(){
    const {
        routines
    } = useContext(GeneralContext)
    const scrollToTopRoutineCards=(event)=>{
        document.getElementById('scrollRoutineCards').scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
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
                <div className='routine-cards' id='scrollRoutineCards'>
                    {routines?.map(routine=>{
                        return <RoutineCard
                        key={routine.name}
                        name={routine.name}
                        description={routine.description}
                        totalTime={routine.timer.totalTime}
                        requireEquipment={routine.equipment}/>
                    })}
                <div className='scroll-up-container' onClick={()=>scrollToTopRoutineCards()}><ChevronDoubleUpIcon className='scroll-up-icon'/></div>
                </div>
            </div>
            <div className='user-routines'>
                <h1>My Routines</h1>
            </div>
        </div>
    )
}

export {Routines}