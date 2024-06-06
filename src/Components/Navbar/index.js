import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar(){
    return (
        <aside className="Navbar-container">
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
        </aside>
    )
}
export {Navbar}