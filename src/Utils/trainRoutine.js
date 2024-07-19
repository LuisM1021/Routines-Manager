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
}

export { TrainRoutineClass }