import { useContext } from 'react'
import { GeneralContext } from '../../GeneralContext'
import { Bars3Icon } from '@heroicons/react/24/outline'
import './Layout.css'

function Layout({children}){
    const {displayNavbar,setDisplayNavbar} = useContext(GeneralContext)

    const toggleNavbar = () => {
        if(displayNavbar){
            setDisplayNavbar(false)
        }else{
            setDisplayNavbar(true)
        }
    }

    return(
        <div className="layout light-mode">
            <div
             className='open-menu-container'
             onClick={()=>toggleNavbar()}>
                <Bars3Icon className='open-menu'/>
            </div>
            {children}
        </div>
    )
}

export {Layout}