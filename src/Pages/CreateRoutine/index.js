import { Layout } from "../../Components/Layout"
import {  TrashIcon, Bars2Icon, PlusCircleIcon } from "@heroicons/react/24/outline"
import { ExerciseCard } from "../../Components/ExerciseCard";
import { ExerciseDetail } from "../../Components/ExerciseDetail";
import { Timer } from "../../Components/Timer";
import './CreateRoutine.css';
import './tablet.css'
import './desktop.css'

import { GeneralContext } from "../../GeneralContext";
import { useContext, useState } from "react";

function CreateRoutine(){
    const context = useContext(GeneralContext);
    const [panelRendered, setPanelRendered] = useState('exercises')
    const [draggedExercise, setDraggedExercise] = useState(-1)
    const [draggedOverExercise, setDraggedOverExercise] = useState(-1)

    const removeFromExercisesList = (exercise) => {
        context.setExercisesList((exercises)=>(exercises.filter(item => item.name !== exercise)))
    }
    const addNewExercise = () => {
        const index = context.exercisesList.length + 1
        const newExercise = {
            name: `New exercise ${index}`,
        }
        context.setExercisesList((exercises)=>([...exercises, newExercise]))
    }
    const customizeExercise = (newName, preName, id) => {
        if(newName.length>0){
            const newExercisesList = [...context.exercisesList]
            newExercisesList.forEach(item => {
                if(item.name === preName){
                    item.name = newName
                }
            })
            context.setExercisesList(newExercisesList)
        }else{
            document.getElementById(id).value = preName
        }   
    }
    const handleDragEnd = (e, draggedExercise, draggedOverExercise) =>{
        e.preventDefault()
        const draggedItem = context.exercisesList[draggedExercise]
        const draggedOverItem = context.exercisesList[draggedOverExercise]
        const exercisesListClone = [...context.exercisesList]

        exercisesListClone[draggedExercise] = draggedOverItem
        exercisesListClone[draggedOverExercise] = draggedItem
        context.setExercisesList(exercisesListClone)
    }
    const handleDragOver = (e, index) => {
        e.preventDefault()
        setDraggedOverExercise(index)
        e.dataTransfer.dropEffect = 'move'
    }
    const handleDragStart = (e, index) => {
        setDraggedExercise(index)
        e.dataTransfer.effectAllowed = 'move'
    }
    return(
        <Layout>
            <main className='create-routine'>
                {context.displayExerciseDetail && <ExerciseDetail/>}
                <h1 className='create-routine__title'>Create Routine</h1>
                <div className='create-routine__routine'>
                    <section className='create-routine__detail'>
                        <p className='create-routine__name'>
                            <span className='create-routine__name-label'>Name :</span>
                            <input className='create-routine__name-input' type='text' placeholder='New routine'/>
                        </p>
                        <p className='create-routine__description'>
                            <span className='create-routine__description-label'>Description :</span>
                            <textarea className='create-routine__description-input' type='text' placeholder='Describe your routine'/>
                        </p>
                        <div className='create-routine__exercises-card'>
                            <h2 className='create_routine__exercises-title'>Exercises</h2>
                            <ul className='create_routine__exercises-list'>
                                {(context.exercisesList.length>0) &&
                                    context.exercisesList.map((exercise, index) =>(
                                        <li key={exercise.name} className='create_routine__item' draggable
                                         onDragStart={(e)=>handleDragStart(e, index)}
                                         onDragOver={(e)=>handleDragOver(e,index)}
                                         onDragEnd={(e)=>handleDragEnd(e, draggedExercise, draggedOverExercise)}
                                         >
                                            <Bars2Icon className='create_routine__bars'/>
                                            <input id={exercise.name} className='create-routine__item-name' type='text' placeholder={exercise.name} defaultValue={exercise.name}
                                             onBlur={(event)=>customizeExercise(event.target.value, event.target.placeholder, event.target.id)}
                                             onFocus={(event)=>event.target.value = exercise.name}
                                             />
                                            <figure className='create-routine__trash'>
                                                <TrashIcon className='create-routine__delete'
                                                 onClick={()=>removeFromExercisesList(exercise.name)}/>
                                            </figure>
                                        </li>
                                    ))
                                }
                            </ul>
                            <figure className='create-routine__new-routine'>
                                <PlusCircleIcon className='create-routine__add'
                                 onClick={()=>addNewExercise()}/>
                            </figure>
                        </div>
                    </section>
                    <section className='create-routine__right-panel'>
                        <nav>
                            <ul className='create-routine__navigate'>
                                <li 
                                 className='create-routine__nav-item'
                                 onClick={()=>setPanelRendered('exercises')}>Exercises</li>
                                <li
                                 className='create-routine__nav-item'
                                 onClick={()=>setPanelRendered('timer')}>timer</li>
                            </ul>
                        </nav>
                        {panelRendered === 'exercises' ?
                            <>
                                <div className='create-routine__filter-bar'>
                                    <input className='create-routine__search-exercise-input' type='text' placeholder='Search exercise'/>
                                    <span className='create_routine__category-label'>Category </span>
                                    <input className='create_routine__category-input' list='categories'/>
                                    <datalist id='categories'>
                                        <option value={'Category 1'}/>
                                        <option value={'Category 14'}/>
                                        <option value={'Category 3'}/>
                                        <option value={'Category 2'}/>
                                    </datalist>
                                </div>
                                <div className='create-routine__exercises'>
                                        {context.exercises.map(exercise => (
                                            <ExerciseCard className='create-routine__exercise' 
                                            key={exercise.name}
                                            exercise={exercise}/>
                                        ))}
                                    </div>
                            </>
                        :
                            <>
                                <Timer/>
                            </>
                        }
                        
                    </section>
                </div>
            </main>
        </Layout>
    )
}

export {CreateRoutine}