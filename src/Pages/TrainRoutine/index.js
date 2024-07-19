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
    const intervalRef = useRef(null)
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
            console.log('running')
            intervalRef.current = setInterval(() => {
                setToken(token => token + 1)
            },1000)
        }else{
            clearInterval(intervalRef.current)
        }
        
    }, [isRunning])
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
                    <span>Reps :</span>
                    <span>{reps}</span>
                </>
            )
        }else{
            const exerciseIndex = context.routineToTrain.exercises.findIndex(exercise => exercise === name)
            if(exerciseIndex !==-1){
                return (
                    <>
                        <span>Reps :</span>
                        <span>{context.routineToTrain.reps[exerciseIndex]}</span>
                    </>
                ) 
            }
        }
    }
    const handlePlay = () => {
        console.log(context.routineToTrain.timer.totalTime)
        const totalSecs = TrainRoutineClass.getCountdown(context.routineToTrain.timer.totalTime)
        console.log(totalSecs)
    }
    const renderCronometer = () => {
        let renderedTime
        if(!countdown){
            renderedTime = renderTime(context.routineToTrain.timer.totalTime)
        }else{
            const currentTime = TrainRoutineClass.getCurrentTime(countdown)
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
                    <figure>
                        <PauseIcon className='train__player-icon train-pause'/>
                    </figure>
                    <figure>
                        <PlayIcon className='train__player-icon train-play' 
                         onClick={()=>handlePlay()}/>
                    </figure>
                    <figure>
                        <StopIcon className='train__player-icon train-stop' />
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
                {context.routineToTrain.timer.steps.map((step, index) => (
                    <div key={index} className='train__steps-card'>
                        <div className='train__step-details'>
                            <span>{renderTime(step.time)}</span>
                            <p>
                                {renderReps(step.reps, step.exercise)}
                            </p>
                        </div>
                        <div className='train__step'>
                            <p className='train__exercise'>{step.exercise}</p>
                            <img className='train__img' src="./pics/logo.jpg"></img>
                        </div>
                    </div>
                ))}
            </section>
            <section className='train__cronometer'>
                <div className='train__laps'>
                    <label className='train__laps-label'>lap</label>
                    <span className='train__laps-value'>1 / 3</span>
                </div>
                <div className='train__time'>
                    {renderCronometer()}
                    {/* <span>00 : 07 : 15</span> */}
                </div>
            </section>
        </section>
    )
}

export { TrainRoutine }