import { useContext } from 'react'
import { Layout } from '../../Components/Layout'
import { GeneralContext } from '../../GeneralContext'
import './Training.css'
import { NavLink } from 'react-router-dom'

function Training(){
    const context = useContext(GeneralContext)
    return(
        <Layout>
            <section className='training__title'>
                <h1>Training</h1>
            </section>
            <section className='training__routines-card'>
                <h2 className='training__select-routine'>Select a routine to start</h2>
                <ul className='training__routine-list'>
                    {context.userRoutines.length > 0 ? 
                        context.userRoutines.map(routine => (
                            <NavLink key={routine.id} className='training__item' to='/train-routine'
                            onClick={() => context.setRoutineToTrain(routine)}>
                                <p className='training__routine'>{routine.name}</p>
                            </NavLink>
                        ))
                    :
                        <p className='training__item'>
                            Create a routine first
                        </p>
                    }
                </ul>
            </section>
        </Layout>
    )
}

export { Training }