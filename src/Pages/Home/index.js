import {RoutinesPanel} from '../../Components/RoutinesPanel'
import {UserRoutines} from '../../Components/UserRoutines'
import {Layout} from '../../Components/Layout'
import './Home.css'

function Home(){
    return(
        <Layout>
            <div className='content'>
                <h1 className='title'>ROUTINE MANAGER</h1>
                <RoutinesPanel/>
                <div className='user-content'>
                    <UserRoutines/>
                </div>
            </div>
        </Layout>
    )
}
export {Home}