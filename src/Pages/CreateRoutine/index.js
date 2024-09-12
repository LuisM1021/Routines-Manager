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
    const [draggedItem, setDraggedItem] = useState(null)

    const removeFromExercisesList = (exercise) => {
        context.removeExerciseFromList(exercise)
    }
    const addNewExercise = () => {
        const index = context.exercisesList.length + 1
        const newExercise = {
            name: `New exercise ${index}`,
            suggestedSeries: 1,
            suggestedTime: [0,0,45]
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
            context.changeStepName(newName, preName)
        }else{
            document.getElementById(id).value = preName
        }   
    }
    const handleDragEnd = (e, draggedExercise, draggedOverExercise) =>{
        if(draggedOverExercise !== -1){
            e.preventDefault()
            const draggedItem = context.exercisesList[draggedExercise]
            const draggedOverItem = context.exercisesList[draggedOverExercise]
            const exercisesListClone = [...context.exercisesList]
    
            exercisesListClone[draggedExercise] = draggedOverItem
            exercisesListClone[draggedOverExercise] = draggedItem
            context.setExercisesList(exercisesListClone)
        }
    }
    const handleDragOver = (e, index) => {
        e.preventDefault()
        setDraggedOverExercise(index)
        e.dataTransfer.dropEffect = 'move'
    }
    const handleDragStart = (e, index, exercise) => {
        setDraggedExercise(index)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', JSON.stringify(exercise))
    }

    const handleTouchMove = (e, exercise) => {
        const touch = e.touches[0]
        const target = document.elementFromPoint(touch.clientX, touch.clientY)
        if(target){
            const closestDiv = target.closest('.timer__add-step')
            if(closestDiv){
                setDraggedItem(exercise)
            }
            else{
                setDraggedItem(null)
            }
        }else{
            setDraggedItem(null)
        }
    }

    const handleTouchEnd = () => {
        if(draggedItem){
            context.addStep(draggedItem)
            setDraggedItem(null)
        }
    }

    const renderCategories = () => {
        const availableCategories = context.exercises.reduce((categories, item) => {
            if(!categories.includes(item.category)){
                categories.push(item.category)
            }
            return categories
        },[])

        return (
            <>
                {availableCategories.map(cat => (
                    <option 
                     key={cat}
                     value={cat}/>
                ))}
            </>
        )

    }

    return(
        <Layout>
            <main className='create-routine'>
                {context.displayExerciseDetail && <ExerciseDetail/>}
                {context.isBeingUpdated ? 
                    <h1 className='create-routine__title'>Update Routine</h1>
                    : 
                    <h1 className='create-routine__title'>Create Routine</h1>
                }
                <div className='create-routine__routine'>
                    <section className='create-routine__detail'>
                        <p className='create-routine__name'>
                            <label htmlFor='create-routine__name-input' className='create-routine__name-label'>Name :</label>
                            <input id='create-routine__name-input' className='create-routine__name-input'
                             type='text' 
                             placeholder={context.routineToCreate?.name ? context.routineToCreate.name : 'New routine'}
                             onChange={(event)=>context.setNewRoutineName(event.target.value)}/>
                        </p>
                        <p className='create-routine__description'>
                            <label htmlFor='create-routine__description-input' className='create-routine__description-label'>Description :</label>
                            <textarea id='create-routine__description-input' className='create-routine__description-input'
                             type='text'
                            placeholder={context.routineToCreate?.description ? context.routineToCreate.description : 'Describe your routine'}
                              onChange={(event)=>context.setNewRoutineDescription(event.target.value)}/>
                        </p>
                        <div className='create-routine__exercises-card'>
                            <h2 className='create_routine__exercises-title'>Exercises</h2>
                            <ul className='create_routine__exercises-list'>
                                {(context.exercisesList.length>0) &&
                                    context.exercisesList.map((exercise, index) =>(
                                        <li key={exercise.name} className='create_routine__item' draggable
                                         onDragStart={(e)=>handleDragStart(e, index, exercise)}
                                         onDragOver={(e)=>handleDragOver(e,index)}
                                         onTouchMove={(e)=>handleTouchMove(e, exercise)}
                                         onDragEnd={(e)=>handleDragEnd(e, draggedExercise, draggedOverExercise)}
                                         onTouchEnd={()=>handleTouchEnd()}>
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
                                 className={`create-routine__nav-item ${panelRendered === 'exercises' && 'create-routine__nav-item--active'}`}
                                 onClick={()=>setPanelRendered('exercises')}>Exercises</li>
                                <li
                                 className={`create-routine__nav-item ${panelRendered === 'timer' && 'create-routine__nav-item--active'}`}
                                 onClick={()=>setPanelRendered('timer')}>timer</li>
                            </ul>
                        </nav>
                        {panelRendered === 'exercises' ?
                            <>
                                <div className='create-routine__filter-bar'>
                                    <input className='create-routine__search-exercise-input' 
                                     type='text' 
                                     placeholder='Search exercise'
                                     onChange={(event)=>context.setSearchExerciseByName(event.target.value)}/>
                                    <span className='create_routine__category-label'>Category </span>
                                    <input className='create_routine__category-input'
                                     list='categories'
                                     onChange={(event)=>context.setSearchExerciseByCategory(event.target.value)}/>
                                    <datalist id='categories'>
                                        {renderCategories()}
                                    </datalist>
                                </div>
                                <div className='create-routine__exercises'>
                                        {context.filteredExercises.map(exercise => (
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