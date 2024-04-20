import { useContext,useState } from 'react'
import './Routines.css'
import {GeneralContext} from '../../GeneralContext'
import {RoutineCard} from '../../Components/RoutineCard'
import {ChevronDoubleUpIcon} from '@heroicons/react/24/outline'
import { RoutineDetails } from '../../Components/RoutineDetails'

function Routines(){
    const {
        routines,showRoutineDetails
    } = useContext(GeneralContext)
    const [filter,setFilter] = useState(null)
    const [searchByName,setSearchByName] = useState(null)
    const scrollToTopRoutineCards=()=>{
        document.getElementById('scrollRoutineCards').scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const renderFilter = () => {
        switch(filter){
            case 'name':
                return (
                    <input className='name-filter' type='text' placeholder='default routine' onChange={(event)=>setSearchByName(event.target.value)}/>
                )
                
            case 'time':
                return (<p>filter time</p>)
                
            case 'category':
                return (<p>filter category</p>)
                
            case 'equipment':
                return (<p>filter equipment</p>)
            default:
                return(<></>)
        }
    }
    const renderRoutines = () =>{
        if(filter && searchByName){
            const filteredRoutines = routines?.filter(routine => routine.name.includes(searchByName))
            return (
                <>
                    {filteredRoutines?.map(routine => {
                        return <RoutineCard key={routine.name} routine={routine}/>
                    })}
                </>
            )
            
        }else{
            return (
                <>
                    {routines?.map(routine=>{
                        return (<RoutineCard key={routine.name} routine={routine}/>)
                    })}
                </>
            )
        }
    }
    return(
        <div className='routines-container'>
            {showRoutineDetails && <RoutineDetails/>}
            <div className='search-routine'>
                <h1>Search Routine</h1>
                <div className='filter-bar'>
                    <div className='filters-container'>
                        <p>Filter</p>
                        <div className='filters'>
                            <button onClick={()=>setFilter('name')}>Name</button>
                            <button onClick={()=>setFilter('time')}>Time</button>
                            <button onClick={()=>setFilter('category')}>Category</button>
                            <button onClick={()=>setFilter('equipment')}>Require equipment</button>
                        </div>
                    </div>
                    <div className='filter-container'>
                        {renderFilter()}
                    </div>
                </div>
                <div className='routine-cards' id='scrollRoutineCards'>
                    {renderRoutines()}
                <div className='scroll-up-container' onClick={()=>scrollToTopRoutineCards()}><ChevronDoubleUpIcon className='scroll-up-icon'/></div>
                </div>
            </div>
            <div className='user-routines'>
                <h1>My Routines</h1>
            </div>
        </div>
    )
}

export {Routines}