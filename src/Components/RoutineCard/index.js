import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import './RoutineCard.css'

function RoutineCard({routine}){
    const {
        setShowRoutineDetails,
        setSelectedRoutineDetails
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
            <h3 className='card-title'>
                {routine.name}
            </h3>
            <p className='routine-description'>
                {routine.description}
            </p>
            <div className='detail-container'>
                <p className='time'>
                    <span>
                        Time: 
                    </span>
                    {showTime()}  
                </p>
                <p className='equipment'>
                    <span>
                        Equipment:
                    </span>
                    <span>
                        {routine.equipment}
                    </span>
                </p>
            </div>
        </div>
    )
}
export {RoutineCard}