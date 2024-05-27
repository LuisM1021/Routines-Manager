import './RoutinesPanel.css'
import { useContext,useState,useEffect } from 'react'
import {GeneralContext} from '../../GeneralContext'

function RoutinesPanel(){
    //TODO: getRandom falta de usar
    const {
        routines,exercises,selectedRoutine,setSelectedRoutine
    } = useContext(GeneralContext)
    const [selectedImage,setSelectedImage] = useState(null)

    const routineExercises = selectedRoutine?.exercises?.map(rtExercise=>{
        return(
            exercises.find(exercise=>exercise.name === rtExercise)
        )
    })
    useEffect(()=>{
        if(routineExercises){
            setSelectedImage(routineExercises[0])
        }
    },[routineExercises?routineExercises[0]:null])
    

    return(
        <div className='panel-container'>
            <div className='routines-list'>
                <h3>Featured Routines</h3>
                <li>
                    {routines?.map((routine,index)=>{
                        if(index<=4){
                            return <ul key={routine.name}
                            onClick={()=>setSelectedRoutine(routine)}>🏋️‍♂️ {routine.name}</ul>
                        }  else return         
                    })
                    }
                </li>     
            </div>
            <div className="exercises-slider">
                {selectedImage && (
                    <>
                        <div className='title-container'><h3>{selectedImage.name}</h3></div>
                        <img src={selectedImage.imgPath} alt='selectedIMG'></img>
                    </>
                )}
                <div className='controller'>
                    {routineExercises?.map(exercise=>{
                        return <div className={
                            selectedImage && selectedImage.name === exercise.name ? 'slider-button slider-button--active':'slider-button'
                        } key={exercise.name}
                        onClick={()=>setSelectedImage(exercise)}></div>
                    })}
                </div>
            </div>
            <div className='exercise-description'>
                <h3>Description</h3>
                <p>{selectedRoutine && selectedRoutine.description}</p>
            </div>
        </div>
    )
}

export {RoutinesPanel}