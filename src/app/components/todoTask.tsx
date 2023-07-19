import React, {useState} from "react";
import { Tile } from "@carbon/react";
import EditTask from "./editTask";
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


const TaskItem = (props:any) => {
    const {updateTask } = props
    const [editModal, toggleEditModal] = useState(false);

    const editTask = () => {
        toggleEditModal(true)
    }

    const sendDataToEditModal = () => {
        toggleEditModal(false)
    }

    const handleSubmit = (props:any) => {
        console.log('handlesubmit props', props)
        updateTask(props);
        toggleEditModal(false);
    }

    return (
        <>
        <Tile className={"individual-task"} onClick={editTask} >

           <div className="title">
             {props.props.name}

           </div>

           <hr  style={{marginTop: '5vh'}} />

           <div className='dueBy'>
            {props.props.dueBy}
           </div>

        </Tile>

        {editModal ?
            <EditTask status={editModal}
                taskObject={props.props}
                sendDataToEditModal={sendDataToEditModal}
                handleSubmit={handleSubmit}
                 />
            :
            <></>
        }
        </>
    )
}

export default TaskItem;