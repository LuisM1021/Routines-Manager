import { useContext } from 'react'
import {GeneralContext} from '../../GeneralContext'
import { NavLink } from 'react-router-dom'


import {RoutineCard} from '../../Components/RoutineCard'
import {ChevronDoubleUpIcon, PlusCircleIcon} from '@heroicons/react/24/outline'
import { RoutineDetails } from '../../Components/RoutineDetails'
import { UserRoutineCard } from '../../Components/UserRoutineCard'
import { FilterBar } from '../../Components/FilterBar'
import { Layout } from '../../Components/Layout'
import './Routines.css'


function Routines(){
    const {
        showRoutineDetails,
        filteredRoutines,
        userRoutines,
    } = useContext(GeneralContext)

    const scrollToTopRoutineCards=()=>{
        document.getElementById('scrollRoutineCards').scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    const renderRoutines = () =>{
        return (
            <>
                {filteredRoutines?.length!==0 ?
                filteredRoutines?.map(routine=>{
                    return (<RoutineCard key={routine.name} routine={routine}/>)
                }):
                <p>Sorry 😥 We don´t have any routines with that features</p>
                }
            </>
        )
    }
 
    return(
        <Layout>
            {showRoutineDetails && <RoutineDetails/>}
            <div className='routines-container'>
                <div className='search-routine'>
                    <h1 className='title'>
                        Search Routine
                    </h1>
                    <FilterBar/>  
                    <div className='routine-cards' id='scrollRoutineCards'>
                        {renderRoutines()}
                    <div className='scroll-up-container'
                     onClick={()=>scrollToTopRoutineCards()}
                    >
                        <ChevronDoubleUpIcon className='scroll-up-icon'/>
                    </div>
                    </div>
                </div>
                <div className='user-routines'>
                    <h1 className='title'>
                        My Routines
                    </h1>
                    <NavLink to='/create-routine'>
                        <PlusCircleIcon className='plus-circle-icon'/>
                    </NavLink>
                    <div className='user-routines-container'>
                        {userRoutines.map((routine =>(
                            <UserRoutineCard
                             key={routine.name}
                             routine={routine}/>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export {Routines}