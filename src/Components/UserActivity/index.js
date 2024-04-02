import './UserActivity.css'
import {PieChart,Pie,Tooltip} from 'recharts'

function UserActivity(){
    const data01 = [
        {
          "name": "Routine 1",
          "value": 1
        },
        {
          "name": "Default routine 4",
          "value": 1
        },
        {
          "name": "Routine 3",
          "value": 1
        }
        ];
    return(
        <div className='user-activity-container'>
            <h2>Activity</h2>
            <div className='activity-container'>
                <figure>
                    <p>Last routines</p>
                    <PieChart width={150} height={150}>
                        <Pie 
                        data={data01} 
                        dataKey="value" 
                        nameKey="name"
                         cx="50%" 
                         cy="50%" 
                         outerRadius={70} 
                         fill="#24962f" 
                         />
                         <Tooltip/>
                    </PieChart>
                </figure>
                <div className='user-data-container'>
                    <p>Current streak <span>3</span></p>
                    <p>Favorite routine: <span>Routine 3</span></p>
                    <p>Favorite exercise: <span>Crunches</span></p>
                </div>
            </div>
        </div>
    )
}

export {UserActivity}