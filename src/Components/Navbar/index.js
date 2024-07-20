import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { NavLink } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './Navbar.css'
function Navbar(){
    const {displayNavbar,setDisplayNavbar, resetCreateRoutine} = useContext(GeneralContext)

    const hideNavbar = (className) => {
        if(typeof(className) === 'string' && className.includes('mobile-navbar')){
            setDisplayNavbar(false)
        }
    }
    const handleCreateRoutine = () => {
        resetCreateRoutine()
        setDisplayNavbar(false)
    }
    return (
        <aside 
         className={`mobile-navbar-container ${displayNavbar ? 'mobile-navbar' : ''}`}
         onClick={(event)=>hideNavbar(event.target.className)}>
            <div
             className='close-navbar'
             onClick={()=>setDisplayNavbar(false)}>
                <XMarkIcon className='x-icon'/>
            </div>
            <div
            className='Navbar-container'>
                <NavLink className='redirect' to='/' 
                 onClick={()=>setDisplayNavbar(false)}>
                    <img className='logo' src='./pics/logo.jpg' alt='logo'></img>
                </NavLink>
                <NavLink className='redirect' to='/'
                 onClick={()=>setDisplayNavbar(false)}>
                    <div className='page-container'>
                        <p className='page'>Home</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/routines'
                 onClick={()=>setDisplayNavbar(false)}>
                    <div className='page-container'>
                        <p className='page'>Routines</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/'
                onClick={()=>setDisplayNavbar(false)}>
                    <div className='page-container'>
                        <p className='page'>Exercises</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/create-routine'
                 onClick={()=>handleCreateRoutine()}>
                    <div className='page-container'>
                        <p className='page'>Create</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/training'
                onClick={()=>setDisplayNavbar(false)}>
                    <div className='page-container'>
                        <p className='page'>Training</p>
                    </div> 
                </NavLink>
            </div>
        </aside>
    )
}
export {Navbar}