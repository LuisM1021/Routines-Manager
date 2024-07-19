class TrainRoutineClass{
    static getCountdown(totalTime){
        let totalSecs = 0
        totalSecs = totalTime[0] * 60 + totalTime[1] * 60 + totalTime[2]
        return totalSecs
    }
    static getCurrentTime(countdown){
        let hrs = 0, min = 0, sec = 0
        if((countdown / 60) < 1){
            sec = countdown % 60
        }else{
            sec = countdown % 60
            countdown = parseInt(countdown / 60)
            if((countdown / 60) < 1){
                min = countdown % 60
            }else{
                min = countdown % 60
                hrs = parseInt(countdown / 60)
            }
        }
        return [hrs, min, sec]
    }
    static getCurrentLap(timer, countdown){
        if(countdown === null){  
            return {
                current: 1,
                total: timer.laps
            }
        }else{
            let currentLap = timer.laps
            let warmingSecs = 0
            let prepareSecs = 0
            const findWarming = timer.steps.find(step => step.exercise === 'Warming')
            const findPrepare = timer.steps.find(step => step.exercise === 'Prepare')
            const totalLaps = timer.laps
            const totalSecs = this.getCountdown(timer.totalTime)
            if(findWarming) warmingSecs = this.getCountdown(findWarming.time)
            if(findPrepare) prepareSecs = this.getCountdown(findPrepare.time)
            let countdownWithoutWarmingAndPrepare = totalSecs - warmingSecs - prepareSecs
                
            if(countdown > 0){
                currentLap = timer.laps + 1
                if(countdown >= countdownWithoutWarmingAndPrepare){
                    currentLap = 1
                }else{
                    const totalLapSecs = countdownWithoutWarmingAndPrepare / totalLaps
                    const division = Math.ceil(countdown / totalLapSecs)
                    currentLap = currentLap - division
                }
            }
            return {
                current: currentLap,
                total: timer.laps
            } 
        }
    }
    static getNextStep(timer, currentStep){ 
        let nextStep = timer.steps.find((step, index) => index === (currentStep.index + 1))
        if(nextStep){
            return {
                step: nextStep,
                index: currentStep.index + 1,
                lap: currentStep.lap
            }
        }else{
            if(currentStep.lap < timer.laps){
                const nextStepIndex = timer.steps.findIndex(step => step.exercise !== 'Warming' && step.exercise !== 'Prepare')
                nextStep = timer.steps.find((step, index) => index === nextStepIndex)
                return {
                    step: nextStep,
                    index: nextStepIndex,
                    lap: currentStep.lap + 1
                }
            }else{
                return null
            }
        }
    }
}

export { TrainRoutineClass }