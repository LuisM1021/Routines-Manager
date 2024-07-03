import { GeneralContext } from "../../GeneralContext";
import { useContext } from "react";

import './ExerciseDetail.css'

function ExerciseDetail(){
    const context = useContext(GeneralContext)
    const exercise = context.displayExerciseDetail
    console.log(exercise)
    return(
        <aside className='exercise-aside'>
            <h1 className='exercise-aside__title'>{exercise.name}</h1>
            <figure className='exercise-aside__img-container'>
                <img className='exercise-aside__img' src={exercise.imgPath} alt={exercise.name}/>
            </figure>
            <h3 className='exercise-aside__description-label'>Description</h3>
            <p className='exercise-aside__description'>{exercise.description}</p>
            <p className='exercise-aside__category'>
                <span className='exercise-aside__category-label'>
                    Category:
                </span>
                <span className="exercise-aside__category-name">
                    {exercise.category}
                </span>
            </p>
            <p className='exercise-aside__muscular-group'>
                <span className='exercise-aside__muscular-group-label'>
                    Muscular group:
                </span>
                <span className="exercise-aside__muscular-group-name">
                    {exercise.muscularGroup}
                </span>
            </p>
            <p className='exercise-aside__suggested-reps'>
                <span className='exercise-aside__suggested-reps-label'>
                    Suggested Reps:
                </span>
                <span className="exercise-aside__suggested-reps-name">
                    {exercise.suggestedReps}
                </span>
            </p>
            <p className='exercise-aside__suggested-series'>
                <span className='exercise-aside__suggested-series-label'>
                    Suggested series:
                </span>
                <span className="exercise-aside__suggested-series-name">
                    {exercise.suggestedSeries}
                </span>
            </p>
            <p className='exercise-aside__suggested-time'>
                <span className='exercise-aside__suggested-time-label'>
                    Suggested time:
                </span>
                <span className="exercise-aside__suggested-time-name">
                    {exercise.suggestedTime}
                </span>
            </p>
            {exercise.requireEquipment !== 'No' &&
             <>   
                <p className='exercise-aside__equipment'>
                    <span className='exercise-aside__equipment-label'>
                        Equipment:
                    </span>
                    <span className='exercise-aside__equipment-name'>
                        {exercise.equipment.name}
                    </span>
                </p>
                <p className='exercise-aside__suggested-weight'>
                    <span className='exercise-aside__suggested-weight-label'>
                        Suggested weight:
                    </span>
                    <span className='exercise-aside__suggested-weight-name'>
                        {exercise.equipment.suggestedWeight}
                    </span>
                </p>
            </>
            }
        </aside>
    )
}

export { ExerciseDetail }