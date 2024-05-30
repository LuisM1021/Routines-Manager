import {PlusIcon} from '@heroicons/react/24/solid'
import './UserRoutines.css'

function UserRoutines(){
    return(
        <div className='user-routines-panel'>
            <h2 className='title-2'>My routines</h2>
            <ul className='user-routines-container'>
                <li className='user-routine'>🏋️‍♂️ routine 1</li>
                <li className='user-routine'>🏋️‍♂️ routine 2</li>
                <li className='user-routine'>🏋️‍♂️ routine 3</li>
                <li className='user-routine'>🏋️‍♂️ routine 4</li>
            </ul>
            <div className='add-routine-container'>
                <p className='add-routine'>Add routine</p>
                <figure className='plus-icon-container'>
                    <PlusIcon className='plus-icon'/>
                </figure>
            </div>
        </div>
        
    )
}

export {UserRoutines}