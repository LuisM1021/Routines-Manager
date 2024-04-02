import React from 'react'
import { Home } from '../Pages/Home';
import { Navbar } from "../Components/Navbar"
import { Layout } from '../Components/Layout';
import './App.css';



function AppUI(){
    return(
        <div className="App">
            <Navbar/>
            <Layout>
                <Home/>
            </Layout>
            
        </div>
    );
}

export {AppUI};