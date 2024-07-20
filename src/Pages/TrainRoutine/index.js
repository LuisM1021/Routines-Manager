import { useContext, useEffect, useState, useRef } from "react"
import { GeneralContext } from "../../GeneralContext"
import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/16/solid"
import './TrainRoutine.css'
import { NavLink } from "react-router-dom"
import { TrainRoutineClass } from "../../Utils/trainRoutine"
function TrainRoutine(){
    const context = useContext(GeneralContext)
    const [token, setToken] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [countdown, setCountdown] = useState(null)
    const [currentStep, setCurrentStep] = useState({step: context.routineToTrain.timer.steps[0], index: 0, lap: 1})
    const [stepCountdown, setStepCountdown] = useState(null)
    const [beepActive, setBeepActive] = useState(false)
    const intervalRef = useRef(null)
    const stepIntervalRef = useRef(null)
    const audioRef = useRef(null)
    const beepAudioRef = useRef(null)

    useEffect(() => {
        if(isRunning){
            intervalRef.current = setInterval(() => {
                setCountdown(countdown => countdown - 1)
            },1000)
            stepIntervalRef.current = setInterval(() => {
                setStepCountdown(stepCountdown => stepCountdown - 1)
            },1000)
        }else{
            clearInterval(stepIntervalRef.current)
            clearInterval(intervalRef.current)
        }
    }, [isRunning])

    useEffect(()=>{
        if(stepCountdown !== null && stepCountdown <=0){
            clearInterval(stepIntervalRef.current)
            const nextStep = TrainRoutineClass.getNextStep(context.routineToTrain.timer, currentStep)
            if(nextStep){
                loadNewStep(nextStep)
                stepIntervalRef.current = setInterval(() => {
                    setStepCountdown(stepCountdown => stepCountdown - 1)
                },1000)
            }
        }
    },[stepCountdown])

    useEffect(()=>{
        if(countdown <= 0 && stepCountdown <=0){
            clearInterval(intervalRef.current)
            setIsRunning(false)
        }
        if(stepCountdown === 3){
            playBeep()
        }
    },[countdown, stepCountdown])

    const renderTime = (time) => {
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
    const renderReps = (reps, name) => {
        if(reps){
            if(reps !== '-'){
                return (
                    <>
                        <span className='train__reps-label'>Reps :</span>
                        <span className='train__reps'>{reps}</span>
                    </>
                )
            }
        }else{
            const exerciseIndex = context.routineToTrain.exercises.findIndex(exercise => exercise === name)
            if(exerciseIndex !==-1){
                return (
                    <>
                        <span className='train__reps-label'>Reps :</span>
                        <span className='train__reps'>{context.routineToTrain.reps[exerciseIndex]}</span>
                    </>
                ) 
            }
        }
    }
    const renderLaps = () => {
        const lap = TrainRoutineClass.getCurrentLap(context.routineToTrain.timer, countdown)
        return `${lap.current} / ${lap.total}`
    }
    const loadNewStep = (newStep) => {
        const totalStepSecs = TrainRoutineClass.getCountdown(newStep.step.time)
        setCurrentStep(newStep)
        setStepCountdown(totalStepSecs)
    }
    const handlePlay = () => {
        if(countdown === null){
            const totalSecs = TrainRoutineClass.getCountdown(context.routineToTrain.timer.totalTime)
            setCountdown(totalSecs)
            setIsRunning(true)
            loadNewStep(currentStep)
        }else{
            setIsRunning(true)
        }
        playAudio()
        if(beepActive){
            playBeep()
            setBeepActive(false)
        }
    }
    const handleReset = () => {
        setIsRunning(false)
        setCountdown(null)
        setStepCountdown(null)
        setCurrentStep({step: context.routineToTrain.timer.steps[0], index: 0, lap: 1})
        restartAudio()
        restartBeep()
    }
    const handlePause = () => {
        setIsRunning(false)
        pauseAudio()
        pauseBeep()
    }
    const renderCronometer = () => {
        let renderedTime
        if(countdown === null){
            renderedTime = renderTime(context.routineToTrain.timer.totalTime)
        }else{
            const currentTime = TrainRoutineClass.getCurrentTime(countdown)
            renderedTime = renderTime(currentTime)
        }
        return renderedTime
    }
    const renderExerciseCountdown = () => {
        let renderedTime
        if(stepCountdown === null){
            renderedTime = renderTime(currentStep.step.time)
        }else{
            const currentTime = TrainRoutineClass.getCurrentTime(stepCountdown)
            renderedTime = renderTime(currentTime)
        }
        return renderedTime
    }
    const playAudio = () => {
        if(audioRef.current){
            audioRef.current.play()
        }
    }
    const pauseAudio = () => {
        if(audioRef.current){
            audioRef.current.pause()
        }
    }
    const playBeep = () => {
        if(beepAudioRef.current){
            beepAudioRef.current.play()
            setBeepActive(true)
        }
    }
    const pauseBeep = () => {
        if(beepAudioRef.current){
            beepAudioRef.current.pause()
        }
    }
    const restartAudio = () => {
        if(audioRef.current){
            audioRef.current.pause()
            audioRef.current.currentTime = 0
        }
    }
    const restartBeep = () => {
        if(beepAudioRef.current){
            beepAudioRef.current.pause()
            beepAudioRef.current.currentTime = 0
        }
    }
    return(
        <section className='train__layout'>
            <section className='train__title'>
                <h1 className='train__routine-name'>{context.routineToTrain.name}</h1>
            </section>
            <section className='train__players'>
                <div className='train__player'>
                    <audio ref={beepAudioRef} src='/audio/timerAudios/short-beep-countdown.mp3'/>
                    <audio ref={audioRef} src='/audio/trainingSongs/the-beast-master.mp3' />
                    <figure className='train__icon-cont'>
                        <PauseIcon className='train__player-icon train-pause'
                        onClick={()=>handlePause()}/>
                    </figure>
                    <figure className='train__icon-cont'>
                        <PlayIcon className='train__player-icon train-play' 
                         onClick={()=>handlePlay()}/>
                    </figure>
                    <figure className='train__icon-cont'>
                        <StopIcon className='train__player-icon train-stop' 
                         onClick={()=>handleReset()}/>
                    </figure>
                </div>
            </section>
            <section className='train__steps-cont'>
                <div key={currentStep.index} className={`train__steps-card enter-animation`}>
                    <div className='train__step-details'>
                        <p className='train__reps-data'>
                            {renderReps(currentStep.step.reps, currentStep.step.exercise)}
                        </p>
                        <p className='train__countdown-data'>
                            <span className='train__countdown'>{renderExerciseCountdown()}</span>
                        </p>
                    </div>
                    <div className='train__step'>
                        <p className='train__exercise'>{currentStep.step.exercise}</p>
                        {currentStep.step.img && 
                            <img className='train__img' src={currentStep.step.img}></img>
                        }
                    </div>
                </div>
            </section>
            <section className='train__cronometer'>
                <div className='train__laps'>
                    <label className='train__laps-label'>lap</label>
                    <span className='train__laps-value'>{renderLaps()}</span>
                </div>
                <span className='train__time'>
                    {renderCronometer()}
                </span>
            </section>
        </section>
    )
}

export { TrainRoutine }