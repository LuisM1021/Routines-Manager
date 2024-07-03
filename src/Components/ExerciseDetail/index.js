import { GeneralContext } from "../../GeneralContext";
import { useContext, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

import './ExerciseDetail.css'

function ExerciseDetail(){
    const context = useContext(GeneralContext)
    const exercise = context.displayExerciseDetail
    console.log(exercise)
    const [showBenefits, setshowBenefits] = useState(false)
    const [showEquipment, setshowEquipment] = useState(false)
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
            <div className='exercise-aside__benefits'>
                <button className={`exercise-aside__open-benefits ${showBenefits && 'exercise-aside__open-benefits--active'}`}
                onClick={()=>showBenefits ? setshowBenefits(false) : setshowBenefits(true) }>
                    <span className='exercise-aside__benefits'>Benefits</span>
                    <ChevronDownIcon className='exercise-aside__benefits-arrow-down'/>
                </button>
                {showBenefits && 
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
                    <button className={`exercise-aside__open-equipment ${showEquipment && 'exercise-aside__open-equipment--active'}`}
                    onClick={()=>showEquipment ? setshowEquipment(false) : setshowEquipment(true) }>
                        <span className='exercise-aside__equipment-label'>Equipment</span>
                        <ChevronDownIcon className='exercise-aside__equipment-arrow-down'/>
                    </button>
                    {showEquipment && 
                        <p>
                            <span>{exercise.equipment.name}</span>
                            <span>{exercise.equipment.suggestedWeight}</span>
                        </p>
                    }
                </div>
                {/* <p className='exercise-aside__equipment'>
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
                </p> */}
            </>
            }
        </aside>
    )
}

export { ExerciseDetail }