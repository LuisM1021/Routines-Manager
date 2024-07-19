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
    const intervalRef = useRef(null)
    const stepIntervalRef = useRef(null)
    //---------------------SPOTIFY TEST----------------------
    // const clientId = '3873799a7e8c4839932798061ac73923'
    // const authEndpoint = 'https://accounts.spotify.com/authorize?'
    // const responseType = 'token'
    // const redirectUri = 'http://localhost:3000/train-routine'
    // // const state = generateRandomString(16)
    // const scope = 'user-modify-playback-state'
    // const showDialog = ''
    // const authorizeEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`
    // useEffect(() => {
    //     console.log('obtaining token...')
    //     const hash = window.location.hash
    //     const hashParams = hash.substring(1).split('&')
    //     const params = hashParams.reduce((params, item) => {
    //         const [key, value] = item.split('=')
    //         return {
    //             ...params,
    //             [key]: value
    //         }
    //     },{})
    //     console.log(params)
    //     setToken(params.access_token)
    // },[])
    // const testSpotify = async () => {
    //     if(token){
    //         const skipEndpoint = 'https://api.spotify.com/v1/me/player/next'
    //         const options = {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //         try {
    //             const res = await fetch(`${skipEndpoint}`,options)
    //             const data = await res.json()
    //             console.log(data) 
    //         } catch (error) {
    //             console.log('error')
    //         }
    //     }else{
    //         console.log('no token')
    //     }
    // }
    //-------------------------------------------------------
    const testTime = () =>{
        setIsRunning((isRunning) => isRunning ? false : true)
    }

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
            console.log('entro: ',stepCountdown)
            clearInterval(stepIntervalRef.current)
            const nextStep = TrainRoutineClass.getNextStep(context.routineToTrain.timer, currentStep)
            if(nextStep){
                loadNewStep(nextStep)
                stepIntervalRef.current = setInterval(() => {
                    setStepCountdown(stepCountdown => stepCountdown - 1)
                },1000)
            }else{
                // setStepCountdown()
                console.log('no more steps')
            }
        }
    },[stepCountdown])

    useEffect(()=>{
        if(countdown <= 0 && stepCountdown <=0){
            clearInterval(intervalRef.current)
            setIsRunning(false)
        }
    },[countdown, stepCountdown])
    //------------------------------------------------------
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
            return (
                <>
                    <span className='train__reps-label'>Reps :</span>
                    <span className='train__reps'>{reps}</span>
                </>
            )
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
    }
    const handleReset = () => {
        setIsRunning(false)
        setCountdown(null)
        setStepCountdown(null)
        setCurrentStep({step: context.routineToTrain.timer.steps[0], index: 0, lap: 1})
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
    return(
        <section className='train__layout'>
            <section className='train__title'>
                <h1 className='train__routine-name'>{context.routineToTrain.name}</h1>
            </section>
            <section className='train__players'>
                <div className='train__player'>
                    <figure className='train__icon-cont'>
                        <PauseIcon className='train__player-icon train-pause'
                        onClick={()=>setIsRunning(false)}/>
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
                <div className='train__music-player'>
                    {/* <NavLink to={authorizeEndpoint}> */}
                        <button>
                            Spotify
                        </button>
                    {/* </NavLink> */}
                    <button onClick={()=> testTime()}>Test timer</button>
                    <span>{token}</span>
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