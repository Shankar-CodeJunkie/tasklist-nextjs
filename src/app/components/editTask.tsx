import React, { useState, useReducer } from "react";
import {
    Row,
    Modal,
    ModalHeader, ModalBody, Grid, TextInput, Column, DatePicker, DatePickerInput, Dropdown, TextArea, Checkbox} from "@carbon/react";
import {Add, TrashCan} from '@carbon/icons-react';


const EditTask = ({...props}) => {
    const { sendDataToEditModal, timestamp, handleSubmit, subTasks, taskObject } = props
    const [subtaskCounts, updateSubTaskCount] = useState(taskObject.subTasks);

    //const [modalState, dispatch] = useReducer(reducer, editModalState);
    const [modalState, dispatch] = useReducer(reducer, taskObject);

    const removeSubtasks = (index:number) => {
        let arr1 = subtaskCounts.slice(0, index);
        let arr2 = subtaskCounts.slice(index + 1);
        let arr3 = [...arr1, ...arr2];
        updateSubTaskCount(arr3);
        dispatch({ type: 'subTasks', value: arr3 });
    };

    const addSubtasks = (index:number, item:any) => {
        console.log('coming to add an item', subtaskCounts)
        subtaskCounts[index] = item;
        updateSubTaskCount([...subtaskCounts])
        dispatch({ type: 'subTasks', value: subtaskCounts })
    }

    const updateTaskStatus = (index:number, newStatus:any) => {
        //TODO: refactor this one, bad way of updating
        let oldKey = { ...subtaskCounts[index], status: newStatus }
        let arr1 = subtaskCounts.slice(0, index);
        let arr2 = subtaskCounts.slice(index);
        let arr3 = [...arr1, ...arr2];
        arr3[index] = oldKey;
        //updateSubTaskCount([...subtaskCounts])
        dispatch({ type: 'subTasks', value: arr3 })

    }


    return (
        <>
          <Modal
                open={true}
                size={'sm'}
                modalHeading="Edit a task"
                modalLabel="Task Management"
                primaryButtonText="Save"
                secondaryButtonText="Cancel"
                onRequestClose={() => sendDataToEditModal({ status: false })}
                onRequestSubmit={() => {
                handleSubmit(modalState)
                }}

            >
                <ModalBody>
                    <Grid>
                        <Column lg={4} md={4} sm={4}>
                            <TextInput
                                data-modal-primary-focus
                                id="text-input-1"
                                labelText="Task Name"
                                defaultValue={taskObject.name}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'name', value: e.target.value })}
                            />
                        </Column>
                        <Column lg={2} md={4} sm={4}>
                            <div className={'cra-datepicker'}>
                                <DatePicker size={'sm'} datePickerType={'single'} dateFormat={'m/d/Y'} onChange={(e:any) => {
                                    let date = new Date(e);
                                    let date1 = date.toLocaleString('en-GB', {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "2-digit"
                                    })
                                    dispatch({ type: 'dueBy', value: date1 })

                                }} >
                                    <DatePickerInput
                                        id="edit-date-picker-default-id"
                                        placeholder="mm/dd/yyyy"
                                        labelText="Due By"
                                        defaultValue={taskObject.dueBy}
                                        type="text">


                                    </DatePickerInput>
                                </DatePicker>
                            </div>

                        </Column>
                        <Column lg={2} md={4} sm={4}>
                            <Dropdown
                                ariaLabel="Dropdown"
                                id="edit-status"
                                label="Choose the current status"
                                items={['New', 'InProgress', 'Backlog', 'Closed']}
                                initialSelectedItem={taskObject.taskStatus}
                                titleText="Status"
                                direction={'bottom'}
                                onChange={(e:any) => {
                                    dispatch({ type: 'taskStatus', value: e.selectedItem })
                                }}
                            />
                        </Column>

                        <Column lg={4} md={4} sm={4}>

                            <legend className={'cds--label'}>Sub Tasks</legend>

                            <Add  style={{ float: 'left' }} size={16}  onClick={() => {
                                updateSubTaskCount([...subtaskCounts, ''])
                                dispatch({type:'subTasks', value: 'placeholder'})

                            }} />

                            <legend className={'cds--label'}>Add Sub-Tasks</legend>
                        </Column>

                        <Column lg={4} md={4} sm={4}>
                            {
                                <CreateCheckBox subtaskEntries={subtaskCounts}
                                    addSubtasks={addSubtasks}
                                    removeSubtasks={removeSubtasks}
                                    updateTaskStatus={updateTaskStatus}
                                />
                            }
                        </Column>

                        <Column lg={4} md={4} sm={4}>
                            <TextArea
                                labelText={'Notes'}
                                helperText={'Insert your notes here'}
                                rows={4}
                                defaultValue={taskObject.notesSection}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'notes', value: e.target.value })}
                            />
                        </Column>
                    </Grid>
                </ModalBody>

            </Modal>

        </>
    )
}

const CreateCheckBox = ({...props}) => {
    console.log('coming to create check box', props)
    const { subtaskEntries, addSubtasks, removeSubtasks, updateTaskStatus } = props;
    const [subtasks, updatesubtasks] = useState({ index: '', status: false, name: '' });
    const [subtaskStatus, checkSubTaskstatus] = useState(false);

    return (
        <div>
            {
                subtaskEntries?.length > 0 ?
                    <div >
                        {subtaskEntries.map((item:any, index:any) => {
                            return (
                                <div className={'subtasks'} key={index} id={index} style={{ display: 'flex' }}>
                                    <Checkbox labelText={''} id={index + 1} defaultChecked={item.status} onChange={(event:any, { ...props }) => {
                                        updateTaskStatus(index, props.checked)
                                    }} />
                                    <TextInput
                                        id={index} labelText={''}
                                        size={'sm'}
                                        type={"text"}
                                        defaultValue={item.name}
                                        onChange={(e:any) => updatesubtasks({ index: index, status: subtaskStatus, name: e.target.value })}
                                        onBlur={(e:any) => addSubtasks(index, subtasks)}
                                    />
                                    <TrashCan size={16} onClick={() => removeSubtasks(index)} />
                                </div>
                            )
                        })}
                    </div>
                    : <></>
            }
        </div>
    )
}

function reducer(modalState:any, action:any) {
    switch (action.type) {
        case 'name':
            return {
                ...modalState,
                name: action.value
            }
        case 'dueBy': {
            return {
                ...modalState,
                dueBy: action.value ? action.value : new Date(Date.now()).toLocaleString('en-GB', {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                })
            }

        }
        case 'taskStatus': {
            return {
                ...modalState,
                taskStatus: action.value
            }
        }
        case 'notes': {
            return {
                ...modalState,
                notesSection: action.value
            }
        }
        case 'subTasks': {
            let arr = [...action.value]
            return {
                ...modalState,
                subTasks: arr
            }
        }
        case 'timestamp': {
            return {
                ...modalState,
                timestamp: action.value
            }
        }
        case 'notesSection': {
            return {
                ...modalState,
                notesSection: action.value
            }
        }
        default:
            return modalState;
    }
}

export default EditTask;