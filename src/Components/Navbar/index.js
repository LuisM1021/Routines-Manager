import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { NavLink } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './Navbar.css'
function Navbar(){
    const {displayNavbar,setDisplayNavbar, resetCreateRoutine, currentPage, setCurrentPage, setIsDarkMode} = useContext(GeneralContext)

    const hideNavbar = (className) => {
        if(typeof(className) === 'string' && className.includes('mobile-navbar')){
            setDisplayNavbar(false)
        }
    }
    const handleCreateRoutine = () => {
        resetCreateRoutine()
        setDisplayNavbar(false)
        setCurrentPage('create-routine')
    }
    const handleChangePage = (newPage) => {
        setDisplayNavbar(false)
        setCurrentPage(newPage)
    }
    const handleChangeMode = (target) => {
        if(parseInt(target.value) === 0){
            setIsDarkMode(false)
        }else{
            setIsDarkMode(true)
        }
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
                <NavLink className='logo-cont' to='/' 
                 onClick={()=>handleChangePage('home')}>
                    <img className='logo' src='./pics/logo.jpg' alt='logo'></img>
                </NavLink>
                <NavLink className='redirect' to='/'
                 onClick={()=>handleChangePage('home')}>
                    <div className={`page-container ${currentPage === 'home' && 'page-container--active'}`}>
                        <p className='page'>Home</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/routines'
                 onClick={()=>handleChangePage('routines')}>
                    <div className={`page-container ${currentPage === 'routines' && 'page-container--active'}`}>
                        <p className='page'>Routines</p>
                    </div> 
                </NavLink>
                {/* <NavLink className='redirect' to='/'
                onClick={()=>handleChangePage()}>
                    <div className={`page-container ${currentPage === 'home' && 'page-container--active'}`}>
                        <p className='page'>Exercises</p>
                    </div> 
                </NavLink> */}
                <NavLink className='redirect' to='/create-routine'
                 onClick={()=>handleCreateRoutine()}>
                    <div className={`page-container ${currentPage === 'create-routine' && 'page-container--active'}`}>
                        <p className='page'>Create</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/training'
                onClick={()=>handleChangePage('training')}>
                    <div className={`page-container ${currentPage === 'training' && 'page-container--active'}`}>
                        <p className='page'>Training</p>
                    </div> 
                </NavLink>
                <div className='mode-cont'>
                    <p>Dark mode</p>
                    <input type='range' min={0} max={1} defaultValue={0}
                    onChange={(e)=>handleChangeMode(e.target)}/>
                </div>
            </div>
        </aside>
    )
}
export {Navbar}