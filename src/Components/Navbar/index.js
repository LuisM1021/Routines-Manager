import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar(){
    return (
        <aside className="Navbar-container">
            <img src='https://th.bing.com/th/id/OIG2.eMuuAVBVJ4gZoC6y6kFB?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn' alt='logo'></img>
            <NavLink className='redirect' to='/'>
                <div><p>Home</p></div> 
            </NavLink>
            <NavLink className='redirect' to='/'>
                <div><p>Timer</p></div> 
            </NavLink>
            <NavLink className='redirect' to='/routines'>
                <div><p>Routines</p></div> 
            </NavLink>
            <NavLink className='redirect' to='/'>
                <div><p>Exercises</p></div> 
            </NavLink>
            <NavLink className='redirect' to='/'>
                <div><p>Export routine</p></div> 
            </NavLink>
        </aside>
    )
}
export {Navbar}