import { useContext } from "react"
import { GeneralContext } from "../../GeneralContext"
import { PauseIcon, PlayIcon, StopIcon } from "@heroicons/react/16/solid"
import './TrainRoutine.css'


function TrainRoutine(){
    const context = useContext(GeneralContext)
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
                        <PlayIcon className='train__player-icon train-play' />
                    </figure>
                    <figure>
                        <StopIcon className='train__player-icon train-stop' />
                    </figure>
                </div>
                <div className='train__music-player'>
                    <span>Spotify</span>
                </div>
            </section>
            <section className='train__steps-cont'>
                <div className='train__steps-card'>
                    <div className='train__step-details'>
                        <span>00 : 02 : 15</span>
                        <p>
                            <span>Reps :</span>
                            <span> 7</span>
                        </p>
                    </div>
                    <div className='train__step'>
                        <p className='train__exercise'>Warming</p>
                        <img className='train__img' src="./pics/logo.jpg"></img>
                    </div>
                </div>
                <div className='train__steps-card'>
                    <div className='train__step-details'>
                        <span>00 : 02 : 15</span>
                        <p>
                            <span>Reps :</span>
                            <span> 7</span>
                        </p>
                    </div>
                    <div className='train__step'>
                        <p className='train__exercise'>Warming</p>
                        <img className='train__img' src="./pics/logo.jpg"></img>
                    </div>
                </div>
                <div className='train__steps-card'>
                    <div className='train__step-details'>
                        <span>00 : 02 : 15</span>
                        <p>
                            <span>Reps :</span>
                            <span> 7</span>
                        </p>
                    </div>
                    <div className='train__step'>
                        <p className='train__exercise'>Warming</p>
                        <img className='train__img' src="./pics/logo.jpg"></img>
                    </div>
                </div>
                <div className='train__steps-card'>
                    <div className='train__step-details'>
                        <span>00 : 02 : 15</span>
                        <p>
                            <span>Reps :</span>
                            <span> 7</span>
                        </p>
                    </div>
                    <div className='train__step'>
                        <p className='train__exercise'>Warming</p>
                        <img className='train__img' src="./pics/logo.jpg"></img>
                    </div>
                </div>
            </section>
            <section className='train__cronometer'>
                <div className='train__laps'>
                    <label className='train__laps-label'>lap</label>
                    <span className='train__laps-value'>1 / 3</span>
                </div>
                <div className='train__time'>
                    <span>00 : 07 : 15</span>
                </div>
            </section>
        </section>
    )
}

export { TrainRoutine }