import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline'


import './Timer.css'

function Timer(){
    const context = useContext(GeneralContext);

    return(
        <main className='timer'>
            <section className='timer__buttons'>
                <button className='timer__button timer__autogenerate'
                 onClick={()=>context.autogenerateRoutineTimer()}>
                    autogenerate
                </button>
                <button className='timer__button timer__custom'>
                    custom
                </button>
            </section>
            <section className='timer__table'>
                <div className='timer__headers'>
                    <p className='timer__exercise-title'>
                        Exercise  
                    </p>
                    <div className='timer__time-header'>
                        <p className='timer__time-title'>
                            Time  
                        </p>
                        <figure className='timer__format-time'>
                            <ClockIcon className='timer__format'/>
                        </figure>
                    </div>
                </div>
                <ul className='timer__steps'>
                    <li className='timer__step'>
                        <p className='timer__step-number-cont'>
                         <span className='timer__step-number'>1</span>
                        </p>
                        <span className='timer__exercise'>Warming</span>
                        <span className='timer__exercise-duration'>00:07:00</span>
                    </li>
                    <li className='timer__step'>
                    <p className='timer__step-number-cont'>
                         <span className='timer__step-number'>2</span>
                        </p>
                        <span className='timer__exercise'>Prepare</span>
                        <span className='timer__exercise-duration'>00:00:30</span>
                    </li>
                    <li className='timer__step'>
                        <p className='timer__step-number-cont'>
                         <span className='timer__step-number'>3</span>
                        </p>
                        <span className='timer__exercise'>Prepare</span>
                        <span className='timer__exercise-duration'>00:00:30</span>
                    </li>
                </ul>
                <li className='timer__add-step'>
                    <p className='timer__add-msg'>Drag an exercise here or click to add</p>
                    <figure className='timer__add'>
                        <PlusCircleIcon className='timer__add-icon'/>
                    </figure>
                </li>
            </section>
            <section className='timer__options'>
                <p className='timer__laps'>
                    <span className='timer__laps-label'>laps</span>
                    <span className='timer__laps-number'>2</span>
                </p>
                <p className='timer__total'>
                    <span className='timer__total-label'>Total time</span>
                    <span className='timer__total-time'>02:30:45</span>
                </p>
            </section>
            <section className='timer__footer-buttons'>
                <button className='timer__edit'>Edit</button>
                <button className='timer__save'>Save</button>
            </section>
        </main>
    )
}

export { Timer }