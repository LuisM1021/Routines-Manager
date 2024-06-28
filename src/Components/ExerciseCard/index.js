import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import './ExerciseCard.css'

function ExerciseCard({ exercise }){
    const context = useContext(GeneralContext);
    return(
        <div 
         className='exercise-card'
         onClick={()=>context.setDisplayExerciseDetail(exercise)}>
            <figure className='exercise-card__img'>
                <figcaption className='exercise-card__name'>{exercise.name}</figcaption>
                <img className='exercise-card__image' src={exercise.imgPath} alt={exercise.name}/>
            </figure>
        </div>
    )
}

export {ExerciseCard}