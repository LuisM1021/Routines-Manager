import './RoutineDetails.css'
import { GeneralContext } from '../../GeneralContext'
import { useContext,useState } from 'react'
import { ArrowRightCircleIcon,ArrowLeftCircleIcon,PencilSquareIcon,PlusCircleIcon } from '@heroicons/react/24/outline'
function RoutineDetails(){
    const {
        setShowRoutineDetails,
        selectedRoutineDetails: routine,
        exercises
    } = useContext(GeneralContext)
    const hideRoutineDetails=(event)=>{
        if(event.target.className ==='background'){
            setShowRoutineDetails(false)
        }
    }
    //Storing the index of the current exercise
    const [currentExercise,setCurrentExercise] = useState(0)
    const getExercisePath = ()=>{
        let path
        const exercise = exercises?.filter(exercise=>exercise.name === routine.exercises[currentExercise])
        path = exercise[0].imgPath
        return path
    }
    const changeExercise = (direction) => {
        const lengthOfRoutineExercises = routine.exercises.length
        if(direction === 'left'){
            if(currentExercise === 0){
                setCurrentExercise(lengthOfRoutineExercises-1)
            }else{
                setCurrentExercise(currentExercise-1)
            } 
        }else{
            if(currentExercise === lengthOfRoutineExercises-1){
                setCurrentExercise(0)
            }else{
                setCurrentExercise(currentExercise+1)
            } 
        }
    }
    const showTime= (time)=>{
        if(time[0]===0 && time[1]===0 && time[2]===0){
            return(
                <span></span>
            )
        }
        else if(time[0]>0){
            return(
                <span>Time: {time[0]}h {time[1]}m {time[2]}s</span>
            )
        }
        else if(time[0]===0 && time[1]>0){
            return(
                <span>Time: {time[1]}m {time[2]}s</span>
            )
        }
        else if(time[0]===0 && time[1]===0){
            return(
                <span>Time: {time[2]}s</span>
            )
        }
    }
    return(
        <div className='background' onClick={(event)=>hideRoutineDetails(event)}>
            <div className='routine-details-container'>
                <h2>{routine.name}</h2>
                <PlusCircleIcon className='plus-circle-icon'/>
                <PencilSquareIcon className='pencil-square-icon'/>
                <p className='description'>{routine.description}</p>
                <div className='category-time'>
                    <p>Category: {routine.category}</p>
                    <p>{showTime(routine.timer.totalTime)}</p>
                </div>
                <p>Require equipment: {routine.equipment}</p>
                <div className='exercises-panel'>
                    <div className='exercises-info'>
                        <h2>{routine.exercises[currentExercise]}</h2>
                        <p>Series: {routine.series[currentExercise]}</p>
                        <p>Reps: {routine.reps[currentExercise]}</p>
                        <p>{showTime(routine.time[currentExercise])}</p>
                    </div>
                    <figure className='exercise-image'>
                        <ArrowLeftCircleIcon className='left-arrow'
                        onClick={()=>changeExercise('left')}/>
                        <ArrowRightCircleIcon className='right-arrow'
                        onClick={()=>changeExercise('right')}/>
                        <img src={getExercisePath()} alt={routine.exercises[currentExercise]}></img>
                    </figure>
                </div>
            </div>
        </div>
    )
}

export {RoutineDetails}