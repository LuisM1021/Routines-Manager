/**
 * This function receives the routines and call the timer
 * function to return the same routines with it´s timer added
 * @param {Array} routines array with objects
 * @returns Same array with the timer added 
 */
export function getTimer(routines){
    routines.forEach(routine => {
        routine.timer = calculateTimer(routine)
    })
    return routines
}
/**
 * This function uses the data of the routine to 
 * calculate the timer with default values
 * @param {object} routine contains exercises, series, time... 
 * @returns object  routine with the timer added
 */
function calculateTimer(routine){
    const timer = {
        totalTime: [],
        laps: 1,
        steps: [
            {exercise: 'Warming', time: [0,7,0]},
            {exercise: 'Prepare',time: [0,0,15]}
        ]
    }
    routine.exercises.forEach((exercise,index)=>{
        if(routine.time[index][0]===0
        &&routine.time[index][1]===0
        &&routine.time[index][2]===0){
            for (let i = 1; i <= routine.series[index]; i++) {
                timer.steps.push(
                    {exercise: exercise,time: [0,0,25]},
                    {exercise: 'Rest',time: [0,0,30]}
                )
            }
        }else{
            for (let i = 1; i <= routine.series[index]; i++) {
                timer.steps.push(
                    {exercise: exercise,time: [routine.time[index][0],routine.time[index][1],routine.time[index][2]]},
                    {exercise: 'Rest',time: [0,1,0]}
                )
            }
        }
    })
    timer.steps.pop()
    timer.totalTime = calculateTotalTime(timer.steps, timer.laps)
    return timer
}

export function getNewRoutineTimer(exercisesList){
    const timer = {
        totalTime: [],
        laps: 1,
        steps: [
            {exercise: 'Warming', time: [0,7,0]},
            {exercise: 'Prepare',time: [0,0,15]}
        ]
    }
    exercisesList.forEach(exercise => {
        for(let i=1; i<=exercise.suggestedSeries; i++){
            let time
            if(exercise.suggestedTime[0] === 0 && exercise.suggestedTime[1] === 0 && exercise.suggestedTime[2] === 0){
                time = [0,0,45]
            }else{
                time = exercise.suggestedTime
            }
            timer.steps.push({
                exercise: exercise.name,
                time: time,
                reps: exercise.suggestedReps
            })
            timer.steps.push({exercise: 'Rest', time: [0, 0, 45]})
        }
    })
    if(timer.steps.length>2) {timer.steps.pop()}
    timer.totalTime = calculateTotalTime(timer.steps, timer.laps)
    return timer
}

export function updateSteps(oldTimer, newExercise){
    const timer = {
        totalTime: [],
        laps: 1,
        steps: []
    }
    if(oldTimer){
        timer.laps = oldTimer.laps
        timer.steps = oldTimer.steps
    }
    let time
    if(newExercise.name === 'Rest'){
        time = [0,0,45]
    }else{
        if(newExercise.suggestedTime[0] === 0 && newExercise.suggestedTime[1] === 0 && newExercise.suggestedTime[2] === 0){
            time = [0,0,45]
        }else{
            time = newExercise.suggestedTime
        }
    }
    timer.steps.push({
        exercise: newExercise.name,
        time: time,
        reps: newExercise.suggestedReps
    })
    timer.totalTime = calculateTotalTime(timer.steps, timer.laps)
    return timer
            // timer.steps.push({exercise: 'Rest', time: [0, 0, 45]})
}
export function removeExerciseFromSteps(timer, exercise){
    if(timer){
        const newSteps = timer.steps.filter(step => step.exercise !== exercise)
        const newTotalTime = calculateTotalTime(newSteps, timer.laps)
        return {
            ...timer,
            steps: newSteps,
            totalTime: newTotalTime
        }
    }
}
/**
 * This function receives step by step the routine and 
 * calculate the total time to finish it
 * @param {Array} steps contain each step of the routine 
 * @returns total time
 */
export function calculateTotalTime(steps, laps){
    let hrs= 0,min = 0,sec = 0

    //calculating only the exercises
    steps.forEach(step => {
        if(step.exercise !== 'Warming' && step.exercise !== 'Prepare'){
            hrs += step.time[0]
            min += step.time[1]
            sec += step.time[2]  
        }
    })
    hrs = hrs*laps
    min = min*laps
    sec = sec*laps

    //adding the initial steps
    steps.forEach(step => {
        if(step.exercise === 'Warming'){
            hrs += step.time[0]
            min += step.time[1]
            sec += step.time[2]
        }else if(step.exercise === 'Prepare'){
            hrs += step.time[0]
            min += step.time[1]
            sec += step.time[2]
        }
    })

    if(sec > 59){
        const addedMinutes = Math.floor(sec/60)
        min += addedMinutes
        sec = (sec%60)
    }
    if (min > 59){
        const addedHours = Math.floor(min/60)
        hrs += addedHours
        min = (min%60)
    }
    return [hrs,min,sec]
}


/**
 * This function set the data of the localStorage the first time
 */
export function initializeStorage(){
    const routines = [
        {id: 1,name: 'default routine 1',description:'Default description 1 default description 1 default description 1 default description 1 ',category:'Mixed',equipment:'Optional',exercises:['Squats','Running','Crunches'],series:[3,1,3],reps:[8,1,10],time:[[0,0,0],[0,0,0],[0,25,0]]},
        {id: 2,name: 'default routine 2',description:'Default description 2 default description 2 default description 2 default description 2 ',category:'Mixed',equipment:'Yes',exercises:['Walking','Bench press','Dumbbell shoulder press'],series:[1,2,3],reps:[1,8,10],time:[[0,30,0],[0,0,0],[0,0,0]]},
        {id: 3,name: 'default routine 3',description:'Default description 3 default description 3 default description 3 default description 3 ',category:'Mixed',equipment:'No',exercises:['Push ups','Running','Plank'],series:[3,1,3],reps:[8,1,1],time:[[0,0,0],[1,0,0],[0,0,45]]},
        {id: 4,name: 'default routine 4',description:'Default description 4 default description 4 default description 4 default description 4 ',category:'Mixed',equipment:'Yes',exercises:['Cycling','Pull ups','Lunges'],series:[1,4,3],reps:[1,3,10],time:[[0,40,0],[0,0,0],[0,0,0]]},
        {id: 5,name: 'default routine 5',description:'Default description 5 default description 5 default description 5 default description 5 ',category:'Bodyweight',equipment:'No',exercises:['Jumping jacks','Deadlifts','Crunches'],series:[3,5,3],reps:[8,1,10],time:[[0,0,0],[0,0,0],[0,0,0]]},
        {id: 6,name: 'default routine 6',description:'Default description 6 default description 6 default description 6 default description 6 ',category:'Mixed',equipment:'Yes',exercises:['Russian twists','Running','Leg press'],series:[3,1,3],reps:[8,1,10],time:[[0,0,0],[0,35,0],[0,0,0]]},
        {id: 7,name: 'default routine 7',description:'Default description 7 default description 7 default description 7 default description 7 ',category:'Mixed',equipment:'Yes',exercises:['Crunches','Running','Dumbbell shoulder press'],series:[3,1,3],reps:[8,1,9],time:[[0,0,0],[0,23,0],[0,0,0]]},
        {id: 8,name: 'default routine 8',description:'Default description 8 default description 8 default description 8 default description 8 ',category:'Bodyweight',equipment:'No',exercises:['Deadlifts','Plank','Crunches'],series:[3,2,3],reps:[8,1,10],time:[[0,0,0],[0,0,50],[0,0,0]]},
        {id: 9,name: 'default routine 9',description:'Default description 9 default description 9 default description 9 default description 9 ',category:'Gym',equipment:'Yes',exercises:['Squats','Deadlifts','Plank'],series:[3,3,3],reps:[8,5,1],time:[[0,0,0],[0,0,0],[0,0,30]]},
        {id: 10,name: 'default routine 10',description:'Default description 10 default description 10 default description 10 default description 10 ',category:'Mixed',equipment:'Yes',exercises:['Plank','Running','Deadlifts'],series:[3,1,3],reps:[1,1,10],time:[[0,0,30],[0,30,0],[0,0,0]]},
        {id: 11,name: 'default routine 11',description:'Default description 11 default description 11 default description 11 default description 11 ',category:'Gym',equipment:'Yes',exercises:['Deadlifts','Plank','Crunches'],series:[3,3,3],reps:[8,1,10],time:[[0,0,0],[0,0,40],[0,0,0]]},
        ]
    const exercises = [
        {id: 1,name:'Walking',description:' Search for a wide place to walk and do it at a constant rhytm moving your arms following your steps to generate a complete motion of your body',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Relaxing','Energy'],benefit:['Improves cardiovascular health','Reduces stress and anxiety','Increases energy levels']},requireEquipment:'No',equipment:null,suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,30,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 2,name:'Push ups',description:' A traditional push-up is a bodyweight exercise targeting the upper body, engaging chest, shoulders, and triceps, performed by lowering and raising the body using arm strength',category:'Strength',muscularGroup:'Upper body',benefits:{category:['Strength','General health','Endurance'],benefit:['Strengthen the chest, shoulders and arms',' Promote better posture',' Increase overall upper body strenght and endurance']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 3,name:'Running',description:' Engage in continuous running at a moderate to high intensity, focusing on maintaining proper form and breathing rhythm',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Burn calories','General health'],benefit:['Improves cardiovascular fitness',' Burns calories',' Boosts mood and mental clarity']},requireEquipment:'No',equipment:null,suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,20,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 4,name:'Squats',description:' Stand with feet shoulder-width apart, lower hips down and back as if sitting into a chair, keeping chest up and knees behind toes, then return to standing position',category:'Strength',muscularGroup:'Lower body',benefits:{category:['Strength','Balance','Stability'],benefit:['Strengthens lower body muscles (quadriceps, hamstrings, glutes)',' Improves balance and mobility',' Enhances core stability']},requireEquipment:'Optional',equipment:{category:'Bar',name:'Bar with disks',suggestedWeight:15},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 5,name:'Cycling',description:' Ride a bicycle at a steady pace, adjusting resistance as needed, focus on maintaining proper form and breathing',category:'Cardiovascular',muscularGroup:'Legs',benefits:{category:['Strength','Endurance','Low impact'],benefit:['Strengthens leg muscles',' Increases cardiovascular endurance',' Low-impact exercise reduces stress on joints']},requireEquipment:'Yes',equipment:{category:'Bicycle',name:'Bycicle',suggestedWeight:null},suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,30,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 6,name:'Pull ups',description:' Hang from a bar with hands shoulder-width apart, pull body up until chin clears the bar, then lower back down with control',category:'Strength',muscularGroup:'Upper body',benefits:{category:['Strength','Strength','Definition'],benefit:['Builds upper body strength (back, shoulders, arms)','Improves grip strength',' Enhances upper body muscle definition']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar to hang',suggestedWeight:null},suggestedSeries:3,suggestedReps:'5-8',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 7,name:'Lunges',description:' Step forward with one leg, lowering hips until both knees are bent at 90-degree angles, then push back to starting position and repeat on the other leg',category:'Strength',muscularGroup:'Lower body',benefits:{category:['Strength','Balance','Flexibility'],benefit:['Strengthens lower body muscles (quadriceps, hamstrings, glutes)',' Improves balance and stability',' Enhances hip flexibility']},requireEquipment:'Optional',equipment:{category:'Bell',name:'Two bells',suggestedWeight:10},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 8,name:'Jumping jacks',description:' Start with feet together and arms at sides, jump up while spreading legs and raising arms overhead, then return to starting position',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Burn calories','General health'],benefit:['Improves cardiovascular fitness',' Burns calories',' Engages multiple muscle groups']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'30-60',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 9,name:'Plank',description:' Start in a push-up position, lower body to elbows and hold a straight line from head to heels, engaging core muscles',category:'Endurance',muscularGroup:'Core',benefits:{category:['Strength','General health','Balance'],benefit:['Strengthens core muscles',' Improves posture',' Enhances overall stability and balance']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'1',suggestedTime:[0,0,40],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 10,name:'Bench press',description:' Lie on a flat bench with feet flat on the floor, grasp the barbell with hands slightly wider than shoulder-width apart, lower bar to chest, then push back up',category:'Gym',muscularGroup:'Upper body',benefits:{category:['Strength','Endurance','Definition'],benefit:['Builds upper body strength (chest, shoulders, triceps)',' Improves muscular endurance',' Enhances chest muscle definition']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar with disks and a flat bench',suggestedWeight:15},suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 11,name:'Deadlifts',description:' Stand with feet hip-width apart, grasp barbell with hands shoulder-width apart, lower bar to floor while keeping back flat and chest up, then stand back up',category:'Strength',muscularGroup:'Posterior muscles',benefits:{category:['Strength','Strength','Strength'],benefit:['Strengthens posterior chain muscles (hamstrings, glutes, lower back)',' Enhances grip strength',' Improves overall strength and power']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar with disks',suggestedWeight:20},suggestedSeries:3,suggestedReps:'5-8',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 12,name:'Russian twists',description:' Sit on the floor with knees bent and feet elevated, lean back slightly, hold a weight or medicine ball with both hands, twist torso from side to side',category:'Strength',muscularGroup:'Core',benefits:{category:['Definition','Strength','Balance'],benefit:['Targets oblique muscles',' Strengthens core muscles',' Improves rotational stability and balance']},requireEquipment:'Optional',equipment:{category:'Bell',name:'Kettlebell or medicine ball',suggestedWeight:10},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 13,name:'Leg press',description:' Sit on a leg press machine with feet shoulder-width apart on the platform,, push platform away by extending legs, then return to starting position',category:'Strength',muscularGroup:'Legs',benefits:{category:['Strength','Endurance','General health'],benefit:['Strengthens leg muscles (quadriceps, hamstrings, glutes)',' Improves lower body strength and endurance',' Reduces risk of lower body injuries']},requireEquipment:'Yes',equipment:{category:'Machine',name:'Leg press machine',suggestedWeight:45},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 14,name:'Dumbbell shoulder press',description:' Stand with feet hip-width apart, hold dumbbells at shoulder height with palms facing forward, press weights overhead until arms are fully extended, then lower back down',category:'Strength',muscularGroup:'Shoulders',benefits:{category:['Definition','Stability','Balance'],benefit:['Targets shoulder muscles (deltoids)',' Improves shoulder strength and stability',' Enhances upper body muscular balance']},requireEquipment:'Yes',equipment:{category:'Bell',name:'Two bells',suggestedWeight:10},suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        {id: 15,name:'Crunches',description:' Lie on your back with knees bent and feet flat on the floor, place hands behind head, lift shoulders off the floor using abdominal muscles, then lower back down',category:'Strength',muscularGroup:'Core',benefits:{category:['Definition','Stability','Definition'],benefit:['Targets abdominal muscles (rectus abdominis)',' Improves core strength and stability',' Enhances abdominal muscle definition']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'https://www.oncoplus.co.in/wp-content/uploads/2022/02/excercose.jpg'},
        ]
    const userExercises = []
    if(localStorage.getItem('routines')===null){
        localStorage.setItem('routines',JSON.stringify(routines))
    }
    if(localStorage.getItem('exercises')===null){
        localStorage.setItem('exercises',JSON.stringify(exercises))
    }
    if(localStorage.getItem('userRoutines')===null){
        localStorage.setItem('userRoutines',JSON.stringify(userExercises))
    }
}

export function loadAvailableCategories(routines){
    let foundedCategories = []
    routines?.forEach(routine => {
        const findCategory = foundedCategories.find(foundedCat => foundedCat === routine.category)
        if(!findCategory) foundedCategories.push(routine.category)
    })
    return foundedCategories
}

export function loadEquipmentOptions(routines){
    let foundedEquipmentOptions = []
    routines?.forEach(routine => {
        const findEquipmentOption = foundedEquipmentOptions.find(foundedEquipment => foundedEquipment === routine.equipment)
        if(!findEquipmentOption) foundedEquipmentOptions.push(routine.equipment)
    })
    return foundedEquipmentOptions
}

export function filterRoutinesByTimeRange (routines,minHrs,minMinutes,minSec,maxHrs,maxMin,maxSec){
    minHrs = parseInt(minHrs)
    minMinutes = parseInt(minMinutes)
    minSec = parseInt(minSec)
    maxHrs = parseInt(maxHrs)
    maxMin = parseInt(maxMin)
    maxSec = parseInt(maxSec)
    if(minHrs===0 && minMinutes===0 && minSec ===0 && maxHrs===0 && maxMin===0 && maxSec===0) return routines
    //Transforming to seconds
    let minTotalSecs = (minHrs*60*60) + (minMinutes*60) + minSec
    let maxTotalSecs = (maxHrs*60*60) + (maxMin*60) + maxSec
    const filteredRoutines = routines.filter(routine => {
        let routineTotalSecs = (routine.timer.totalTime[0]*60*60) + (routine.timer.totalTime[1]*60) + routine.timer.totalTime[2]
        if(routineTotalSecs>=minTotalSecs && routineTotalSecs<=maxTotalSecs) return routine
        else return null
    })
    return filteredRoutines
}