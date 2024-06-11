import { useContext } from "react"
import { GeneralContext } from "../../GeneralContext"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import './FilterBar.css'
import {FilterBarLogic} from "./logic"

function FilterBar(){
    const {
        filterBy, 
        searchByName,
        minHrs,
        minMinutes,
        minSec,
        maxHrs,
        maxMin,
        maxSec,
        availableCategories,
        equipmentOptions
    } = useContext(GeneralContext)
    
    const {
        toggleFilterOptions,
        selectFilter,
        displayFilters,
        filterToRender,
        executeFilters,
        changeName,
        rangeSetTimeInFilters,
        textSetTimeInFilters,
        handleSelectedCategory,
        displaySelectedCategory,
        handleSelectedEquipment,
        displaySelectedEquipment,
    } = FilterBarLogic()

    const renderFilter = () => { 
        switch(filterToRender){
            case'name':
                return (
                    <input className='name-filter slide-animation'
                    type='text' 
                    placeholder='default routine' 
                    value={(searchByName!==null || searchByName!=='')&&searchByName} 
                    onChange={(event)=>changeName(event)}/>
                ) 
            case 'time':
                return (
                    <div className='times-container slide-animation'>
                        <div className='min-times-container'>
                            <div className='inputs-container'>
                                <input
                                className='time-range'
                                name='min-hrs' 
                                value={minHrs} 
                                type='range' 
                                min='0' 
                                max='23' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MIN_HRS')}/>
                                <input 
                                className='time-range' 
                                name='min-min' 
                                value={minMinutes} 
                                type='range' 
                                min='0' 
                                max='59' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MIN_MINUTES')}/>
                                <input 
                                className='time-range' 
                                name='min-seg' 
                                value={minSec} 
                                type='range' 
                                min='0' 
                                max='59' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MIN_SEC')}/>
                            </div>
                            <p className='time-value-container'>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters('00','MIN_HRS')} 
                                value={`${minHrs}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_HRS')}/>
                                <span>:</span>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters('00','MIN_MINUTES')} 
                                value={`${minMinutes}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_MINUTES')}/>
                                <span>:</span>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters('00','MIN_SEC')} 
                                value={`${minSec}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_SEC')}/>
                            </p>
                        </div>
                        <div className='max-times-container'>
                            <div className='inputs-container'>
                                <input 
                                className='time-range' 
                                name='max-hrs' 
                                value={maxHrs} 
                                type='range' 
                                min='0' 
                                max='23' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MAX_HRS')}/>
                                <input 
                                className='time-range' 
                                name='max-min' 
                                value={maxMin} 
                                type='range' 
                                min='0' 
                                max='59' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MAX_MIN')}/>
                                <input 
                                className='time-range' 
                                name='max-seg' 
                                value={maxSec} 
                                type='range' 
                                min='0' 
                                max='59' 
                                step='1' 
                                onChange={(event)=>rangeSetTimeInFilters(event,'MAX_SEC')}/>
                            </div>
                            <p className='time-value-container'>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters(minHrs,'MAX_HRS')} 
                                value={`${maxHrs}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_HRS')}/>
                                <span>:</span>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters(minMinutes,'MAX_MIN')} 
                                value={`${maxMin}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_MIN')}/>
                                <span>:</span>
                                <input 
                                className='time-value' 
                                onClick={()=>textSetTimeInFilters(minSec,'MAX_SEC')} 
                                value={`${maxSec}`} 
                                onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_SEC')}/>
                            </p>
                        </div>
                    </div>
                )
                
            case 'category':
                return (
                    <ul className='categories-filter slide-animation'>
                        {availableCategories?.map((category,index) => (
                            <li 
                            className='category-item'
                            key={index}
                            onClick={()=>handleSelectedCategory(category)}>
                                <span className={`category-checkbox ${displaySelectedCategory(category)}`}></span>
                                <span className='category-name'>
                                    {category}
                                </span>
                            </li>
                        ))}
                    </ul>
                )
                
            case 'equipment':
                return (
                    <ul className='equipment-filter slide-animation'>
                        {equipmentOptions?.map((equipment,index) => (
                            <li 
                             className='equipment-item'
                             key={index}
                             onClick={()=>handleSelectedEquipment(equipment)}>
                                <span className={`equipment-checkbox ${displaySelectedEquipment(equipment)}`}></span>
                                <span className='equipment-name'>
                                    {equipment}
                                </span>
                            </li>
                        ))}
                    </ul>
                )
            default:
                return(<></>)
        }
    }
    return (
        <div className='filter-bar'>
            <div className='filters-container'>
                <p 
                className='filter-title' 
                onClick={()=>toggleFilterOptions()}>
                    Filter
                </p>
                {displayFilters && 
                    <div className='filters slide-animation'>
                        <button 
                        className={`filter-button ${filterBy[0]==='name' && 'active'}`} 
                        onClick={()=>selectFilter(0)}>
                            Name
                        </button>
                        <button 
                        className={`filter-button ${filterBy[1]==='time' && 'active'}`} 
                        onClick={()=>selectFilter(1)}>
                            Time
                        </button>
                        <button 
                        className={`filter-button ${filterBy[2]==='category' && 'active'}`} 
                        onClick={()=>selectFilter(2)}>
                            Category
                        </button>
                        <button 
                        className={`filter-button ${filterBy[3]==='equipment' && 'active'}`} 
                        onClick={()=>selectFilter(3)}>
                            Require equipment
                        </button>
                    </div>  
                }
            </div>
            {(displayFilters && filterToRender) &&
                <div className='filter-options-container'>
                    {displayFilters && (filterToRender==='time'||filterToRender==='category'||filterToRender==='equipment') ? 
                    <MagnifyingGlassIcon 
                    onClick={()=>executeFilters()} 
                    className='search-icon slide-animation'/>
                    :
                    <></>}
                    {displayFilters &&
                        <div className='filter-container'>
                            {renderFilter()}
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export {FilterBar}