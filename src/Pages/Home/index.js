import {RoutinesPanel} from "../../Components/RoutinesPanel"
import { UserActivity } from "../../Components/UserActivity"
import {UserRoutines} from "../../Components/UserRoutines"
import {Layout} from "../../Components/Layout"
import './Home.css'
function Home(){
    return(
        <Layout>
            <div className="content">
                <h1>ROUTINE MANAGER</h1>
                <RoutinesPanel/>
                <div className="user-content">
                <UserRoutines/>
                <UserActivity/>
                </div>
            </div>
        </Layout>
    )
}
export {Home}