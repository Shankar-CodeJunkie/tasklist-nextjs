import React from "react";
import { Tile } from "@carbon/react";
//import '../scss/styles.scss';
//import '../scss/page.module.css'


type taskItem = {
    name: string,
    taskStatus: string,
    taskNotes: [],
    subTasks: [],
    dueBy: string,
    _id: string,
}


const TaskItem = (props:taskItem) => {
    return (
        <Tile className={"individual-task"} >

           <div className="title">
             {props.props.name}

           </div>

           <hr  style={{marginTop: '5vh'}} />

           <div className='dueBy'>
            {props.props.dueBy}
           </div>

        </Tile>
    )
}

export default TaskItem;