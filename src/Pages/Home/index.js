import {RoutinesPanel} from "../../Components/RoutinesPanel"
import { UserActivity } from "../../Components/UserActivity"
import {UserRoutines} from "../../Components/UserRoutines"
import './Home.css'
function Home(){
    return(
        <>
            <div className="content">
                <h1>ROUTINE MANAGER</h1>
                <RoutinesPanel/>
                <div className="user-content">
                <UserRoutines/>
                <UserActivity/>
                </div>
            </div>
        </>
    )
}
export {Home}