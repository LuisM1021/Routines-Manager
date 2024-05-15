import { useContext,useState } from "react"
import { GeneralContext } from "../../GeneralContext"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import './FilterBar.css'

function FilterBar(){
    const {
        filterBy,
        setFilterBy,
        setSearchByName,
        setSearchByCategory,
        searchByCategory,
        setSearchByEquipment,
        searchByEquipment,
        setExecuteFilters,
        searchByName,
        minHrs,
        minMinutes,
        minSec,
        maxHrs,
        maxMin,
        maxSec,
        setMinHrs,
        setMinMinutes,
        setMinSec,
        setMaxHrs,
        setMaxMin,
        setMaxSec,
        availableCategories,
        equipmentOptions

    } = useContext(GeneralContext)

    //Indicates the current selected filter
    const [filterToRender,setFilterToRender]  = useState(null)
    console.log(filterToRender)
    //Categories that are selected to be filtered
    const [checkedCategory,setCheckedCategory] = useState([])

    //Categories that are selected to be filtered
    const [checkedEquipment,setCheckedEquipment] = useState([])

    const [timeFilterActive,setTimeFilterActive] = useState(false)
    const [categoryFilterActive,setCategoryFilterActive] = useState(false)
    const [equipmentFilterActive,setEquipmentFilterActive] = useState(false)
    
    const handleClick = (indicator) => {
        const currentFilterBy = [...filterBy]
        switch(indicator){
            case 0:
                if(filterToRender === 'name'){
                    currentFilterBy[indicator] = null 
                    setFilterToRender(null) 
                    setSearchByName('')
                }else{
                    currentFilterBy[indicator] = 'name' 
                    setFilterToRender('name')
                    if(!timeFilterActive){
                        currentFilterBy[1] = null
                        setMinHrs('00')
                        setMinMinutes('00')
                        setMinSec('00')
                        setMaxHrs('00')
                        setMaxMin('00')
                        setMaxSec('00')
                    } 
                    if(!categoryFilterActive){
                        currentFilterBy[2] = null
                        setCheckedCategory([])
                    } 
                    if(!equipmentFilterActive){
                        currentFilterBy[3] = null
                        setCheckedEquipment([])
                    } 
                }
            break
            case 1:
                if(filterToRender === 'time'){
                    currentFilterBy[indicator] = null 
                    setFilterToRender(null) 
                    setMinHrs('00')
                    setMinMinutes('00')
                    setMinSec('00')
                    setMaxHrs('00')
                    setMaxMin('00')
                    setMaxSec('00')
                    setTimeFilterActive(false)
                    setExecuteFilters(true)
                }else{
                    currentFilterBy[indicator] = 'time' 
                    setFilterToRender('time')
                    if(!timeFilterActive){
                        setMinHrs('00')
                        setMinMinutes('00')
                        setMinSec('00')
                        setMaxHrs('00')
                        setMaxMin('00')
                        setMaxSec('00')
                    }
                    if(searchByName==='') currentFilterBy[0] = null
                    if(!categoryFilterActive){
                        currentFilterBy[2] = null
                        setCheckedCategory([])
                    } 
                    if(!equipmentFilterActive){
                        currentFilterBy[3] = null
                        setCheckedEquipment([])
                    } 
                }
            break
            case 2:
                if(filterToRender === 'category'){
                    console.log('apagado')
                    currentFilterBy[indicator] = null 
                    setFilterToRender(null)  
                    setSearchByCategory([])
                    setCategoryFilterActive(false)
                    setExecuteFilters(true)
                }else{
                    currentFilterBy[indicator] = 'category' 
                    setFilterToRender('category')
                    if(!categoryFilterActive) setCheckedCategory([])
                    else setCheckedCategory(searchByCategory)
                    if(searchByName==='') currentFilterBy[0] = null
                    if(!timeFilterActive){
                        currentFilterBy[1] = null
                        setMinHrs('00')
                        setMinMinutes('00')
                        setMinSec('00')
                        setMaxHrs('00')
                        setMaxMin('00')
                        setMaxSec('00')
                    } 
                    if(!equipmentFilterActive){
                        currentFilterBy[3] = null
                        setCheckedEquipment([])
                    } 
                }
            break
            case 3:
                if(filterToRender === 'equipment'){
                    currentFilterBy[indicator] = null 
                    setFilterToRender(null)
                    setSearchByEquipment([])  
                    setEquipmentFilterActive(false)
                    setExecuteFilters(true)  
                }else{
                    currentFilterBy[indicator] = 'equipment' 
                    setFilterToRender('equipment')
                    if(!equipmentFilterActive) setCheckedEquipment([])
                    else setCheckedEquipment(searchByEquipment)
                    if(searchByName==='') currentFilterBy[0] = null
                    if(!timeFilterActive){
                        currentFilterBy[1] = null
                        setMinHrs('00')
                        setMinMinutes('00')
                        setMinSec('00')
                        setMaxHrs('00')
                        setMaxMin('00')
                        setMaxSec('00')
                    } 
                    if(!categoryFilterActive){
                        currentFilterBy[2] = null
                        setCheckedCategory([])
                    } 
                }
            break
        }
        setFilterBy(currentFilterBy)
    }
    const executeFilters = () => { 
        if(checkedCategory.length === 0){
            setCategoryFilterActive(false)
        }else {
            setCategoryFilterActive(true)
        }

        if (checkedEquipment.length === 0) setEquipmentFilterActive(false)
        else setEquipmentFilterActive(true)
        if(minHrs === '00' && minMinutes === '00' && minSec === '00' && maxHrs === '00' && maxMin === '00' && maxSec === '00') setTimeFilterActive(false)
        else setTimeFilterActive(true)
        setSearchByCategory(checkedCategory)
        setSearchByEquipment(checkedEquipment)
        setExecuteFilters(true)
    }
    const handleChange = (event) => {
        setSearchByName(event.target.value)
    }

    const rangeSetTimeInFilters = (event,timerSetted) => {
        let value = event.target.value
        if(value<=9) value = '0'+value
        switch(timerSetted){
            case 'MIN_HRS':
                setMinHrs(value) 
                if(value>=maxHrs){
                    setMaxHrs(value)
                    if(minMinutes>=maxMin){
                        setMaxMin(minMinutes)
                        if(minSec>maxSec){
                            setMaxSec(minSec)
                        }
                    }
                }
                break
            case 'MIN_MINUTES':
                setMinMinutes(value)
                if(minHrs === maxHrs && value>=maxMin){
                    setMaxMin(value)
                    if(minSec>maxSec){
                        setMaxSec(minSec)
                    }
                }
                break
            case 'MIN_SEC':
                setMinSec(value)
                if(minHrs === maxHrs && minMinutes === maxMin && value>maxSec){
                    setMaxSec(value)
                }
                break
            case 'MAX_HRS':
                setMaxHrs(value)
                if(value<=minHrs){
                    setMinHrs(value)
                    if(maxMin<=minMinutes){
                        setMinMinutes(maxMin)
                        if(maxSec<minSec){
                            setMinSec(maxSec)
                        }
                    }
                }
                break
            case 'MAX_MIN':
                setMaxMin(value)
                if(maxHrs === minHrs && value<=minMinutes){
                    setMinMinutes(value)
                    if(maxSec<minSec){
                        setMinSec(maxSec)
                    }
                }
                break
            case 'MAX_SEC':
                setMaxSec(value)
                if(maxHrs === minHrs && maxMin === minMinutes && value<minSec){
                    setMinSec(value)
                }
                break
            default: 
                break
        }
    }
    const textSetTimeInFilters = (data,timerSetted) => {
        if(data === '00'){
            data = null
        }
        else if(parseInt(data)>=0 && parseInt(data)<=59){
            data = data
        } 
        else {
            data = null
        }
        let newTime
        if(data === null) newTime = '00'
        switch(timerSetted){
            case 'MIN_HRS':
                    if(data) newTime = `${minHrs[1]}${data}`
                    if(newTime>23) newTime = '23'
                    setMinHrs(newTime)
                    if(newTime>=maxHrs){
                        setMaxHrs(newTime)
                        if(minMinutes>=maxMin){
                            setMaxMin(minMinutes)
                            if(minSec>maxSec){
                                setMaxSec(minSec)
                            }
                        }
                    }
                    break
                case 'MIN_MINUTES':
                    if(data) newTime = `${minMinutes[1]}${data}`
                    if(newTime>59) newTime = '59'
                    setMinMinutes(newTime)
                    if(minHrs === maxHrs && newTime>=maxMin){
                        setMaxMin(newTime)
                        if(minSec>maxSec){
                            setMaxSec(minSec)
                        }
                    }
                    break
                case 'MIN_SEC':
                    if(data) newTime = `${minSec[1]}${data}`
                    if(newTime>59) newTime = '59'
                    setMinSec(newTime)
                    if(minHrs === maxHrs && minMinutes === maxMin && newTime>maxSec){
                        setMaxSec(newTime)
                    }
                    break
                case 'MAX_HRS':
                    if(data) newTime = `${maxHrs[1]}${data}`
                    if(newTime>23) newTime = '23'
                    setMaxHrs(newTime)
                    if(newTime<=minHrs){
                        setMinHrs(newTime)
                        if(maxMin<=minMinutes){
                            setMinMinutes(maxMin)
                            if(maxSec<minSec){
                                setMinSec(maxSec)
                            }
                        }
                    }
                    break
                case 'MAX_MIN':
                    if(data) newTime = `${maxMin[1]}${data}`
                    if(newTime>59) newTime = '59'
                    setMaxMin(newTime)
                    if(maxHrs === minHrs && newTime<=minMinutes){
                        setMinMinutes(newTime)
                        if(maxSec<minSec){
                            setMinSec(maxSec)
                        }
                    }
                    break
                case 'MAX_SEC':
                    if(data) newTime = `${maxSec[1]}${data}`
                    if(newTime>59) newTime = '59'
                    setMaxSec(newTime)
                    if(maxHrs === minHrs && maxMin === minMinutes && newTime<minSec){
                        setMinSec(newTime)
                    }
                    break
                default: 
                    break
            }
    }

    const handleSelectedCategory = (category) => {
        const searchCategory = checkedCategory.find(cat => cat === category)
        if(searchCategory){
            //Removing the selected category
            setCheckedCategory((checkedCategory) => checkedCategory.filter((cat => cat!=category)))
        }else{
            setCheckedCategory((checkedCategory) => ([...checkedCategory,category]))   
        }
    }

    const displaySelectedCategory = (category) => {
        if(checkedCategory.find(cat => cat === category)){
            return 'active-category'
        }else return ''
    }

    const handleSelectedEquipment = (equipment) => {
        const searchEquipment = checkedEquipment.find(equip => equip === equipment)
        if(searchEquipment){
            //Removing the selected category
            setCheckedEquipment((checkedEquipment) => checkedEquipment.filter((equip => equip!=equipment)))
        }else{
            setCheckedEquipment((checkedEquipment) => ([...checkedEquipment,equipment]))   
        }
    }

    const displaySelectedEquipment = (equipment) => {
        if(checkedEquipment.find(equip => equip === equipment)){
            return 'active-equipment'
        }else return ''
    }

    const renderFilter = () => { 
        switch(filterToRender){
            case'name':
                return (
                    <input className='name-filter'
                    type='text' 
                    placeholder='default routine' 
                    value={(searchByName!==null || searchByName!=='')&&searchByName} 
                    onChange={(event)=>handleChange(event)}/>
                ) 
            case 'time':
                return (
                    <div className='times-container'>
                        <div className='min-times-container'>
                            <div className='inputs-container'>
                                <input className='time-range' name='min-hrs' value={minHrs} type='range' min='0' max='23' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MIN_HRS')}/>
                                <input className='time-range' name='min-min' value={minMinutes} type='range' min='0' max='59' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MIN_MINUTES')}/>
                                <input className='time-range' name='min-seg' value={minSec} type='range' min='0' max='59' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MIN_SEC')}/>
                            </div>
                            <p className='time-value-container'>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MIN_HRS')} value={`${minHrs}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_HRS')}/>
                                <span>:</span>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MIN_MINUTES')} value={`${minMinutes}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_MINUTES')}/>
                                <span>:</span>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MIN_SEC')} value={`${minSec}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MIN_SEC')}/>
                            </p>
                        </div>
                        <div className='max-times-container'>
                            <div className='inputs-container'>
                                <input className='time-range' name='max-hrs' value={maxHrs} type='range' min='0' max='23' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MAX_HRS')}/>
                                <input className='time-range' name='max-min' value={maxMin} type='range' min='0' max='59' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MAX_MIN')}/>
                                <input className='time-range' name='max-seg' value={maxSec} type='range' min='0' max='59' step='1' onChange={(event)=>rangeSetTimeInFilters(event,'MAX_SEC')}/>
                            </div>
                            <p className='time-value-container'>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MAX_HRS')} value={`${maxHrs}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_HRS')}/>
                                <span>:</span>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MAX_MIN')} value={`${maxMin}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_MIN')}/>
                                <span>:</span>
                                <input className='time-value' onClick={()=>textSetTimeInFilters('00','MAX_SEC')} value={`${maxSec}`} onChange={(event)=>textSetTimeInFilters(event.nativeEvent.data,'MAX_SEC')}/>
                            </p>
                        </div>
                    </div>
                )
                
            case 'category':
                return (
                    <ul className='categories-filter'>
                        {availableCategories?.map((category,index) => (
                            <li 
                             className='category-item'
                             key={index}
                             onClick={()=>handleSelectedCategory(category)}>
                                <span className={`category-checkbox ${displaySelectedCategory(category)}`}></span><span className='equipment-name'>{category}</span>
                            </li>
                        ))}
                    </ul>
                )
                
            case 'equipment':
                return (
                    <ul className='equipment-filter'>
                        {equipmentOptions?.map((equipment,index) => (
                            <li 
                             className='equipment-item'
                             key={index}
                             onClick={()=>handleSelectedEquipment(equipment)}>
                                <span className={`equipment-checkbox ${displaySelectedEquipment(equipment)}`}></span><span className='category-name'>{equipment}</span>
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
                <p>Filter</p>
                <div className='filters'>
                    <button className={`filter-button ${filterBy[0]==='name' && 'active'}`} onClick={()=>handleClick(0)}>Name</button>
                    <button className={`filter-button ${filterBy[1]==='time' && 'active'}`} onClick={()=>handleClick(1)}>Time</button>
                    <button className={`filter-button ${filterBy[2]==='category' && 'active'}`} onClick={()=>handleClick(2)}>Category</button>
                    <button className={`filter-button ${filterBy[3]==='equipment' && 'active'}`} onClick={()=>handleClick(3)}>Require equipment</button>
                </div>
                {filterToRender==='time'||filterToRender==='category'||filterToRender==='equipment' ? <MagnifyingGlassIcon onClick={()=>executeFilters()} className='search-icon'/>:<></>}
            </div>
            <div className='filter-container'>
                {renderFilter()}
            </div>
        </div>
    )
}

export {FilterBar}