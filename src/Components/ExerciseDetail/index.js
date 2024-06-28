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
            <figure className='exercise-aside__img'>
                <img src={exercise.imgPath} alt={exercise.name}/>
            </figure>
            <h2 className='exercise-aside__description-label'>Description</h2>
            <p className='exercise-aside__description'>{exercise.description}</p>
        </aside>
    )
}

export { ExerciseDetail }