'use client'
import Image from 'next/image'
//import styles from './../page.module.css';
import { useState, useEffect} from 'react';
import '../../../src/app/styles.scss';
import {Grid, Row, Column, Tile, Button} from '@carbon/react';
import { Add } from '@carbon/icons-react';
import TaskItem from '../components/todoTask';
import CreateTask from '../components/addTask';
import EditTask from '../components/editTask';

type taskItem = {
   name: string
}

type taskResponse = {
    body: []
}

interface taskItem1 {
    name: string | null;
    taskStatus: string | null;
}

export default function TaskList() {

    const [tasks, getTasks] = useState<Array<taskItem1>>([{name:'', taskStatus:''}]);
    const [modal, showModal] = useState(false);
    const [editModal, toggleEditModal] = useState(false);
    useEffect(() => {
      async function fetchData()  {
        const data:Response = await fetch('/api/gettasks');
        const data1:any = await data.json();
        //console.log('mongodb response', data1);
        getTasks(data1.body)
      }
      fetchData();

    }, [])

    const sendStatusToParent = (props:any) => {
        showModal(false)
    }

    const addTask = (props:any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(props)
        };
        async function createTask() {
            const data:Response = await fetch('/api/createtask', requestOptions);
            const data1:any = await data.json();
            getTasks(data1.body)
        }
        createTask();

        showModal(false);
    }

    const updateTask = (props:any) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(props)
        }
        async function updateTask() {
            const updateRequest:Response = await fetch('/api/updateTask', requestOptions);
            const updateResponse:any = await updateRequest.json();
            getTasks(updateResponse.body);
        }
        updateTask();
    }

    const deleteTask = (props:any) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(props)
        }
        async function deleteTask() {
            const deleteRequest:Response = await fetch('/api/deleteTask', requestOptions);
            const deleteResponse:any = await deleteRequest.json();
            getTasks(deleteResponse.body)
        }
        deleteTask()
    }

    

    return (
        <div>
            <Grid >
                <Column lg={8} md={{span:4}} sm={4}>
                    <h1 >Hello Shankar</h1> 
                </Column>

                <Column lg={8} md={{span:4}} sm={4} >
                            <Button className={"create-button"} onClick={() =>  {
                                showModal(true)
                            }}>
                                <h6>Create Task</h6>
                                </Button>
                </Column>

            
                <Column lg={4} md={8} sm={4} >
                    {
                        <Grid>
                            <Column lg={4} md={4} sm={4}>
                               <h5>New</h5> 
                            </Column>
                            
                            <Column lg={4} md={8} sm={4}>
                            {
                               tasks.filter(x => x.taskStatus === 'New')
                               .map((x, index) => {
                                 return <TaskItem props={x} key={index} updateTask={updateTask} deleteTask={deleteTask}/>
                               })
                            }
                            
                            
                            </Column>
                        </Grid>
                    }


                </Column>

                <Column lg={4} md={8} sm={4}>
                {
                       <div >
                       <h5>In-Progress</h5>
                       {
                          tasks.filter(x => x.taskStatus === 'InProgress')
                          .map((x, index) => {
                            return <TaskItem props={x} key={index} updateTask={updateTask} deleteTask={deleteTask} />
                          })
                       }
                   </div>
                    }
                    
                </Column>

                <Column lg={4} md={8} sm={4}>
                <div >
                       <h5>Backlog</h5>
                       {
                          tasks.filter(x => x.taskStatus === 'Backlog')
                          .map((x, index) => {
                            return <TaskItem props={x} key={index} updateTask={updateTask} deleteTask={deleteTask} />
                          })
                       }
                   </div>
                    
                </Column>

                <Column lg={4} md={8} sm={4}>
                <div >
                       <h5>Closed</h5>
                       {
                          tasks.filter(x => x.taskStatus === 'Closed')
                          .map((x, index) => {
                            return <TaskItem props={x} key={index} updateTask={updateTask} deleteTask={deleteTask}/>
                          })
                       }
                   </div>
                    
                </Column>

                <Column lg={4} md={8} sm={4}>
                    {
                        modal ?
                            <CreateTask status={true} updateStatus={sendStatusToParent} saveTask={addTask}  /> : ''
                    }
                    
                </Column>

               
            </Grid>
        </div>
    )
}