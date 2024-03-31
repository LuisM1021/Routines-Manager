import React from 'react'
import { GeneralContext } from '../GeneralContext';
import { Home } from '../Pages/Home';
import { Navbar } from "../Components/Navbar"
import { Layout } from '../Components/Layout';
import './App.css';



function AppUI(){
    const {
        saveItem,getItem
    } = React.useContext(GeneralContext)
    
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