import {PieChart,Pie,Tooltip} from 'recharts'
import './UserActivity.css'

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
            <h2 className='title-2'>Activity</h2>
            <div className='activity-container'>
                <figure className='activity-chart-container'>
                    <p className='activity-chart-title'>Last routines</p>
                    <PieChart 
                     className='pie-chart'
                     width={150} height={150}>
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
                    <p className='user-data'>Current streak: <span className='data-value'>3</span></p>
                    <p className='user-data'>Favorite routine: <span className='data-value'>Routine 3</span></p>
                    <p className='user-data'>Favorite exercise: <span className='data-value'>Crunches</span></p>
                </div>
            </div>
        </div>
    )
}

export {UserActivity}