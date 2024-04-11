import './RoutineCard.css'
function RoutineCard({name,description,totalTime,requireEquipment}){
    const showTime= ()=>{
        if(totalTime[0]>0 && totalTime[1]>0){
            return(
                <span>{totalTime[0]}h {totalTime[1]}m</span>
            )
        }
        else if(totalTime[0]===0 && totalTime[1]>0){
            return(
                <span>{totalTime[1]}m</span>
            )
        }
        else if(totalTime[0]===0 && totalTime[1]===0){
            return(
                <span>{totalTime[2]}s</span>
            )
        }
    }
    return(
        <div className='card-container'>
            <h3>{name}</h3>
            <p>{description}</p>
            <div className='detail-container'>
                <p>Time: 
                    {showTime()}
                </p>
                <p>Equipment: <span>{requireEquipment}</span></p>
            </div>
        </div>
    )
}
export {RoutineCard}