import { useContext,useState,useEffect } from 'react'
import {GeneralContext} from '../../GeneralContext'
import './RoutinesPanel.css'

function RoutinesPanel(){
    //TODO: getRandom falta de usar
    const {
        routines,
        exercises,
        selectedRoutine,
        setSelectedRoutine
    } = useContext(GeneralContext)

    //Saving the routines of the current selected routine
    const routineExercises = selectedRoutine?.exercises?.map(rtExercise=>{
        return(
            exercises.find(exercise=>exercise.name === rtExercise)
        )
    })
    //Selected image in the controller of images
    const [selectedImage,setSelectedImage] = useState(null)

    //Initialize the controller to the first image of the routine exercises
    useEffect(()=>{
        if(routineExercises && !selectedImage){
            setSelectedImage(routineExercises[0])
        }
    },[routineExercises,selectedImage])

    return(
        <div className='panel-container'>
            {/* <div className='grid'>
                <div className='a'>a</div>
                <div className='b'>b</div>
                <div className='c'>c</div>
            </div> */}
            <div className='routines-list'>
                <h3 className='title-2'>Featured Routines</h3>
                <li className='featured-routines-container'>
                    {routines?.map((routine,index)=>{
                        if(index<=4){ //TODO: SHOW RANDOM ROUTINES NOT THE FIRST FIVE
                            return <ul
                                className='featured-routine'
                                key={routine.name}
                                onClick={()=>{
                                setSelectedRoutine(routine)
                                setSelectedImage(null)
                                }}>
                                    <span>
                                        🏋️‍♂️
                                    </span>
                                    <span>
                                        {routine.name}
                                    </span>        
                            </ul>
                        }  else return null       
                    })}
                </li>     
            </div>
            <div className="exercises-slider">
                {selectedImage && (
                    <>
                        <div className='title-container'>
                            <h3 className='title-3'>{selectedImage.name}</h3>
                        </div>
                        <img
                            className='exercise-img'
                            src={selectedImage.imgPath} alt='selectedIMG'
                        />
                    </>
                )}
                <div className='controller'>
                    {routineExercises?.map(exercise=>{
                        return <div 
                            className={
                                selectedImage && selectedImage.name === exercise.name ? 'slider-button slider-button--active':'slider-button'
                            }
                            key={exercise.name}
                            onClick={()=>setSelectedImage(exercise)}>
                        </div>
                    })}
                </div>
            </div>
            <div className='exercise-description'>
                <h3 className='title-2'>Description</h3>
                <p className='description'>
                    {selectedRoutine && selectedRoutine.description}
                </p>
            </div>
        </div>
    )
}

export {RoutinesPanel}