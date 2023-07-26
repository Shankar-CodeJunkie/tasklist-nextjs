import React, { useState, useReducer } from "react";
import {
    Row,
    Modal,
    ModalHeader, ModalBody, Grid, TextInput, Column, DatePicker, DatePickerInput, Dropdown, TextArea, Checkbox} from "@carbon/react";
import {Add, TrashCan} from '@carbon/icons-react'


const CreateTask = ({...props}) => {
    const [modal, closeModal] = useState(status);
    const [notesSection, changeNotesSection] = useState();
    const [subtaskCounts, updateSubTaskCount] = useState([]);

    const initialState:any = {
        name: '',
        dueBy: new Date(Date.now()).toLocaleString('en-GB', {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }),
        taskStatus: 'New',
        subTasks: [],
        notes: [],
        tags: [],
        timestamp: Date.now()
    }

    const [modalState, dispatch] = useReducer(reducer, initialState);

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
        updateSubTaskCount([...subtaskCounts])
        dispatch({ type: 'subTasks', value: arr3 })
    }


    return (
        <>
            <Modal 
            size={'sm'}
            open={props.status}
            modalHeading="Add a task"
            modalLabel="Task Management"
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            onRequestClose={() => props.updateStatus(false)}
            onRequestSubmit={() => props.saveTask(modalState)}
            
            >

                <ModalBody>
                    <Grid>
                        <Column lg={4} md={4} sm={4}>
                            <TextInput
                                data-modal-primary-focus
                                id="text-input-1"
                                labelText="Task Name"
                                placeholder="Task Name"
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'name', value: e.target.value })}

                            />

                        </Column>

                        <Column lg={2} md={4} sm={4}>
                        <DatePicker  defaultValue={Date.now()}
                                    size="sm" dateFormat="m/d/Y" datePickerType="single" onChange={(e:any) => {
                                        let date = new Date(e);
                                        let date1 = date.toLocaleString('en-GB', {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })


                                        dispatch({ type: 'dueBy', value: date1 })
                                    }}>
                                    <DatePickerInput
                                        className={'cra-datepicker'}
                                        id="date-picker-default-id"
                                        placeholder="mm/dd/yyyy"
                                        labelText="Due By"
                                        type="text"
                                    />
                                </DatePicker>
                        </Column>
                        <Column lg={2} md={4} sm={4}>
                            <Dropdown
                                ariaLabel="Dropdown"
                                id="carbon-dropdown-example"
                                label="Choose the current status"
                                items={['New', 'InProgress', 'Backlog', 'Closed']}
                                titleText="Status"
                                direction={'bottom'}
                                itemToString={(item:any) => item}
                                onChange={(e:any) => dispatch({ type: 'taskStatus', value: e.selectedItem })}

                            />

                        </Column>
                        <Column lg={4} md={8} sm={4}>
                        <TextInput
                                data-modal-primary-focus
                                id="text-input-1"
                                labelText="Tags"
                                //defaultValue={taskObject.tags}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'tags', value: e.target.value })}
                            />
                        </Column>

                        <Column lg={4} md={4} sm={4}>

                            <legend className={'cds--label'}>Sub Tasks</legend>

                            <div onClick={() => {

                            }}>

                                <div onClick={() => {

                                }} >
                                    <Add size={16}  style={{ float: 'left' }}  onClick={() => {
                                        updateSubTaskCount([...subtaskCounts, ''])
                                        //dispatch({type:'subTasks', value: 'placeholder'})

                                    }} />

                                    <legend className={'cds--label'}>Add Sub-Tasks</legend>
                                </div>

                            </div>
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
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => dispatch({ type: 'notesSection', value: e.target.value })}
                            />
                        </Column>

                    </Grid>

                </ModalBody>

            </Modal>

        </>
    )
}

const CreateCheckBox = ({...props}) => {
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
        case 'tags': {
            let tags = [...action.value]
            return {
                ...modalState,
                tags: action.value
            }
        }
        default:
            return modalState;
    }
}

export default CreateTask;