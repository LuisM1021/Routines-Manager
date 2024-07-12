import { GeneralContext } from "../../GeneralContext";
import { useContext } from "react";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/outline";

import './ExerciseDetail.css'

function ExerciseDetail(){
    const context = useContext(GeneralContext)
    const exercise = context.displayExerciseDetail
    const showTime= (exercise)=>{
        if(exercise.suggestedTime[0]>0 && exercise.suggestedTime[1]>0){
            return(
                <span>{exercise.suggestedTime[0]}h {exercise.suggestedTime[1]}m</span>
            )
        }
        else if(exercise.suggestedTime[0]===0 && exercise.suggestedTime[1]>0){
            return(
                <span>{exercise.suggestedTime[1]}m</span>
            )
        }
        else if(exercise.suggestedTime[0]===0 && exercise.suggestedTime[1]===0){
            return(
                <span>{exercise.suggestedTime[2]}s</span>
            )
        }
    }
    return(
        <aside className='exercise-aside'>
            <XCircleIcon className='exercise-aside__close'
             onClick={()=>context.setDisplayExerciseDetail(false)}/>
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
            <div className='exercise-aside__benefits-cont'>
                <button className={`exercise-aside__open-benefits ${context.showBenefits && 'exercise-aside__open-benefits--active'}`}
                onClick={()=>context.showBenefits ? context.setShowBenefits(false) : context.setShowBenefits(true) }>
                    <span className='exercise-aside__benefits'>Benefits</span>
                    <ChevronDownIcon className='exercise-aside__benefits-arrow-down'/>
                </button>
                {context.showBenefits && 
                    <ul className='exercise-aside__benefits-list'>
                        {exercise.benefits.benefit.map((item,index) => 
                            <li className='exercise-aside__benefit-item' key={index}>{item}</li>
                        )}
                    </ul>
                }
            </div>
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
            {(exercise.suggestedTime[0] !== 0 || exercise.suggestedTime[1] !== 0 || exercise.suggestedTime[2] !== 0) && 
                <p className='exercise-aside__suggested-time'>
                    <span className='exercise-aside__suggested-time-label'>
                        Suggested time:
                    </span>
                    {showTime(exercise)}
                </p>
            }
            {exercise.requireEquipment !== 'No' &&
             <>   
                <div className='exercise-aside__equipment'>
                    <button className={`exercise-aside__open-equipment ${context.showEquipment && 'exercise-aside__open-equipment--active'}`}
                    onClick={()=>context.showEquipment ? context.setShowEquipment(false) : context.setShowEquipment(true) }>
                        <span className='exercise-aside__equipment-label'>Equipment</span>
                        <ChevronDownIcon className='exercise-aside__equipment-arrow-down'/>
                    </button>
                    {context.showEquipment && 
                        <div>
                            <p className='exercise-aside__equipment-cont'>
                                <span className='exercise-aside__equipment-text-label'>Equipment: </span>
                                <span className='exercise-aside__equipment-name'>{exercise.equipment.name}</span>
                            </p>
                            <p className='exercise-aside__equipment-weight-cont'>
                                <span className='exercise-aside__equipment-weight-label'>Suggested weight: </span>
                                <span className='exercise-aside__equipment-weight'>{exercise.equipment.suggestedWeight}</span>
                            </p>
                        </div>
                    }
                </div>
            </>
            }
        </aside>
    )
}

export { ExerciseDetail }