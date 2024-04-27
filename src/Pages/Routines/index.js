import { useContext,useState } from 'react'
import './Routines.css'
import {GeneralContext} from '../../GeneralContext'
import {RoutineCard} from '../../Components/RoutineCard'
import {ChevronDoubleUpIcon} from '@heroicons/react/24/outline'
import { RoutineDetails } from '../../Components/RoutineDetails'

function Routines(){
    const {
        showRoutineDetails,setSearchByName,setFilterBy,filterBy,filteredRoutines,availableCategories
    } = useContext(GeneralContext)
    const scrollToTopRoutineCards=()=>{
        document.getElementById('scrollRoutineCards').scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const [filterToRender,setFilterToRender]  = useState(null)
    const [filterActive,setFilterActive] = useState([false,false,false,false])
    const [checkedCategory,setCheckedCategory] = useState([])
    const handleSelectedCategory = (category) => {
        const searchCategory = checkedCategory.find(cat => cat === category)
        if(searchCategory){
            //Removing the selected category
            setCheckedCategory((checkedCategory) => checkedCategory.filter((cat => cat!=category)))
        }else{
            setCheckedCategory((checkedCategory) => ([...checkedCategory,category]))   
        }
    }
    const displaySelectedState = (category) => {
        if(checkedCategory.find(cat => cat === category)){
            return 'active-category'
        }else return ''
    }
    const renderFilter = () => { 
        switch(filterToRender){
            case'name':
                return (
                    <input className='name-filter' type='text' placeholder='default routine' onChange={(event)=>handleChange(event)}/>
                ) 
            case 'time':
                return (<p>filter time</p>)
                
            case 'category':
                return (
                    <ul className='categories-filter'>
                        {availableCategories?.map((category,index) => (
                            <li 
                             className='category-item'
                             key={index}
                             onClick={()=>handleSelectedCategory(category)}>
                                <span className={`category-checkbox ${displaySelectedState(category)}`}></span><span className='category-name'>{category}</span>
                            </li>
                        ))}
                    </ul>
                )
                
            case 'equipment':
                return (<p>filter equipment</p>)
            default:
                return(<></>)
        }
    }
    const handleChange = (event) => {
        setSearchByName(event.target.value)
    }
    const renderRoutines = () =>{
        return (
            <>
                {filteredRoutines?.map(routine=>{
                    return (<RoutineCard key={routine.name} routine={routine}/>)
                })}
            </>
        )
    }
    const handleClick = (indicator) => {
        const currentFilterBy = [...filterBy]
        switch(indicator){
            case 0:
                currentFilterBy[indicator] = 'name' 
                setFilterToRender('name')
                setFilterActive((filterActive)=>{
                    filterActive[0] = true
                    return filterActive
                })
            break
            case 1:
                currentFilterBy[indicator] = 'time' 
                setFilterToRender('time')
                setFilterActive((filterActive)=>{
                    filterActive[1] = true
                    return filterActive
                })
            break
            case 2:
                currentFilterBy[indicator] = 'category' 
                setFilterToRender('category')
                setFilterActive((filterActive)=>{
                    filterActive[2] = true
                    return filterActive
                })
            break
            case 3:
                currentFilterBy[indicator] = 'equipment' 
                setFilterToRender('equipment')
                setFilterActive((filterActive)=>{
                    filterActive[3] = true
                    return filterActive
                })
            break
        }
       
        setFilterBy(currentFilterBy)
        // filterRoutines()
    }
    return(
        <div className='routines-container'>
            {showRoutineDetails && <RoutineDetails/>}
            <div className='search-routine'>
                <h1>Search Routine</h1>
                <div className='filter-bar'>
                    <div className='filters-container'>
                        <p>Filter</p>
                        <div className='filters'>
                            <button className={`filter-button ${filterActive[0] && 'active'}`} onClick={()=>handleClick(0)}>Name</button>
                            <button className={`filter-button ${filterActive[1] && 'active'}`} onClick={()=>handleClick(1)}>Time</button>
                            <button className={`filter-button ${filterActive[2] && 'active'}`} onClick={()=>handleClick(2)}>Category</button>
                            <button className={`filter-button ${filterActive[3] && 'active'}`} onClick={()=>handleClick(3)}>Require equipment</button>
                        </div>
                    </div>
                    <div className='filter-container'>
                        {renderFilter()}
                    </div>
                </div>
                <div className='routine-cards' id='scrollRoutineCards'>
                    {renderRoutines()}
                <div className='scroll-up-container' onClick={()=>scrollToTopRoutineCards()}><ChevronDoubleUpIcon className='scroll-up-icon'/></div>
                </div>
            </div>
            <div className='user-routines'>
                <h1>My Routines</h1>
            </div>
        </div>
    )
}

export {Routines}

