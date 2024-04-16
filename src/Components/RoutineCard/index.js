import './RoutineCard.css'
import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
function RoutineCard({routine}){
    const {
        setShowRoutineDetails,setSelectedRoutineDetails
    } = useContext(GeneralContext)
    const showTime= ()=>{
        if(routine.timer.totalTime[0]>0 && routine.timer.totalTime[1]>0){
            return(
                <span>{routine.timer.totalTime[0]}h {routine.timer.totalTime[1]}m</span>
            )
        }
        else if(routine.timer.totalTime[0]===0 && routine.timer.totalTime[1]>0){
            return(
                <span>{routine.timer.totalTime[1]}m</span>
            )
        }
        else if(routine.timer.totalTime[0]===0 && routine.timer.totalTime[1]===0){
            return(
                <span>{routine.timer.totalTime[2]}s</span>
            )
        }
    }
    const handleSelectRoutine = ()=>{
        setShowRoutineDetails(true)
        setSelectedRoutineDetails(routine)
    }
    return(
        <div className='card-container' onClick={()=>handleSelectRoutine()}>
            <h3>{routine.name}</h3>
            <p>{routine.description}</p>
            <div className='detail-container'>
                <p>Time: 
                    {showTime()}
                </p>
                <p>Equipment: <span>{routine.equipment}</span></p>
            </div>
        </div>
    )
}
export {RoutineCard}