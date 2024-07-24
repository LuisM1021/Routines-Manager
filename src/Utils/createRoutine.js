import { calculateTotalTime, getNewRoutineTimer, updateSteps, removeExerciseFromSteps } from "./"

class CreateRoutine{
    static changeName(routine, name){
        return {
            ...routine,
            name: name
        }
    }
    static changeDescription(routine, description){
        return {
            ...routine,
            description: description
        }
    }
    static autogenerateTimer(routine, exercisesList){
        const timer = getNewRoutineTimer(exercisesList)
        return{
            ...routine,
            timer: timer
        }
    }
    static generateCustomTimer(routine){
        const timer = getNewRoutineTimer([])
        return {
            ...routine,
            timer: timer
        }
    }
    static removeExercise(exercisesList, exercise){
        return exercisesList.filter(item => item.name !== exercise)
    }
    static removeExerciseSteps(routine, exercise){
        const timer = removeExerciseFromSteps(routine.timer, exercise)
        return {
            ...routine, 
            timer: timer
        }
    }
    static addStep(routine, exercise){
        const newTimer = updateSteps(routine.timer, exercise)
        return {
            ...routine, 
            timer: newTimer
        }
    }

    static changeStepName(routine, newName, oldName){
        if(routine.timer){
            return {
                ...routine,
                timer: {
                    ...routine.timer,
                    steps: routine.timer.steps.map(step => {
                        if(step.exercise === oldName){
                            return {
                                ...step,
                                exercise: newName
                            }
                        }
                        return step
                    })
                }
            }
        }
    }
    static deleteStep(routine, stepIndex){
        const newSteps = routine.timer.steps.filter((step, index)=> index !== stepIndex)
        const newTotalTime = calculateTotalTime(newSteps, routine.timer.laps)
        return {
            ...routine, 
            timer: {
                ...routine.timer,
                steps: newSteps,
                totalTime: newTotalTime
            }
        }
    }
    static verifyRoutine(routine, exercisesList, userRoutines, allowRepeatedName){
        if(exercisesList.length === 0){
            return {valid: false, error: 'EMPTY_EXERCISES_LIST'}
        }
        if(!routine.timer || routine.timer.steps.length === 0){
            return {valid: false, error: 'NO_TIMER'}
        }
        if(!routine.timer.steps.find(step => step.exercise !== 'Warming' && step.exercise !== 'Prepare')){
            return {valid: false, error: 'INVALID_STEPS'}
        }
        if(!this.verifyUseOfAllExercises(routine.timer.steps, exercisesList)){
            return {valid: false, error: 'MISSING_EXERCISES_IN_STEPS'}
        }
        if(this.verifyDuplicatedRoutineName(routine, userRoutines) && !allowRepeatedName){
            return {valid: false, error: 'DUPLICATE_NAME'}
        }
        return {
            valid: true,
            routineInfo: {
                id: routine.id || null,
                name: routine.name || null,
                description: routine.description || null,
                timer: routine.timer,
                equipment: null,
                category: 'Personalized routine',
                exercises: exercisesList.map(exercise => exercise.name),
                reps: exercisesList.map(exercise => exercise.suggestedReps || 1),
                series: exercisesList.map(exercise => exercise.suggestedSeries),
                time: exercisesList.map(exercise => exercise.suggestedTime)
            }
        }
    }
    static asignImages(timer, exercises){
        const stepsWithImages = timer.steps.map(step => {
            if(step.exercise === 'Rest'){
                return {
                    ...step,
                    img: '/pics/exerciseImgs/rest.jpg'
                }
            }
            if(step.exercise === 'Warming'){
                return {
                    ...step,
                    img: '/pics/exerciseImgs/warming.jpg'
                }
            }
            if(step.exercise === 'Prepare'){
                return {
                    ...step,
                    img: '/pics/exerciseImgs/prepare.jpg'
                }
            }
            const findExercise = exercises.find(exercise => exercise.name === step.exercise)
            if(findExercise){
                return {
                    ...step,
                    img: findExercise.imgPath
                }
            }
            return {
                ...step,
                img: null
            }
        })
        return {
            ...timer,
            steps: stepsWithImages
        }
    }
    static verifyUseOfAllExercises(steps, exercisesList){
        const areAllExercisesInSteps = exercisesList.reduce((areAll, item)=>{
            if(!areAll){
                return false
            }else{
                if(steps.find(step => step.exercise === item.name)){
                    return true
                }else return false
            }
        },true)
        return areAllExercisesInSteps
    }
    static verifyDuplicatedRoutineName(routine, userRoutines){
        return userRoutines.find(item => item.name === routine.name)
    }
    static generateId(userRoutines){
        let randomNumber = 0
        let exists
        do{
            randomNumber = Math.floor(Math.random()*(999-0))+0
            exists = userRoutines.find(routine => routine.id === randomNumber)
        }while(exists)
        return randomNumber
    }
    static interchangeSteps(steps, stepOneIndex, stepTwoIndex){
        const item1 = steps.find((step, index) => index === stepOneIndex)
        const item2 = steps.find((step, index) => index === stepTwoIndex)

        if(item1.exercise === 'Warming' || item1.exercise === 'Prepare' || item2.exercise === 'Warming' || item2.exercise === 'Prepare'){
            return steps
        }else{
            const updatedSteps = steps.map((step, index) => {
                if(index === stepOneIndex){
                    return {
                        ...steps[stepTwoIndex],
                        time: [...steps[stepTwoIndex].time]
                    }
                }
                if(index === stepTwoIndex){
                    return {
                        ...steps[stepOneIndex],
                        time: [...steps[stepOneIndex].time]
                    }
                }
                return step
            })    
            return updatedSteps
        }
    }
}

export { CreateRoutine }