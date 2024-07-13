import { useContext, useState } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { ClockIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { calculateTotalTime } from '../../Utils'

import './Timer.css'

function Timer(){
    const context = useContext(GeneralContext);
    const [timeFormat, setTimeFormat] = useState('clock')
    const [canEdit, setCanEdit] = useState(false)
    const [timerActiveButton, setTimerActiveButton] = useState(null)
    const [chooseExercisePanel, setChooseExercisePanel] = useState(false)
    const renderTime = (time) => {
        if(timeFormat === 'clock'){
            if(time){
                let render = ''
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
            return '-- : -- : --'
        }
        if(time){
            let render = ''
            if(time[0] === 1){
                render+=`${time[0]}hr `
            }else if(time[0]>1){
                render+=`${time[0]}hrs `
            }
            if(time[1] === 1){
                render+=`${time[1]}min `
            }else if(time[1]>1){
                render+=`${time[1]}mins `
            }
            if(time[2]> 0){
                render+=`${time[2]}sec`
            }
            return render
        }
        return '-- : -- : --'
    }
    const renderInputTime = (time) => {
        if(time<10){
            return `0${time}`
        }
        return time
    }
    const changeStepReps = (i, event, data) => {
        const regex = /^\s*(\d{1,2})\s*(-\s*(\d{1,2}))?\s*$/ //match $1 and $3
        const match = regex.exec(data)
        let repsToSet = ''
        if(match){
            if(match[3]){
                if(parseInt(match[3])>parseInt(match[1])){
                    repsToSet = `${match[1]}-${match[3]}`
                }else if(parseInt(match[3]) === parseInt(match[1])){
                    repsToSet = match[1]
                }else{
                    repsToSet = '-'
                }
            }else{
                repsToSet = match[1]
            }
        }else{
            repsToSet = '-'
        }
        const routineToCreateClone = {...context.routineToCreate}
        routineToCreateClone.timer.steps.forEach((step, index) => {
            if(index === i){
                step.reps = repsToSet
            }
        })
        
        context.setRoutineToCreate(routineToCreateClone)
        event.target.value = repsToSet
    }
    const changeStepTime = (i, event, time) => {
        const data = event.target.value
        const regex  = /^\d{1,2}$/
        const match = regex.exec(data)
        let timeToRender = ''
        const routineToCreateClone = {...context.routineToCreate}

        if(match){
            timeToRender = match[0]
            switch(time){
                case 'hr': 
                    if(parseInt(match[0])>23){
                        timeToRender = '23'
                    }else if(parseInt(match[0])<10){
                        timeToRender = `0${match[0]}`
                    }
                    routineToCreateClone.timer.steps.forEach((step, index) => {
                        if(index === i){
                            step.time[0] = parseInt(data)
                            console.log('will change: ',step)
                        }
                    })
                    break
                case 'min':   
                    if(parseInt(match[0])>59){
                        timeToRender = '59'
                    }else if(parseInt(match[0])<10){
                        timeToRender = `0${match[0]}`
                    }
                    routineToCreateClone.timer.steps.forEach((step, index) => {
                        if(index === i){
                            step.time[1] = parseInt(data)
                            console.log('will change: ',step)
                        }
                    })
                    break
                case 'sec':
                    if(parseInt(match[0])>59){
                        timeToRender = '59'
                    }else if(parseInt(match[0])<10){
                        timeToRender = `0${match[0]}`
                    }
                    routineToCreateClone.timer.steps.forEach((step, index) => {
                        if(index === i){
                            step.time[2] = parseInt(data)
                        }
                    })
                    break
                default:
                    break
            }
        }
        routineToCreateClone.timer.totalTime = calculateTotalTime(routineToCreateClone.timer.steps, routineToCreateClone.timer.laps)
        context.setRoutineToCreate(routineToCreateClone)
        event.target.value = timeToRender
    }
    const changeRoutineLaps = (event) => {
        const data = event.target.value
        const regex = /^\d$/
        const match = regex.exec(data)
        let lapsToRender = ''
        const routineToCreateClone = {...context.routineToCreate}
        if(match){
            lapsToRender = match[0]
            routineToCreateClone.timer.laps = parseInt(match[0])
            routineToCreateClone.timer.totalTime = calculateTotalTime(routineToCreateClone.timer.steps, routineToCreateClone.timer.laps)
            context.setRoutineToCreate(routineToCreateClone)
        }
        event.target.value = lapsToRender
    }
    const focusNextStepTime = (event, index) => {
        if(event.key === 'Enter'){
            const nextHrInput = document.getElementById('hr'+(index+1))
            if(nextHrInput){
                nextHrInput.focus()
            }else{
                document.getElementById('sec'+index).blur()
            }
        }
    }
    const handleAutogenerate = () => {
        context.autogenerateRoutineTimer()
        setTimerActiveButton('autogenerate')
        setCanEdit(false)
    }
    const handleCustom = () => {
        setCanEdit(true)
        setTimerActiveButton('custom')
        context.initializeCustomTimer()
    }
    const handleEdit = () => {
        setCanEdit(true)
        setTimerActiveButton('custom')
    }
    const handleHideExercisePanel = (event) => {
        if(event.target.className === 'timer__exercises-list-cont'){
            setChooseExercisePanel(false)
        }
    }
    const handleAddStep = (exercise) => {
        context.addStep(exercise)
        setChooseExercisePanel(false)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }
    const handleDrop = (e) => {
        e.preventDefault()
        const exercise = JSON.parse(e.dataTransfer.getData('text/plain'))
        context.addStep(exercise)
    }
    return(
        <main className='timer'>
            {chooseExercisePanel && 
                <section className='timer__exercises-list-cont'
                 onClick={(event)=>handleHideExercisePanel(event)}>
                    <div className='timer__exercises-list'>
                        <p className='timer__choose-exercise'>Choose an exercise</p>
                        <ul className='timer__exercises-to-choose'>
                            {context.exercisesList && context.exercisesList.map((exercise, index)=>(
                                <p key={index} className='timer__exercise-to-add'
                                 onClick={()=>handleAddStep(exercise)}>
                                    {exercise.name}
                                </p>
                            ))}
                        </ul>
                    </div>
                </section>
            }
            <section className='timer__buttons'>
                <button className={`timer__button timer__autogenerate ${timerActiveButton === 'autogenerate' && 'timer__button-active'}`}
                 onClick={()=>handleAutogenerate()}>
                    autogenerate
                </button>
                <button className={`timer__button timer__custom ${timerActiveButton === 'custom' && 'timer__button-active'}`}
                 onClick={()=>handleCustom()}>
                    custom
                </button>
            </section>
            {!canEdit ? 
                <>
                    <section className='timer__table-cont'>
                        <div className='timer__table timer__table-no-edit'>
                            <div className='timer__headers'>
                                <p className='timer__exercise-title'>
                                    Exercise  
                                </p>
                                <div className='timer__time-header'>
                                    <p className='timer__time-title'>
                                        Time  
                                    </p>
                                    <figure className='timer__format-time'>
                                        <ClockIcon className='timer__format'
                                        onClick={()=>setTimeFormat((timeFormat==='clock' ? 'text':'clock'))}/>
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
                                        <span className='timer__exercise-reps'>{step.reps || '-'}</span>
                                    </li>
                                ))}
                            </ul>
                            {/* <li className='timer__add-step'>
                                <p className='timer__add-msg'>Drag an exercise here or click to add</p>
                                <figure className='timer__add'>
                                    <PlusCircleIcon className='timer__add-icon'/>
                                </figure>
                            </li> */}
                        </div>
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
                </> : 
                <>
                    <section className='timer__table-cont'>
                    {/* Editable */}
                        <div className='timer__table'>
                            <div className='timer__headers'>
                                <p className='timer__exercise-title'>
                                    Exercise  
                                </p>
                                <div className='timer__time-header'>
                                    <p className='timer__time-title'>
                                        Time  
                                    </p>
                                    {/* <figure className='timer__format-time'>
                                        <ClockIcon className='timer__format'
                                        onClick={()=>setTimeFormat((timeFormat==='clock' ? 'text':'clock'))}/>
                                    </figure> */}
                                </div>
                                <div className='timer__reps'>
                                    <p className='timer__reps-label'>
                                        Reps
                                    </p>
                                </div>
                            </div>
                            <ul className='timer__steps'>
                                {context.routineToCreate.timer && context.routineToCreate.timer.steps.map((step, index) => (
                                    <li className='timer__step-editable' key={index}>
                                        <p className='timer__step-number-cont'>
                                        <span className='timer__step-number'>{index+1}</span>
                                        </p>
                                        <span className='timer__step-delete'>
                                            <TrashIcon className='timer__trash-icon'
                                             onClick={()=>context.deleteStep(index)}/>
                                        </span>
                                        <span className='timer__exercise-edit'>{step.exercise}</span>
                                        <div className='timer__exercise-duration'>
                                            <input id={'hr'+index} className='timer__exercise-hrs' type='text' placeholder={renderInputTime(step.time[0])}
                                            onKeyDown={(event)=>event.key==='Enter' && document.getElementById('min'+index).focus()}
                                            onBlur={(event)=>changeStepTime(index, event, 'hr')}
                                            onFocus={(event)=>event.target.value = ''}/>
                                            <span className='timer__exercise-duration-points'>:</span>
                                            <input id={'min'+index} className='timer__exercise-min' type='text' placeholder={renderInputTime(step.time[1])}
                                            onKeyDown={(event)=>event.key==='Enter' && document.getElementById('sec'+index).focus()}
                                            onBlur={(event)=>changeStepTime(index, event, 'min')}
                                            onFocus={(event)=>event.target.value = ''}/>
                                            <span className='timer__exercise-duration-points'>:</span>
                                            <input id={'sec'+index} className='timer__exercise-sec' type='text' placeholder={renderInputTime(step.time[2])}
                                            onBlur={(event)=>changeStepTime(index, event, 'sec')}
                                            onFocus={(event)=>event.target.value = ''}
                                            onKeyDown={(event)=>focusNextStepTime(event, index)}/>
                                        </div> 
                                        <input className='timer__exercise-reps-editable' 
                                        placeholder={step.reps || '-'}
                                        onBlur={(event)=>changeStepReps(index,event, event.target.value)}
                                        onClick={(event)=>event.target.value = ''}/>
                                    </li>
                                ))}
                            </ul>
                            <li className='timer__add-step'
                             onClick={()=>setChooseExercisePanel(true)}
                             onDragOver={(e)=>handleDragOver(e)}
                             onDrop={(e)=>handleDrop(e)}>
                                <p className='timer__add-msg'>Drag an exercise here or click to add</p>
                                <figure className='timer__add'>
                                    <PlusCircleIcon className='timer__add-icon'/>
                                </figure>
                            </li>
                        </div>
                    </section>
                    <section className='timer__options'>
                        <p className='timer__laps'>
                            <span className='timer__laps-label'>laps</span>
                            <input className='timer__laps-number' placeholder={context.routineToCreate.timer ? context.routineToCreate.timer.laps : '-'}
                            onBlur={(event)=>changeRoutineLaps(event)}
                            onClick={(event)=>event.target.value = ''}
                            onKeyDown={(event)=>event.key === 'Enter' && event.target.blur()}/>
                        </p>
                        <p className='timer__total'>
                            <span className='timer__total-label'>Total time</span>
                            <span className='timer__total-time'>
                                {context.routineToCreate.timer ? renderTime(context.routineToCreate.timer.totalTime): renderTime(null)}
                            </span>
                        </p>
                    </section>
                </>
            }
            
            <section className='timer__footer-buttons'>
                {!canEdit && 
                    <button className='timer__edit'
                    onClick={()=>handleEdit()}>
                        Edit
                    </button>
                }
                <button className='timer__save'>Save</button>
            </section>
        </main>
    )
}

export { Timer }