import { PlayIcon } from "@heroicons/react/24/outline"
import './UserRoutineCard.css'

import moment from "moment"
import timediff from "timediff"
import { NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { GeneralContext } from "../../GeneralContext"

function UserRoutineCard({ routine }){
    const context = useContext(GeneralContext)
    const showTime= ()=>{
        if(routine.timer.totalTime[0]>0 && routine.timer.totalTime[1]>0){
            return(
                <span>{routine.timer.totalTime[0]}h {routine.timer.totalTime[1]}m</span>
            )
        }
        else if(routine.timer.totalTime[0]===0 && routine.timer.totalTime[1]>0){
            return(
                <span>{routine.timer.totalTime[1]}m</span>
            )
        }
        else if(routine.timer.totalTime[0]===0 && routine.timer.totalTime[1]===0){
            return(
                <span>{routine.timer.totalTime[2]}s</span>
            )
        }
    }

    const showLastUse  = () => {
        const now = moment()
        const timeDifference = timediff(now.format('YYYY-MM-DD HH:mm:ss'),routine.lastUse,'YMDHmS')
        if(timeDifference.years < 0){
            const years = timeDifference.years * -1
            return (<span>{`${years} ${years>1 ? 'years':'year'} ago`}</span>)
        }else if(timeDifference.months < 0){
            const months = timeDifference.months * -1
            return (<span>{`${months} ${months>1 ? 'months':'month'} ago`}</span>)
        }else if(timeDifference.days < 0){
            const days = timeDifference.days * -1
            return (<span>{`${days} ${days>1 ? 'days':'day'} ago`}</span>)
        }else if(timeDifference.hours < 0){
            const hours = timeDifference.hours * -1
            return (<span>{`${hours} ${hours>1 ? 'hours':'hour'} ago`}</span>)
        }else{
            let minutes = timeDifference.minutes * -1
            if (minutes === 0){
                minutes = 1
            } 
            return (<span>{`${minutes} ${minutes>1 ? 'minutes':'minute'} ago`}</span>)
        }
    }
    const handleGo = () => {
        context.setRoutineToTrain(routine)
        context.setCurrentPage('training')
    }
    const handleOpenDetail = (e) => {
        const parent = e.target.closest('div')
        if(parent.className === 'user-card-container'){
            context.renderUserRoutineDetail(routine)
        }
    }
    return(
        <div className='user-card-container' 
         onClick={(e)=>handleOpenDetail(e)}>
            <h3 className='routine-title'>
                {routine.name}
            </h3>
            <p className='last-use'>
                <span>Last use</span>
                {showLastUse()}
            </p>
            <p className='time'>
                <span>Duration</span>
                {showTime()}
            </p>
            <div className='do-routine-container'>
                <p>Go</p>
                <NavLink to='/train-routine' className='play-icon-cont'
                 onClick={()=>handleGo()}>
                    <PlayIcon className='play-icon'/>
                </NavLink>
            </div>
        </div>    
    )
}

export { UserRoutineCard }