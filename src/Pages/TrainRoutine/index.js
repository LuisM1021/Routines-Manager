import { useContext, useEffect, useState, useRef } from "react"
import { GeneralContext } from "../../GeneralContext"
import { PauseIcon, PlayIcon, StopIcon, ArrowPathIcon, SpeakerXMarkIcon, SpeakerWaveIcon } from "@heroicons/react/16/solid"
import './TrainRoutine.css'
import { TrainRoutineClass } from "../../Utils/trainRoutine"
function TrainRoutine(){
    const context = useContext(GeneralContext)
    const [isRunning, setIsRunning] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [countdown, setCountdown] = useState(null)
    const [currentStep, setCurrentStep] = useState({step: context.routineToTrain.timer.steps[0], index: 0, lap: 1})
    const [nextStep, setNextStep] = useState(null)
    const [stepCountdown, setStepCountdown] = useState(null)
    const [beepActive, setBeepActive] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [currentSongIndex, setCurrentSongIndex] = useState(0)
    const intervalRef = useRef(null)
    const stepIntervalRef = useRef(null)
    const audioRef = useRef(null)
    const beepAudioRef = useRef(null)

    const playlist = [
        '/audio/trainingSongs/the-beast-master.mp3',
        '/audio/trainingSongs/gym-phonk.mp3',
        '/audio/trainingSongs/gym-workout.mp3',
        '/audio/trainingSongs/pure-motivation.mp3',
        '/audio/trainingSongs/the-beast-master.mp3',
        '/audio/trainingSongs/the-gym-sport-rock.mp3',
        '/audio/trainingSongs/thrash-hard-x-phonk.mp3',
    ]
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
            const newStep = TrainRoutineClass.getNextStep(context.routineToTrain.timer, currentStep)
            if(newStep){
                loadNewStep(newStep)
                loadNextStep(newStep)
                stepIntervalRef.current = setInterval(() => {
                    setStepCountdown(stepCountdown => stepCountdown - 1)
                },1000)
            }
        }
    },[stepCountdown])

    useEffect(()=>{
        if(countdown!== null && stepCountdown!==null && countdown <= 0 && stepCountdown <=0){
            clearInterval(intervalRef.current)
            setIsRunning(false)
            setIsOver(true)
            pauseAudio()
            setTimeout(()=>{
                restartBeep()
                setBeepActive(false)
            },1000)
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
    const loadNextStep = (newCurrentStep) => {
        let step = TrainRoutineClass.getNextStep(context.routineToTrain.timer, newCurrentStep)
        if(!step){
            step = {
                step: {
                    exercise: 'Finish',
                    img: '/pics/exerciseImgs/finish.jpg'
                }
            }
        }
        setNextStep(step)
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
        loadNextStep(currentStep)
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
        pauseAudio()
        restartBeep()
        setBeepActive(false)
        setIsOver(false)
        setNextStep(null)
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
            beepAudioRef.current.currentTime = 0
            beepAudioRef.current.pause()
        }
    }
    const changeSong = () => {
        const nextIndex = (currentSongIndex + 1) % playlist.length
        setCurrentSongIndex(nextIndex)
    }
    const handleLoadedSong = () => {
        if(isRunning){
            playAudio()
        }
    }
    return(
        <section className='train__layout'>
            <section className='train__title'>
                <h1 className='train__routine-name'>{context.routineToTrain.name}</h1>
            </section>
            <section className='train__players'>
                <div className='train__player'>
                    <audio muted={isMuted} ref={beepAudioRef} src='/audio/timerAudios/short-beep-countdown.mp3'/>
                    <audio muted={isMuted} ref={audioRef} src={playlist[currentSongIndex]} 
                     onEnded={changeSong}
                     onLoadedData={handleLoadedSong}/>
                    <figure className='train__icon-cont'>
                        <PauseIcon className='train__player-icon train-pause'
                        onClick={()=>handlePause()}/>
                    </figure>
                    {isOver ? 
                        <figure className='train__icon-cont'>
                            <ArrowPathIcon className='train__player-icon train-restart' 
                            onClick={()=>handleReset()}/>
                        </figure>
                        :
                        <figure className='train__icon-cont'>
                            <PlayIcon className='train__player-icon train-play' 
                            onClick={()=>handlePlay()}/>
                        </figure>
                    }
                    <figure className='train__icon-cont'>
                        <StopIcon className='train__player-icon train-stop' 
                         onClick={()=>handleReset()}/>
                    </figure>
                    {isMuted ? 
                    <figure className='train__icon-cont'>
                        <SpeakerXMarkIcon className='train__player-icon train-mute' 
                         onClick={()=>setIsMuted(isMuted ? false : true)}/>
                    </figure>
                    :
                    <figure className='train__icon-cont'>
                        <SpeakerWaveIcon className='train__player-icon train-unmute' 
                         onClick={()=>setIsMuted(isMuted ? false : true)}/>
                    </figure>
                    }
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
                        {nextStep && 
                            <div className='train__next-step enter-animation'>
                                <p className='train__next-label'>Next :</p>
                                <figure className='train__next-img-cont'>
                                    <figcaption className='train__next-exercise'>{nextStep.step.exercise}</figcaption>
                                    {nextStep.step.img && 
                                        <img className='train__next-exercise-img' src={nextStep.step.img}/>  
                                    }
                                </figure>
                            </div>
                        }
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