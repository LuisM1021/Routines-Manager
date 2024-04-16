import './RoutineDetails.css'
import { GeneralContext } from '../../GeneralContext'
import { useContext } from 'react'
function RoutineDetails(){
    const {
        setShowRoutineDetails,
        selectedRoutineDetails: routine
    } = useContext(GeneralContext)
    const hideRoutineDetails=(event)=>{
        if(event.target.className ==='background'){
            setShowRoutineDetails(false)
        }
    }
    return(
        <div className='background' onClick={(event)=>hideRoutineDetails(event)}>
            <div className='routine-details-container'>
                <h2>{routine.name}</h2>
                <p>{routine.description}</p>
                <p>{routine.category}</p>
                <p>{routine.timer.totalTime}</p>
                <p>{routine.equipment}</p>
            </div>
        </div>
    )
}

export {RoutineDetails}