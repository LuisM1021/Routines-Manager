import { ClockIcon, PlusCircleIcon } from "@heroicons/react/24/outline"


import './Timer.css'

function Timer(){
    return(
        <main className='timer'>
            <section className='timer__buttons'>
                <button className='timer__button timer__autogenerate'>
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
                        <span className='timer__step-number'>1</span>
                        <span className='timer__exercise'>Warming</span>
                        <span className='timer__exercise-duration'>00:07:00</span>
                    </li>
                    <li className='timer__step'>
                        <span className='timer__step-number'>2</span>
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
            <section>

            </section>
            <section>

            </section>
        </main>
    )
}

export { Timer }