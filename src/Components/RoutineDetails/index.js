import './RoutineDetails.css'
import { GeneralContext } from '../../GeneralContext'
import { useContext,useState } from 'react'
import { ArrowRightCircleIcon,ArrowLeftCircleIcon,PlusCircleIcon } from '@heroicons/react/24/outline'
import { CreateRoutine } from '../../Utils/createRoutine'

function RoutineDetails(){
    const {
        setShowRoutineDetails,
        selectedRoutineDetails: routine,
        exercises,
        addToUserRoutines,
        userRoutines
    } = useContext(GeneralContext)

    //Storing the index of the current exercise
    const [currentExercise,setCurrentExercise] = useState(0)
    const [renderDuplicate, setRenderDuplicate] = useState(false)

    const hideRoutineDetails=(event)=>{
        if(event.target.className ==='background'){
            setShowRoutineDetails(false)
        }
    }

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
                <span className='title-2'>{time[0]}h {time[1]}m {time[2]}s</span>
            )
        }
        else if(time[0]===0 && time[1]>0){
            return(
                <span className='title-2'>{time[1]}m {time[2]}s</span>
            )
        }
        else if(time[0]===0 && time[1]===0){
            return(
                <span className='title-2'>{time[2]}s</span>
            )
        }
    }
    const handleAddToUserRoutines = () => {
        if(CreateRoutine.verifyDuplicatedRoutineName(routine, userRoutines)){
            setRenderDuplicate(true)
        }else{
            addToUserRoutines(routine)
            setShowRoutineDetails(false)
        }
    }
    return(
        <div className='background' onClick={(event)=>hideRoutineDetails(event)}>
            <div className='routine-details-container'>
                {renderDuplicate && 
                    <div className='routine-details__duplicate-cont' 
                    onClick={(e)=>e.target.className === 'routine-details__duplicate-cont' && setRenderDuplicate(false)}>
                        <div className='routine-details__duplicate-card'>
                            <p className='routine-details__duplicate-msg'>
                                This routine is already saved
                            </p>
                        </div>
                    </div>
                }
                <h2 className='routine-name'>
                    {routine.name}
                </h2>
                <div className='add-routine-container'>
                    <figure 
                     className='plus-circle-icon'
                     onClick={()=>handleAddToUserRoutines()}>
                        <PlusCircleIcon/>
                    </figure>
                </div>
                <p className='description'>
                    {routine.description}
                </p>
                <div className='category-time'>
                    <p className='category-info'>
                        <span>
                            Category:
                        </span>
                        <span>
                             {routine.category}
                        </span>
                    </p>
                    <p className='time-info'>
                        <span>
                            Time:
                        </span>
                            {showTime(routine.timer.totalTime)}
                    </p>
                </div>
                <p className='require-equipment'>
                    <span>
                        Require equipment:
                    </span>
                    <span>
                        {routine.equipment}
                    </span>
                </p>
                <div className='exercises-panel'>
                    <div className='exercises-info'>
                        <h2>
                            {routine.exercises[currentExercise]}
                        </h2>
                        <p>
                            <span>
                                Series:
                            </span>
                            <span>
                                {routine.series[currentExercise]}
                            </span>
                        </p>
                        <p>
                            <span>
                                Reps:
                            </span>
                            <span>
                                {routine.reps[currentExercise]}
                            </span>
                        </p>
                        <p>
                            {(routine.time[currentExercise][0] !== 0 || routine.time[currentExercise][1] !== 0 || routine.time[currentExercise][2] !== 0) &&
                                <span>Time:</span>
                            }
                            {showTime(routine.time[currentExercise])}
                        </p>
                    </div>
                    <figure className='exercise-image-container'>
                        <ArrowLeftCircleIcon
                         className='left-arrow'
                         onClick={()=>changeExercise('left')}
                        />
                        <ArrowRightCircleIcon
                         className='right-arrow'
                         onClick={()=>changeExercise('right')}
                        />
                        <img 
                         className='exercise-image'
                         src={getExercisePath()} 
                         alt={routine.exercises[currentExercise]}
                        />
                    </figure>
                </div>
            </div>
        </div>
    )
}

export {RoutineDetails}