import { TrashIcon, PencilSquareIcon  } from "@heroicons/react/24/outline"
import './UserRoutineCardDetail.css'
import { useContext } from "react"
import { GeneralContext } from "../../GeneralContext"
import { NavLink } from "react-router-dom"

function UserRoutineCardDetail({routine}){
    const context = useContext(GeneralContext)
    const renderTime = (time) => {
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
    const handleEdit = () => {
        context.loadRoutineToEdit(routine.id)
        context.setIsBeingUpdated(true)
        context.renderUserRoutineDetail(null)
        context.setCurrentPage('create-routine')
    }
    const handleRemove = () => {
        context.removeUserRoutine(routine.id)
        context.renderUserRoutineDetail(null)
    }
    return (
        <section className='user-routine__bg'
         onClick={(e)=>e.target.className === 'user-routine__bg' && context.renderUserRoutineDetail(null)}>
            <div className='user-routine__card'>
                <section className='user-routine__header'>
                    <p className='user-routine__name'>{routine.name}</p>
                    <div className='user-routine__icons'>
                        <NavLink className='user-routine__edit-cont' to='/create-routine' 
                         onClick={handleEdit}>
                            <PencilSquareIcon className='user-routine__icon user-routine__edit'/>
                        </NavLink>
                            <TrashIcon className='user-routine__icon user-routine__delete' 
                             onClick={handleRemove}/>
                    </div>
                </section>
                <section className='user-routine__detail'>
                    {routine.description &&
                        <div className='user-routine__left-detail'>
                            <p className='user-routine__description-label'>Description</p>
                            <p className='user-routine__description'>{routine.description}</p>
                        </div>
                    }
                    <div className='user-routine__right-detail'>
                        <div className='user-routine__category-cont'>
                            <p className='user-routine__category-label'>Category</p>
                            <p className='user-routine__category'>{routine.category}</p>
                        </div>
                        <div className='user-routine__total-time-cont'>
                            <p className='user-routine__total-time-label'>Total time</p>
                            <p className='user-routine__total-time'>{renderTime(routine.timer.totalTime)}</p>
                        </div>
                    </div>
                </section>
                <section className='user-routine__steps'>
                    {routine.timer.steps.map((step, index) => (
                        <div key={index} className='user-routine__step-card'>
                            <p className='user-routine__step-title'>{step.exercise}</p>
                            <div className='user-routine__step-data'>
                                <div className='user-routine__step-detail'>
                                    {step.reps && 
                                        <div className='user-routine__reps-cont'>
                                            <p className='user-routine__reps-label'>reps: </p>
                                            <p className='user-routine__reps'>{step.reps}</p>
                                        </div>
                                    }
                                    <div className='user-routine__time-cont'>
                                        <p className='user-routine__time-label'>time:</p>
                                        <p className='user-routine__time'>{renderTime(step.time)}</p>
                                    </div>
                                </div>
                                <figure className='user-routine__step-figure'>
                                    <img className='user-routine__step-img' src={step.img} alt={step.exercise}/>
                                </figure>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    )
}

export {UserRoutineCardDetail}