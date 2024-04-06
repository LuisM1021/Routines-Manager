import React from 'react'
import { Home } from '../Pages/Home';
import { Routines } from '../Pages/Routines';
import { Navbar } from "../Components/Navbar"
import { Layout } from '../Components/Layout';
import './App.css';



function AppUI(){
    return(
        <div className="App">
            <Navbar/>
            <Layout>
                <Routines/>
            </Layout> 
        </div>
    );
}

export {AppUI};