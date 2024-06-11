import { useContext,useState } from "react"
import { GeneralContext } from "../../GeneralContext"

function FilterBarLogic(){
    //Indicates the current selected filter
    const [filterToRender,setFilterToRender]  = useState(null)

    //Categories that are selected to be filtered
    const [checkedCategory,setCheckedCategory] = useState([])

    //Equipment options that are selected to be filtered
    const [checkedEquipment,setCheckedEquipment] = useState([])

    //Indicates if timeFilter is currently being applied
    const [timeFilterActive,setTimeFilterActive] = useState(false)

    //Indicates if categoryFilter is currently being applied
    const [categoryFilterActive,setCategoryFilterActive] = useState(false)

    //Indicates if equipmentFilter is currently being applied
    const [equipmentFilterActive,setEquipmentFilterActive] = useState(false)
    
    //To display the filter options when clicking filter button
    const [displayFilters,setDisplayFilters] = useState(false)
    
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
        resetFilters

    } = useContext(GeneralContext)
   
    const toggleFilterOptions = () => {
        if(displayFilters){
            resetFilters()
            setFilterToRender(null)
            setCheckedCategory([])
            setCheckedEquipment([])
            setCategoryFilterActive(false)
            setEquipmentFilterActive(false)
            setTimeFilterActive(false)
            setDisplayFilters(false)
        }else{
            setDisplayFilters(true)
        }
    }

    const selectFilter = (indicator) => {
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
                    if(searchByName===''){
                        currentFilterBy[0] = null
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
            case 2:
                if(filterToRender === 'category'){
                    currentFilterBy[indicator] = null 
                    setFilterToRender(null)  
                    setSearchByCategory([])
                    setCategoryFilterActive(false)
                    setExecuteFilters(true)
                }else{
                    currentFilterBy[indicator] = 'category' 
                    setFilterToRender('category')
                    if(!categoryFilterActive){
                        setCheckedCategory([])
                    } 
                    else{
                        setCheckedCategory(searchByCategory)
                    }
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
                    if(!equipmentFilterActive){
                        setCheckedEquipment([])
                    } 
                    else{
                        setCheckedEquipment(searchByEquipment)
                    } 
                    if(searchByName===''){
                        currentFilterBy[0] = null   
                    }
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
            default: break;
        }
        setFilterBy(currentFilterBy)
    }
    const executeFilters = () => { 
        if(checkedCategory.length === 0){
            setCategoryFilterActive(false)
        }else {
            setCategoryFilterActive(true)
        }

        if (checkedEquipment.length === 0){
            setEquipmentFilterActive(false)   
        }else{
            setEquipmentFilterActive(true)
        } 
        if(minHrs === '00' && minMinutes === '00' && minSec === '00' && maxHrs === '00' && maxMin === '00' && maxSec === '00'){
            setTimeFilterActive(false)
        }
        else{
            setTimeFilterActive(true)
        } 
        setSearchByCategory(checkedCategory)
        setSearchByEquipment(checkedEquipment)
        setExecuteFilters(true)
    }
    const changeName = (event) => {
        setSearchByName(event.target.value)
    }

    const rangeSetTimeInFilters = (event,timerSetted) => {
        let value = event.target.value
        if(value<=9){
            value = '0'+value
        } 
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
        else if(data && data.length === 2){
            //no action
        }
        else if(parseInt(data)>=0 && parseInt(data)<=59){
            //no action
        } 
        else {
            data = null
        }
        let newTime
        if(data === null){
            newTime = '00'
        } 
        switch(timerSetted){
            case 'MIN_HRS':
                    if(data){
                        newTime = `${minHrs[1]}${data}`
                    } 
                    if(newTime>23){
                        newTime = '23'
                    }
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
                    if(data){
                        newTime = `${minMinutes[1]}${data}`
                    } 
                    if(newTime>59){
                        newTime = '59'
                    }
                    setMinMinutes(newTime)
                    if(minHrs === maxHrs && newTime>=maxMin){
                        setMaxMin(newTime)
                        if(minSec>maxSec){
                            setMaxSec(minSec)
                        }
                    }
                    break
                case 'MIN_SEC':
                    if(data){
                        newTime = `${minSec[1]}${data}`
                    } 
                    if(newTime>59){
                        newTime = '59'
                    } 
                    setMinSec(newTime)
                    if(minHrs === maxHrs && minMinutes === maxMin && newTime>maxSec){
                        setMaxSec(newTime)
                    }
                    break
                case 'MAX_HRS':
                    if(data && data.length === 2){
                        newTime = data
                    } 
                    else if(data){
                        newTime = `${maxHrs[1]}${data}`
                    } 
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
                    if(data && data.length === 2){
                        newTime = data
                    } 
                    else if(data){
                        newTime = `${maxMin[1]}${data}`
                    } 
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
                    if(data && data.length === 2){
                        newTime = data
                    } 
                    else if(data){
                        newTime = `${maxSec[1]}${data}`
                    } 
                    if(newTime>59){
                        newTime = '59'
                    } 
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
            setCheckedCategory((checkedCategory) => checkedCategory.filter((cat => cat!==category)))
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
            setCheckedEquipment((checkedEquipment) => checkedEquipment.filter((equip => equip!==equipment)))
        }else{
            setCheckedEquipment((checkedEquipment) => ([...checkedEquipment,equipment]))   
        }
    }

    const displaySelectedEquipment = (equipment) => {
        if(checkedEquipment.find(equip => equip === equipment)){
            return 'active-equipment'
        }else return ''
    }
    return{
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
    }
}

export { FilterBarLogic }