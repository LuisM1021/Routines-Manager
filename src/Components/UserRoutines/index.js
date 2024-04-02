import './UserRoutines.css'
import {PlusIcon} from '@heroicons/react/24/solid'
function UserRoutines(){
    return(
        <div className='user-routines-container'>
            <h2>My routines</h2>
            <ul>
                <li>🏋️‍♂️ routine 1</li>
                <li>🏋️‍♂️ routine 2</li>
                <li>🏋️‍♂️ routine 3</li>
                <li>🏋️‍♂️ routine 4</li>
            </ul>
            <div className='add-routine-container'>
                <p>Add routine</p>
                <figure className='plus-icon-container'><PlusIcon className='plus-icon'/></figure>
            </div>
        </div>
        
    )
}

export {UserRoutines}