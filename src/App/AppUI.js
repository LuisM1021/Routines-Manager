import {useContext, useEffect} from 'react'
import {useRoutes,BrowserRouter} from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Routines } from '../Pages/Routines'
import { Navbar } from "../Components/Navbar"
import { CreateRoutine } from '../Pages/CreateRoutine'
import { Training } from '../Pages/Training'
import { TrainRoutine } from '../Pages/TrainRoutine'

import { GeneralContext } from '../GeneralContext'


const AppRoutes = () => {
    const context = useContext(GeneralContext)
    const routes = useRoutes([
        { path: '/',element: <Home />},
        { path: '/routines',element: <Routines />},
        { path: '/create-routine',element: <CreateRoutine />},
        { path: '/training',element: <Training />},
        { path: '/train-routine',element: context.routineToTrain ? <TrainRoutine /> : <Training />},
        { path: '/*',element: <Home />},
    ])
    return routes
}


function AppUI(){
    const context = useContext(GeneralContext)

    useEffect(()=>{
        const body = document.querySelector('body')
        if(context.isDarkMode){
            body.classList.add('dark-mode')
        }else{
            body.classList.remove('dark-mode')
        }
    },[context.isDarkMode])
    return(
        <BrowserRouter>
            <AppRoutes/>
            <Navbar/>
        </BrowserRouter>
    );
}

export {AppUI};