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
    static verifyRoutine(routine, exercisesList){
        if(exercisesList.length === 0){
            return {valid: false, error: 'EMPTY_EXERCISES_LIST'}
        }
        if(!routine.timer){
            return {valid: false, error: 'NO_TIMER'}
        }
        return {
            valid: true,
            routineInfo: {
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
}

export { CreateRoutine }