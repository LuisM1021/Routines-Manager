import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { ClockIcon, PlusCircleIcon } from '@heroicons/react/24/outline'


import './Timer.css'

function Timer(){
    const context = useContext(GeneralContext);
    const renderTime = (time) => {
        if(time){
            let render = ''
            // const time = context.routineToCreate.timer.totalTime
            if(time[0]< 10){
                render+=`0${time[0]} : `
            }else{
                render+=`${time[0]} : `
            }
            if(time[1]< 10){
                render+=`0${time[1]} : `
            }else{
                render+=`${time[1]} : `
            }
            if(time[2]< 10){
                render+=`0${time[2]}`
            }else{
                render+=`${time[2]}`
            }
            return render
        }
        return '00 : 00 : 00'
    }
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
                    <div className='timer__reps'>
                        <p className='timer__reps-label'>
                            Reps
                        </p>
                    </div>
                </div>
                <ul className='timer__steps'>
                    {context.routineToCreate.timer && context.routineToCreate.timer.steps.map((step, index) => (
                        <li className='timer__step' key={index}>
                            <p className='timer__step-number-cont'>
                            <span className='timer__step-number'>{index+1}</span>
                            </p>
                            <span className='timer__exercise'>{step.exercise}</span>
                            <span className='timer__exercise-duration'>{renderTime(step.time)}</span>
                            <span className='timer__exercise-reps'>{step.reps}</span>
                        </li>
                    ))}
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
                    <span className='timer__laps-number'>{context.routineToCreate.timer ? context.routineToCreate.timer.laps : '-'}</span>
                </p>
                <p className='timer__total'>
                    <span className='timer__total-label'>Total time</span>
                    <span className='timer__total-time'>
                        {context.routineToCreate.timer ? renderTime(context.routineToCreate.timer.totalTime): renderTime(null)}
                    </span>
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