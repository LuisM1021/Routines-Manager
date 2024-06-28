import React from 'react'
import {useRoutes,BrowserRouter} from 'react-router-dom'
import { Home } from '../Pages/Home'
import { Routines } from '../Pages/Routines'
import { Navbar } from "../Components/Navbar"
import { CreateRoutine } from '../Pages/CreateRoutine'

const AppRoutes = () => {
    const routes = useRoutes([
        { path: '/',element: <Home />},
        { path: '/routines',element: <Routines />},
        { path: '/create-routine',element: <CreateRoutine />},
        { path: '/*',element: <Home />},
    ])
    return routes
}


function AppUI(){
    return(
        <BrowserRouter>
            <AppRoutes/>
            <Navbar/>
        </BrowserRouter>
    );
}

export {AppUI};