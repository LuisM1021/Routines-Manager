import { useContext, useState } from 'react'
import { GeneralContext } from '../../GeneralContext'
import {PlusIcon} from '@heroicons/react/24/solid'
import './UserRoutines.css'
import { NavLink } from 'react-router-dom'
function UserRoutines(){
    const context = useContext(GeneralContext)
    const [routineSelected, setRoutineSelected] = useState(null)
    const handleEdit = () => {
        context.loadRoutineToEdit(routineSelected.id)
        context.setIsBeingUpdated(true)
        context.setCurrentPage('create-routine')
    }
    return(
        <div className='user-routines-panel'>
            {routineSelected && 
                <div className='user-routine-options-bg'>
                    <span className='user-routine-title'>{routineSelected.name}</span>
                    <div className='user-routine-info'>
                        <ul className='user-routine-exercises'>
                            {routineSelected.exercises.map((exercise) => (
                                <li key={exercise} className='user-routine-exercise'>{exercise}</li>
                            ))}
                        </ul>
                        <div className='user-routine-options'>
                            <NavLink to='/train-routine' className='user-routine-go' 
                             onClick={()=>context.setRoutineToTrain(routineSelected)}>
                                go
                            </NavLink>
                            <NavLink to='/create-routine' className='user-routine-edit'
                             onClick={()=>handleEdit()}>
                                edit
                            </NavLink>
                        </div>
                    </div>
                    <button className='user-routine-back' 
                     onClick={()=>setRoutineSelected(false)}>
                        Go back
                    </button>
                </div>
            }
            <h2 className='title-2'>My routines</h2>
            <div className='user-routines-data'>
                {context.userRoutines.length>0 &&
                    <ul className='user-routines-container'>
                        {context.userRoutines.map(routine => (
                            <li key={routine.id} className='user-routine' 
                            onClick={()=>setRoutineSelected(routine)}>
                                🏋️‍♂️ {routine.name}
                            </li>
                        ))}
                    </ul>
                }
                <div className='add-routine-container'>
                    <p className='add-routine'>Add routine</p>
                        <NavLink to='/routines' className='plus-icon-container'
                         onClick={()=>context.setCurrentPage('routines')}>
                            <PlusIcon className='plus-icon'/>
                        </NavLink>
                </div>
            </div>
        </div>
        
    )
}

export {UserRoutines}