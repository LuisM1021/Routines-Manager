import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { PlusCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import './ExerciseCard.css'

function ExerciseCard({ exercise }){
    const context = useContext(GeneralContext);

    const showExerciseDetails = (event) => {
        if(event.target.classList.value !== 'exercise-card__added' && event.target.classList.value !== 'exercise-card__add'){
            context.setDisplayExerciseDetail(exercise)
            context.setShowEquipment(false)
            context.setShowBenefits(false)
        }
    }
    const addToList = () => {
        const isInExercisesList = context.exercisesList.some(item => item.name === exercise.name)
        if(!isInExercisesList)
        context.setExercisesList((exercises)=>([...exercises, exercise]))
    }
    return(
        <div 
         className='exercise-card'
         onClick={(event)=>showExerciseDetails(event)}>
            <figure className='exercise-card__img'>
                {context.exercisesList.some(item => item.name === exercise.name) ? 
                    <CheckCircleIcon className='exercise-card__added'/> :
                    <PlusCircleIcon className='exercise-card__add'
                     onClick={()=>addToList()}/>
                }
                <figcaption className='exercise-card__name'>{exercise.name}</figcaption>
                <img className='exercise-card__image' src={exercise.imgPath} alt={exercise.name}/>
            </figure>
        </div>
    )
}

export {ExerciseCard}