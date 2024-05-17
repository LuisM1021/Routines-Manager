import { useContext } from 'react'
import './Routines.css'
import {GeneralContext} from '../../GeneralContext'
import {RoutineCard} from '../../Components/RoutineCard'
import {ChevronDoubleUpIcon} from '@heroicons/react/24/outline'
import { RoutineDetails } from '../../Components/RoutineDetails'
import { FilterBar } from '../../Components/FilterBar'
import { Layout } from '../../Components/Layout'
function Routines(){
    const {
        showRoutineDetails,
        filteredRoutines
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
            <div className='routines-container'>
                {showRoutineDetails && <RoutineDetails/>}
                <div className='search-routine'>
                    <h1>Search Routine</h1>
                <FilterBar/>  
                    <div className='routine-cards' id='scrollRoutineCards'>
                        {renderRoutines()}
                    <div className='scroll-up-container' onClick={()=>scrollToTopRoutineCards()}><ChevronDoubleUpIcon className='scroll-up-icon'/></div>
                    </div>
                </div>
                <div className='user-routines'>
                    <h1>My Routines</h1>
                </div>
            </div>
        </Layout>
    )
}

export {Routines}