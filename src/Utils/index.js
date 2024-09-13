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
        {
          id: 1,
          name: 'Full Body Blast',
          description: 'A complete full-body routine targeting strength and endurance.',
          category: 'Mixed',
          equipment: 'Yes',
          exercises: ['Squats', 'Deadlifts', 'Plank'],
          series: [4, 3, 3],
          reps: [10, 5, 1],
          time: [[0, 0, 0], [0, 0, 0], [0, 0, 40]]
        },
        {
          id: 2,
          name: 'Core Strength Builder',
          description: 'Strengthen your core with these effective exercises.',
          category: 'Bodyweight',
          equipment: 'No',
          exercises: ['Crunches', 'Plank', 'Russian twists'],
          series: [3, 2, 4],
          reps: [15, 1, 12],
          time: [[0, 0, 0], [0, 0, 50], [0, 0, 0]]
        },
        {
          id: 3,
          name: 'Leg Day Power',
          description: 'Focus on lower body strength with a mix of bodyweight and weight exercises.',
          category: 'Gym',
          equipment: 'Yes',
          exercises: ['Squats', 'Leg press', 'Lunges'],
          series: [4, 3, 3],
          reps: [12, 10, 15],
          time: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
          id: 4,
          name: 'Endurance Cardio',
          description: 'Boost your cardio endurance with these intense movements.',
          category: 'Mixed',
          equipment: 'Optional',
          exercises: ['Running', 'Cycling', 'Crunches'],
          series: [1, 1, 3],
          reps: [1, 1, 20],
          time: [[0, 30, 0], [0, 40, 0], [0, 0, 0]]
        },
        {
          id: 5,
          name: 'Upper Body Strength',
          description: 'Develop strength in your upper body with a combination of compound exercises.',
          category: 'Gym',
          equipment: 'Yes',
          exercises: ['Bench press', 'Pull ups', 'Dumbbell shoulder press'],
          series: [3, 4, 3],
          reps: [8, 5, 12],
          time: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
          id: 6,
          name: 'HIIT Power Routine',
          description: 'A high-intensity interval routine designed to burn fat and build muscle.',
          category: 'Mixed',
          equipment: 'No',
          exercises: ['Jumping jacks', 'Running', 'Push ups'],
          series: [3, 1, 4],
          reps: [20, 1, 12],
          time: [[0, 0, 0], [0, 25, 0], [0, 0, 0]]
        },
        {
          id: 7,
          name: 'Bodyweight Basics',
          description: 'A simple bodyweight routine targeting all major muscle groups.',
          category: 'Bodyweight',
          equipment: 'No',
          exercises: ['Push ups', 'Squats', 'Crunches'],
          series: [3, 3, 3],
          reps: [12, 15, 20],
          time: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
          id: 8,
          name: 'Functional Fitness Routine',
          description: 'This routine focuses on improving functional strength and mobility.',
          category: 'Mixed',
          equipment: 'Optional',
          exercises: ['Lunges', 'Running', 'Russian twists'],
          series: [3, 1, 4],
          reps: [10, 1, 15],
          time: [[0, 0, 0], [0, 20, 0], [0, 0, 0]]
        },
        {
          id: 9,
          name: 'Explosive Power',
          description: 'A power-focused routine designed to increase explosive strength.',
          category: 'Gym',
          equipment: 'Yes',
          exercises: ['Squats', 'Bench press', 'Deadlifts'],
          series: [4, 3, 3],
          reps: [8, 6, 5],
          time: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
        },
        {
          id: 10,
          name: 'Quick Core Burner',
          description: 'A quick but intense routine targeting the core muscles.',
          category: 'Bodyweight',
          equipment: 'No',
          exercises: ['Plank', 'Crunches', 'Russian twists'],
          series: [3, 3, 4],
          reps: [1, 15, 12],
          time: [[0, 0, 30], [0, 0, 0], [0, 0, 0]]
        },
        {
            id: 11,
            name: 'Strength Circuit',
            description: 'A strength-building circuit to work all major muscle groups.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Squats', 'Deadlifts', 'Pull ups', 'Bench press'],
            series: [3, 3, 4, 3],
            reps: [8, 5, 5, 8],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 12,
            name: 'Total Body Burn',
            description: 'Burn fat and build muscle with this intense full-body routine.',
            category: 'Mixed',
            equipment: 'No',
            exercises: ['Push ups', 'Crunches', 'Running', 'Lunges', 'Squats'],
            series: [3, 3, 1, 4, 3],
            reps: [10, 15, 1, 12, 10],
            time: [[0, 0, 0], [0, 0, 0], [0, 20, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 13,
            name: 'Cardio Max',
            description: 'Maximize your cardio endurance with this high-intensity routine.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Cycling', 'Jumping jacks', 'Plank', 'Crunches'],
            series: [1, 1, 3, 3, 3],
            reps: [1, 1, 20, 1, 15],
            time: [[0, 25, 0], [0, 30, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0]]
          },
          {
            id: 14,
            name: 'Upper Body Strength Builder',
            description: 'Focus on upper body strength with this challenging routine.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Bench press', 'Dumbbell shoulder press', 'Pull ups', 'Crunches'],
            series: [3, 3, 4, 3],
            reps: [8, 12, 6, 20],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 15,
            name: 'Legs and Core Focus',
            description: 'Build strength in your legs and core with these exercises.',
            category: 'Bodyweight',
            equipment: 'No',
            exercises: ['Squats', 'Lunges', 'Plank', 'Crunches', 'Russian twists'],
            series: [3, 3, 3, 4, 4],
            reps: [15, 12, 1, 15, 12],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 45], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 16,
            name: 'Ultimate Cardio Blast',
            description: 'An intense cardio routine designed for maximum calorie burn.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Cycling', 'Jumping jacks', 'Lunges', 'Crunches', 'Plank'],
            series: [1, 1, 3, 3, 3, 3],
            reps: [1, 1, 20, 15, 15, 1],
            time: [[0, 20, 0], [0, 30, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 45]]
          },
          {
            id: 17,
            name: 'Full Body Functional Strength',
            description: 'A functional strength routine for full-body conditioning.',
            category: 'Mixed',
            equipment: 'Yes',
            exercises: ['Deadlifts', 'Squats', 'Dumbbell shoulder press', 'Pull ups', 'Crunches'],
            series: [3, 3, 3, 4, 3],
            reps: [8, 12, 10, 5, 20],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 18,
            name: 'Cardio and Strength Mix',
            description: 'Alternate between cardio and strength exercises for maximum effect.',
            category: 'Mixed',
            equipment: 'Yes',
            exercises: ['Running', 'Deadlifts', 'Squats', 'Push ups', 'Bench press', 'Plank'],
            series: [1, 3, 3, 3, 3, 1],
            reps: [1, 8, 12, 10, 8, 1],
            time: [[0, 30, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 45]]
          },
          {
            id: 19,
            name: 'Full Body Endurance',
            description: 'Improve endurance with this full-body routine.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Squats', 'Lunges', 'Crunches', 'Running', 'Plank'],
            series: [4, 4, 3, 1, 3],
            reps: [10, 12, 20, 1, 1],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 25, 0], [0, 0, 40]]
          },
          {
            id: 20,
            name: 'Push-Pull Combo',
            description: 'Alternate between pushing and pulling movements for a balanced workout.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Push ups', 'Pull ups', 'Deadlifts', 'Dumbbell shoulder press'],
            series: [3, 4, 3, 3],
            reps: [12, 5, 8, 10],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 21,
            name: 'Cardio Crusher',
            description: 'Burn calories with this high-energy cardio routine.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Cycling', 'Jumping jacks', 'Lunges', 'Crunches', 'Plank', 'Squats'],
            series: [1, 1, 3, 3, 4, 3, 3],
            reps: [1, 1, 25, 12, 20, 1, 12],
            time: [[0, 30, 0], [0, 40, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 45], [0, 0, 0]]
          },
          {
            id: 22,
            name: 'Functional Strength Routine',
            description: 'Work on functional strength with these bodyweight and weight exercises.',
            category: 'Mixed',
            equipment: 'Yes',
            exercises: ['Squats', 'Push ups', 'Lunges', 'Crunches', 'Plank', 'Deadlifts', 'Dumbbell shoulder press'],
            series: [4, 3, 3, 3, 3, 3, 3],
            reps: [10, 12, 10, 15, 1, 5, 12],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 30], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 23,
            name: 'Strength and Conditioning',
            description: 'A complete strength and conditioning routine to work all muscle groups.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Deadlifts', 'Pull ups', 'Dumbbell shoulder press', 'Bench press', 'Crunches', 'Squats'],
            series: [3, 4, 3, 3, 3, 3],
            reps: [8, 5, 10, 8, 20, 12],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 24,
            name: 'Cardio Strength Combo',
            description: 'Alternate between cardio and strength for a balanced workout.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Push ups', 'Pull ups', 'Deadlifts', 'Squats'],
            series: [1, 3, 4, 3, 3],
            reps: [1, 12, 5, 8, 10],
            time: [[0, 20, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 25,
            name: 'Bodyweight HIIT',
            description: 'A high-intensity interval training routine using just your bodyweight.',
            category: 'Bodyweight',
            equipment: 'No',
            exercises: ['Jumping jacks', 'Burpees', 'Squats', 'Push ups', 'Lunges', 'Plank'],
            series: [3, 3, 4, 3, 4, 1],
            reps: [20, 12, 12, 15, 10, 1],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 45]]
          },
          {
            id: 26,
            name: 'Endurance Builder',
            description: 'Build endurance with this long, steady-paced workout.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Cycling', 'Jumping jacks', 'Squats', 'Plank'],
            series: [1, 1, 4, 3, 3],
            reps: [1, 1, 30, 10, 1],
            time: [[0, 30, 0], [0, 30, 0], [0, 0, 0], [0, 0, 0], [0, 0, 45]]
          },
          {
            id: 27,
            name: 'Lower Body Power',
            description: 'Focus on lower body strength with this routine.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Squats', 'Deadlifts', 'Lunges', 'Leg press', 'Calf raises'],
            series: [3, 3, 3, 3, 3],
            reps: [12, 8, 12, 8, 15],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 28,
            name: 'Push Pull Strength',
            description: 'A push-pull split for maximum strength gains.',
            category: 'Gym',
            equipment: 'Yes',
            exercises: ['Push ups', 'Pull ups', 'Bench press', 'Deadlifts', 'Crunches'],
            series: [3, 4, 3, 3, 3],
            reps: [12, 5, 8, 8, 20],
            time: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 29,
            name: 'Full Body Sweat',
            description: 'A sweat-inducing full-body routine to burn fat and build endurance.',
            category: 'Mixed',
            equipment: 'Optional',
            exercises: ['Running', 'Squats', 'Push ups', 'Plank', 'Crunches', 'Jumping jacks'],
            series: [1, 3, 3, 1, 3, 3],
            reps: [1, 15, 10, 1, 20, 25],
            time: [[0, 20, 0], [0, 0, 0], [0, 0, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0]]
          },
          {
            id: 30,
            name: 'Core and Stability',
            description: 'Focus on core strength and stability with these exercises.',
            category: 'Bodyweight',
            equipment: 'No',
            exercises: ['Plank', 'Russian twists', 'Crunches', 'Leg raises', 'Side plank'],
            series: [1, 3, 3, 3, 1],
            reps: [1, 12, 20, 15, 1],
            time: [[0, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 1, 0]]
          }
      ];
      
    const exercises = [
        {id: 1,name:'Walking',description:' Search for a wide place to walk and do it at a constant rhytm moving your arms following your steps to generate a complete motion of your body',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Relaxing','Energy'],benefit:['Improves cardiovascular health','Reduces stress and anxiety','Increases energy levels']},requireEquipment:'No',equipment:null,suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,30,0],imgPath:'/pics/exerciseImgs/walking.jpg'},
        {id: 2,name:'Push ups',description:' A traditional push-up is a bodyweight exercise targeting the upper body, engaging chest, shoulders, and triceps, performed by lowering and raising the body using arm strength',category:'Strength',muscularGroup:'Upper body',benefits:{category:['Strength','General health','Endurance'],benefit:['Strengthen the chest, shoulders and arms',' Promote better posture',' Increase overall upper body strenght and endurance']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/push-ups.jpg'},
        {id: 3,name:'Running',description:' Engage in continuous running at a moderate to high intensity, focusing on maintaining proper form and breathing rhythm',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Burn calories','General health'],benefit:['Improves cardiovascular fitness',' Burns calories',' Boosts mood and mental clarity']},requireEquipment:'No',equipment:null,suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,20,0],imgPath:'/pics/exerciseImgs/running.jpg'},
        {id: 4,name:'Squats',description:' Stand with feet shoulder-width apart, lower hips down and back as if sitting into a chair, keeping chest up and knees behind toes, then return to standing position',category:'Strength',muscularGroup:'Lower body',benefits:{category:['Strength','Balance','Stability'],benefit:['Strengthens lower body muscles (quadriceps, hamstrings, glutes)',' Improves balance and mobility',' Enhances core stability']},requireEquipment:'Optional',equipment:{category:'Bar',name:'Bar with disks',suggestedWeight:15},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/squats.jpg'},
        {id: 5,name:'Cycling',description:' Ride a bicycle at a steady pace, adjusting resistance as needed, focus on maintaining proper form and breathing',category:'Cardiovascular',muscularGroup:'Legs',benefits:{category:['Strength','Endurance','Low impact'],benefit:['Strengthens leg muscles',' Increases cardiovascular endurance',' Low-impact exercise reduces stress on joints']},requireEquipment:'Yes',equipment:{category:'Bicycle',name:'Bycicle',suggestedWeight:null},suggestedSeries:1,suggestedReps:'1',suggestedTime:[0,30,0],imgPath:'/pics/exerciseImgs/cycling.jpg'},
        {id: 6,name:'Pull ups',description:' Hang from a bar with hands shoulder-width apart, pull body up until chin clears the bar, then lower back down with control',category:'Strength',muscularGroup:'Upper body',benefits:{category:['Strength','Strength','Definition'],benefit:['Builds upper body strength (back, shoulders, arms)','Improves grip strength',' Enhances upper body muscle definition']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar to hang',suggestedWeight:null},suggestedSeries:3,suggestedReps:'5-8',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/pull-ups.jpg'},
        {id: 7,name:'Lunges',description:' Step forward with one leg, lowering hips until both knees are bent at 90-degree angles, then push back to starting position and repeat on the other leg',category:'Strength',muscularGroup:'Lower body',benefits:{category:['Strength','Balance','Flexibility'],benefit:['Strengthens lower body muscles (quadriceps, hamstrings, glutes)',' Improves balance and stability',' Enhances hip flexibility']},requireEquipment:'Optional',equipment:{category:'Bell',name:'Two bells',suggestedWeight:10},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/lunges.jpg'},
        {id: 8,name:'Jumping jacks',description:' Start with feet together and arms at sides, jump up while spreading legs and raising arms overhead, then return to starting position',category:'Cardiovascular',muscularGroup:'Full body',benefits:{category:['Cardiovascular health','Burn calories','General health'],benefit:['Improves cardiovascular fitness',' Burns calories',' Engages multiple muscle groups']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'30-60',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/jumping-jacks.png'},
        {id: 9,name:'Plank',description:' Start in a push-up position, lower body to elbows and hold a straight line from head to heels, engaging core muscles',category:'Endurance',muscularGroup:'Core',benefits:{category:['Strength','General health','Balance'],benefit:['Strengthens core muscles',' Improves posture',' Enhances overall stability and balance']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'1',suggestedTime:[0,0,40],imgPath:'/pics/exerciseImgs/plank.jpg'},
        {id: 10,name:'Bench press',description:' Lie on a flat bench with feet flat on the floor, grasp the barbell with hands slightly wider than shoulder-width apart, lower bar to chest, then push back up',category:'Gym',muscularGroup:'Upper body',benefits:{category:['Strength','Endurance','Definition'],benefit:['Builds upper body strength (chest, shoulders, triceps)',' Improves muscular endurance',' Enhances chest muscle definition']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar with disks and a flat bench',suggestedWeight:15},suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/bench-press.jpg'},
        {id: 11,name:'Deadlifts',description:' Stand with feet hip-width apart, grasp barbell with hands shoulder-width apart, lower bar to floor while keeping back flat and chest up, then stand back up',category:'Strength',muscularGroup:'Posterior muscles',benefits:{category:['Strength','Strength','Strength'],benefit:['Strengthens posterior chain muscles (hamstrings, glutes, lower back)',' Enhances grip strength',' Improves overall strength and power']},requireEquipment:'Yes',equipment:{category:'Bar',name:'Bar with disks',suggestedWeight:20},suggestedSeries:3,suggestedReps:'5-8',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/deadlifts.jpg'},
        {id: 12,name:'Russian twists',description:' Sit on the floor with knees bent and feet elevated, lean back slightly, hold a weight or medicine ball with both hands, twist torso from side to side',category:'Strength',muscularGroup:'Core',benefits:{category:['Definition','Strength','Balance'],benefit:['Targets oblique muscles',' Strengthens core muscles',' Improves rotational stability and balance']},requireEquipment:'Optional',equipment:{category:'Bell',name:'Kettlebell or medicine ball',suggestedWeight:10},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/russian-twists.jpg'},
        {id: 13,name:'Leg press',description:' Sit on a leg press machine with feet shoulder-width apart on the platform,, push platform away by extending legs, then return to starting position',category:'Strength',muscularGroup:'Legs',benefits:{category:['Strength','Endurance','General health'],benefit:['Strengthens leg muscles (quadriceps, hamstrings, glutes)',' Improves lower body strength and endurance',' Reduces risk of lower body injuries']},requireEquipment:'Yes',equipment:{category:'Machine',name:'Leg press machine',suggestedWeight:45},suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/leg-press.jpg'},
        {id: 14,name:'Dumbbell shoulder press',description:' Stand with feet hip-width apart, hold dumbbells at shoulder height with palms facing forward, press weights overhead until arms are fully extended, then lower back down',category:'Strength',muscularGroup:'Shoulders',benefits:{category:['Definition','Stability','Balance'],benefit:['Targets shoulder muscles (deltoids)',' Improves shoulder strength and stability',' Enhances upper body muscular balance']},requireEquipment:'Yes',equipment:{category:'Bell',name:'Two bells',suggestedWeight:10},suggestedSeries:3,suggestedReps:'8-10',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/dumbell-shoulder-press.png'},
        {id: 15,name:'Crunches',description:' Lie on your back with knees bent and feet flat on the floor, place hands behind head, lift shoulders off the floor using abdominal muscles, then lower back down',category:'Strength',muscularGroup:'Core',benefits:{category:['Definition','Stability','Definition'],benefit:['Targets abdominal muscles (rectus abdominis)',' Improves core strength and stability',' Enhances abdominal muscle definition']},requireEquipment:'No',equipment:null,suggestedSeries:3,suggestedReps:'10-12',suggestedTime:[0,0,0],imgPath:'/pics/exerciseImgs/crunches.jpg'},
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