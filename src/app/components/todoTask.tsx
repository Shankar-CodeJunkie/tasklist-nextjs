import React, {useState} from "react";
import { Tile, Grid, Column } from "@carbon/react";
import EditTask from "./editTask";
import { TrashCan, Calendar } from "@carbon/icons-react";
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
    const {updateTask, deleteTask } = props
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
        <Tile className={"individual-task"}  >
             <Grid>
                <Column lg={4} md={4} sm={4} onClick={editTask}>

                    <div className="title">
                        {props.props.name}

                    </div>

                    <hr style={{ marginTop: '5vh' }} />

                    
                </Column>
                <Column lg={1} md={2} sm={1} className={'cds--grid--condensed'}>
                      <div className="calendarIcon">
                      <Calendar size={20} />
                      </div>
                      <div className='dueByText'>
                      Due
                      </div>
                      
                </Column>
                <Column lg={2} md={2} sm={2} onClick={editTask}>
                <div className='dueBy'>
                        {props.props.dueBy}
                    </div>
                </Column>
                <Column lg={1} md={1} sm={1}>
                <div className='delete-task'>
                        <TrashCan size={20} onClick={() => {
                            deleteTask(props.props._id)

                        }} />
                </div>
                </Column>
                </Grid>


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