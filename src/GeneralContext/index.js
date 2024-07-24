import { useState,useEffect,createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { loadAvailableCategories,loadEquipmentOptions,filterRoutinesByTimeRange } from '../Utils';
import Fuse from 'fuse.js';
import moment from 'moment'
import { CreateRoutine } from '../Utils/createRoutine';

const GeneralContext = createContext()

function GeneralProvider({children}){

    const{
        saveItem,
        getItem,
        routines,
        exercises,
        userRoutines,
        setUserRoutines
    } = useLocalStorage();
    
    // dragging
    const [draggedItem, setDraggedItem] = useState(null)

    //----------------------NAVBAR---------------------------

    //Manage the navbar for short screens
    const [displayNavbar, setDisplayNavbar] = useState(false)

    //Manage the navbar for short screens
    const [displayExerciseDetail, setDisplayExerciseDetail] = useState(false)

    const [currentPage, setCurrentPage] = useState(null)

    //-------------------------------------------------------

    //----------------------HOME-----------------------------
    
    //Selected routine in the featured routines panel
    const [ selectedRoutine, setSelectedRoutine ] = useState(null)

    //-------------------------------------------------------

    //---------------------ROUTINES--------------------------
    const [renderDetail, setRenderDetail] = useState(null)
    const renderUserRoutineDetail = (routine) => {
        setRenderDetail(routine)
    }
    //-------------------------------------------------------

    //-------------ROUTINES-SEARCH_ROUTINE_PANEL-------------

    //Show routine details
    const [showRoutineDetails,setShowRoutineDetails] = useState(false)

    //Save selected routine data
    const [selectedRoutineDetails,setSelectedRoutineDetails] = useState({})

    //Available categories according to the list of routines
    const [availableCategories,setAvailableCategories] = useState(null)

    //Equipment options according to the list of routines
    const [equipmentOptions,setEquipmentOptions] = useState(null)

    //Filtered routines 
    const [filteredRoutines,setFilteredRoutines] = useState([])
    
    //filter by 
    const [filterBy,setFilterBy] = useState([null,null,null,null])
    
    //Filter by name 
    const [searchByName,setSearchByName] = useState('')
    
    //Filter by category
    const [searchByCategory,setSearchByCategory] = useState([])
    
    //Filter by equipment
    const [searchByEquipment,setSearchByEquipment] = useState([])
    
    //Values of the time filter
    const [minSec,setMinSec] = useState('00')
    const [minMinutes,setMinMinutes] = useState('00')
    const [minHrs,setMinHrs] = useState('00')
    const [maxSec,setMaxSec] = useState('00')
    const [maxMin,setMaxMin] = useState('00')
    const [maxHrs,setMaxHrs] = useState('00')
    const [executeFilters,setExecuteFilters] = useState(false)
    
    useEffect(()=>setSelectedRoutine(routines[0]),[routines])

    useEffect(()=>{
        setFilteredRoutines(routines)
    },[routines])

    useEffect(()=>{
        setAvailableCategories(loadAvailableCategories(routines))
        setEquipmentOptions(loadEquipmentOptions(routines))
    },[routines])
    const fuseOptions = {
        includeScore: true,
        keys: [
            "name",
        ]
    }
    //Logic to filter routines
    const filterRoutines = ()=>{
        let routinesToSet = routines
        if(filterBy[0]==='name'){
            const fuse = new Fuse(routinesToSet,fuseOptions)
            const filtrationResults = fuse.search(searchByName)
            routinesToSet = filtrationResults.map(result => (result.item))
            if (routinesToSet?.length ===0 && searchByName === ''){
                routinesToSet = routines
            } 
        }
        if(filterBy[1]==='time'){
            routinesToSet = filterRoutinesByTimeRange(routinesToSet,minHrs,minMinutes,minSec,maxHrs,maxMin,maxSec)
        }
        if(filterBy[2]==='category'){
            if(searchByCategory.length>0){
                routinesToSet = routinesToSet.filter(routine => {
                    if(searchByCategory.find(cat => cat === routine.category)){
                        return routine
                    }else return null
                })
            }
        }
        if(filterBy[3]==='equipment'){
            if(searchByEquipment.length>0){
                routinesToSet = routinesToSet.filter(routine => {
                    if(searchByEquipment.find(equip => equip === routine.equipment)){
                        return routine
                    }else return false
                })
            }
        }
        setFilteredRoutines(routinesToSet)
        setExecuteFilters(false)
    }
    useEffect(()=>{
        filterRoutines()
    },[searchByName, executeFilters]) // eslint-disable-line react-hooks/exhaustive-deps

    const resetFilters = () => {
        setFilterBy([null,null,null,null])
        setSearchByName('')
        setMinHrs('00')
        setMinMinutes('00')
        setMinSec('00')
        setMaxHrs('00')
        setMaxMin('00')
        setMaxSec('00')
        setSearchByCategory([])
        setSearchByEquipment([])
        setExecuteFilters(true)
    }
    //-------------------------------------------------------
  
    //--------------ROUTINES-USER_ROUTINES_PANEL-------------

    const addToUserRoutines = (routine) => {
        const now = moment()
        const routineWithLastUsedTime = {
            ...routine,
            id: CreateRoutine.generateId(userRoutines),
            lastUse: now.format('YYYY-MM-DD HH:mm:ss')
        }
        if(!routineWithLastUsedTime.name){
            routineWithLastUsedTime.name = `My routine ${routineWithLastUsedTime.id}`
        }
        //adding images
        routineWithLastUsedTime.timer = CreateRoutine.asignImages(routineWithLastUsedTime.timer, exercises)
        const addedUserRoutines = getItem('userRoutines')
        addedUserRoutines.push(routineWithLastUsedTime)
        saveItem('userRoutines',addedUserRoutines)
        setUserRoutines(addedUserRoutines)
    }

    const editUserRoutine = (routine) => {
        const now = moment()
        const routineWithLastUsedTime = {
            ...routine,
            lastUse: now.format('YYYY-MM-DD HH:mm:ss')
        }
        if(!routineWithLastUsedTime.name){
            routineWithLastUsedTime.name = `My routine ${routineWithLastUsedTime.id}`
        }
        const addedUserRoutines = getItem('userRoutines')
        const updatedRoutines = addedUserRoutines.map(item => {
            if(item.id === routine.id){
                return routineWithLastUsedTime
            }
            return item
        })
        saveItem('userRoutines',updatedRoutines)
        setUserRoutines(updatedRoutines)
    }
    const removeUserRoutine = (routineId) => {
        const newUserRoutines = userRoutines.filter(routine => routine.id !== routineId)
        setUserRoutines(newUserRoutines)
        saveItem('userRoutines', newUserRoutines)
    }
    //-------------------------------------------------------
    

    //--------------------EXERCISE CARD----------------------

    const [showBenefits, setShowBenefits] = useState(false)
    const [showEquipment, setShowEquipment] = useState(false)

    //-------------------------------------------------------

    //-------------------CREATE_ROUTINE----------------------
    //List of exercises when creating a routine
    const [exercisesList, setExercisesList] = useState([])

    //Routine that will be created
    const [routineToCreate, setRoutineToCreate] = useState({})

    //To change between update functions and create functions
    const [isBeingUpdated, setIsBeingUpdated] = useState(false)

    const resetCreateRoutine = () => {
        setExercisesList([])
        setRoutineToCreate({})
        setIsBeingUpdated(false)
        const nameInput = document.getElementById('create-routine__name-input')
        const descriptionInput = document.getElementById('create-routine__description-input')
        if(nameInput && descriptionInput){
            nameInput.value = ''
            descriptionInput.value = ''
        }
    }
    const setNewRoutineName = (name) => {
        setRoutineToCreate(CreateRoutine.changeName(routineToCreate, name))
    }

    const setNewRoutineDescription = (description) => {
        setRoutineToCreate(CreateRoutine.changeDescription(routineToCreate, description))
    }

    const autogenerateRoutineTimer = () => {
        setRoutineToCreate(CreateRoutine.autogenerateTimer(routineToCreate, exercisesList))
    }

    const removeExerciseFromList = (exercise) => {
        setExercisesList(CreateRoutine.removeExercise(exercisesList, exercise))
        setRoutineToCreate(CreateRoutine.removeExerciseSteps(routineToCreate, exercise))
    }

    const addStep = (newExercise) => {
        setRoutineToCreate(CreateRoutine.addStep(routineToCreate, newExercise))
    }
    const changeStepOrder = (stepOneIndex, stepTwoIndex) => {
        const updatedRoutine = {
            ...routineToCreate,
            timer: {
                ...routineToCreate.timer,
                steps: CreateRoutine.interchangeSteps(routineToCreate.timer.steps, stepOneIndex, stepTwoIndex)
            }
        }
        setRoutineToCreate(updatedRoutine)
    }
    const changeStepName = (name, prename) => {
        CreateRoutine.changeStepName(routineToCreate, name, prename)
    }
    const deleteStep = (stepIndex) => {
        setRoutineToCreate(CreateRoutine.deleteStep(routineToCreate, stepIndex))
    }

    const initializeCustomTimer = () => {
        setRoutineToCreate(CreateRoutine.generateCustomTimer(routineToCreate))
    }
    const saveNewRoutine = () => {
        const allowRepeatedName = false
        const newRoutine = CreateRoutine.verifyRoutine(routineToCreate, exercisesList, userRoutines, allowRepeatedName)
        if(newRoutine.valid){
            addToUserRoutines(newRoutine.routineInfo)
        }
        return newRoutine
    }
    const editRoutine = () => {
        const allowRepeatedName = true
        const updatedRoutine = CreateRoutine.verifyRoutine(routineToCreate, exercisesList, userRoutines, allowRepeatedName)
        if(updatedRoutine.valid){
            editUserRoutine(updatedRoutine.routineInfo)
        }
        return updatedRoutine
    }
    const loadRoutineToEdit = (routineId) => {
        let routineToEdit
        if(routineId){
            routineToEdit = userRoutines.find(routine => routine.id === routineId)
        }else{
            const lastIndex = userRoutines.length - 1
            routineToEdit = userRoutines.find((routine, index) => index === lastIndex)
        }
        setRoutineToCreate({
            ...routineToEdit,
            timer: {
                ...routineToEdit.timer
            }
        })
        setExercisesList(routineToEdit.exercises.map(exercise => {
            let searchExercise = exercises.find(item => item.name === exercise)
            if(searchExercise){
                return searchExercise
            }
            return {
                name: exercise,
                suggestedSeries: 1,
                suggestedTime: [0,0,45]
            }
        }))
    }

    //Logic to filter exercises
    const [filteredExercises, setFilteredExercises] = useState([])
    const [searchExerciseByName, setSearchExerciseByName] = useState('')
    const [searchExerciseByCategory, setSearchExerciseByCategory] = useState('')

    useEffect(()=>{
        setFilteredExercises([...exercises])
    },[exercises])

    useEffect(()=>{
        let filterResult = [...exercises]
        if(searchExerciseByName !== ''){
            const fuse = new Fuse(exercises, fuseOptions)
            const search = fuse.search(searchExerciseByName).map(res => res.item)
            filterResult = search
        }
        if(searchExerciseByCategory !== ''){
            filterResult = filterResult.filter(exercise => exercise.category === searchExerciseByCategory)
        }
        setFilteredExercises(filterResult)
    },[searchExerciseByName, searchExerciseByCategory, exercises])
    //-------------------------------------------------------
    
    //-----------------------TrainRoutine------------------------
        const [routineToTrain, setRoutineToTrain] = useState(null)
    //-------------------------------------------------------
    return (
        <GeneralContext.Provider value={{
            saveItem,
            getItem,
            routines,
            exercises,
            selectedRoutine,
            setSelectedRoutine,
            showRoutineDetails,
            setShowRoutineDetails,
            selectedRoutineDetails,
            setSelectedRoutineDetails,
            filteredRoutines,
            setSearchByName,
            searchByName,
            setFilterBy,
            filterBy,
            availableCategories,
            setSearchByCategory,
            searchByCategory,
            setExecuteFilters,
            equipmentOptions,
            setSearchByEquipment,
            searchByEquipment,
            setMinHrs,
            minHrs,
            setMinMinutes,
            minMinutes,
            setMinSec,
            minSec,
            setMaxHrs,
            maxHrs,
            setMaxMin,
            maxMin,
            setMaxSec,
            maxSec,
            resetFilters,
            displayNavbar,
            setDisplayNavbar,
            addToUserRoutines,
            userRoutines,
            displayExerciseDetail,
            setDisplayExerciseDetail,
            showBenefits,
            setShowBenefits,
            showEquipment,
            setShowEquipment,
            exercisesList,
            setExercisesList,
            filteredExercises,
            setSearchExerciseByName,
            setSearchExerciseByCategory,
            setNewRoutineName,
            setNewRoutineDescription,
            autogenerateRoutineTimer,
            routineToCreate,
            setRoutineToCreate,
            initializeCustomTimer,
            addStep,
            draggedItem,
            setDraggedItem,
            removeExerciseFromList,
            changeStepName,
            deleteStep,
            saveNewRoutine,
            editRoutine,
            loadRoutineToEdit,
            isBeingUpdated,
            setIsBeingUpdated,
            resetCreateRoutine,
            routineToTrain,
            setRoutineToTrain,
            currentPage,
            setCurrentPage,
            renderDetail,
            renderUserRoutineDetail,
            removeUserRoutine,
            changeStepOrder
        }}>
            {children}
        </GeneralContext.Provider>
    )
}

export {GeneralContext, GeneralProvider}