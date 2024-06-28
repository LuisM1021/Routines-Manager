import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { NavLink } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './Navbar.css'
function Navbar(){
    const {displayNavbar,setDisplayNavbar} = useContext(GeneralContext)

    const hideNavbar = (className) => {
        if(typeof(className) === 'string' && className.includes('mobile-navbar')){
            setDisplayNavbar(false)
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
                <img className='logo' src='https://th.bing.com/th/id/OIG2.eMuuAVBVJ4gZoC6y6kFB?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn' alt='logo'></img>
                <NavLink className='redirect' to='/'>
                    <div className='page-container'>
                        <p className='page'>Home</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/'>
                    <div className='page-container'>
                        <p className='page'>Timer</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/routines'>
                    <div className='page-container'>
                        <p className='page'>Routines</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/'>
                    <div className='page-container'>
                        <p className='page'>Exercises</p>
                    </div> 
                </NavLink>
                <NavLink className='redirect' to='/'>
                    <div className='page-container'>
                        <p className='page'>Export routine</p>
                    </div> 
                </NavLink>
            </div>
        </aside>
    )
}
export {Navbar}