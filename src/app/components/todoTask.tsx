import React, { useState } from "react";
import { Tile, Grid, Column, ColumnHang, Tag } from "@carbon/react";
import EditTask from "./editTask";
import { TrashCan, Calendar, DecisionTree, ExpandAll } from "@carbon/icons-react";
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


const TaskItem = (props: any) => {
    const { updateTask, deleteTask } = props
    const [editModal, toggleEditModal] = useState(false);

    const editTask = () => {
        toggleEditModal(true)
    }

    const sendDataToEditModal = () => {
        toggleEditModal(false)
    }

    const handleSubmit = (props: any) => {
        console.log('handlesubmit props', props)
        updateTask(props);
        toggleEditModal(false);
    }

    return (
        <>
            <Tile className={"individual-task"}  >
                <Grid>
                    <Column lg={4} md={8} sm={4} onClick={editTask}>

                        <div className="title">
                            {props.props.name}

                        </div>

                    </Column>

                    <Column lg={4} md={8} sm={4} >
                        {}
                       {
                        props.props.tags?.split(',').map((x:any, index:number) => {
                            console.log(x);
                            return (
                                <Tag type='red' key={index}>{x}</Tag>
                            )
                        })
                       }
                    </Column>

                    <Column lg={4} md={8} sm={4}>
                        <Grid>
                            <Column lg={1} md={1} sm={1}>

                                <ExpandAll size={20} className={'subtask'} />

                            </Column>
                            <Grid narrow condensed>
                                <Column lg={3} md={3} sm={3} style={{ 'borderRight': 'auto' }}>

                                    <div className="subtask-count">
                                        {
                                            props.props.subTasks
                                                .filter((item: any) => item.status === true)
                                                .length
                                        }/{props.props.subTasks.length}
                                    </div>

                                </Column>

                            </Grid>

                        </Grid>

                    </Column>

                    <Column lg={4} md={8} sm={4}>
                        <hr style={{ marginTop: '5vh' }} />
                    </Column>

                    <Column lg={4} md={8} sm={4}>
                        <Grid narrow>
                            <ColumnHang lg={1} md={1} sm={1}>
                                <Calendar className={"calendarIcon"} size={20} />

                            </ColumnHang>

                            <Column lg={1} md={1} sm={1}>
                                <div className='dueBy'>
                                    Due By
                                </div>

                            </Column>

                            <ColumnHang lg={2} md={2} sm={2} style={{ 'marginLeft': 'auto' }} onClick={editTask}>

                                <div className='dueBy'>
                                    {props.props.dueBy}
                                </div>
                            </ColumnHang>
                            <Column lg={1} md={1} sm={1}>
                                <div className='delete-task'>
                                    <TrashCan size={20} onClick={() => {
                                        deleteTask(props.props._id)

                                    }} />
                                </div>
                            </Column>


                        </Grid>
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