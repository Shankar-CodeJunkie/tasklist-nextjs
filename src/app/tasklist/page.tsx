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
import next from 'next';

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
        //cache-busting query param1
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            revalidate: 0,
            Cache:'no-store'
        }
        const data:Response = await fetch(`/api/gettasks?_cache=${Date.now()}`, {next: {revalidate: 60, tags: ['blog']}});
        const data1:any = await data.json();
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
            body: JSON.stringify(props),
            revalidate: 0
        };
        async function createTask() {
            const data:Response = await fetch(`/api/createtask?_cache=${Date.now()}`, requestOptions);
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
            const updateRequest:Response = await fetch(`/api/updateTask?_cache=${Date.now()}`, requestOptions);
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
            const deleteRequest:Response = await fetch(`/api/deleteTask?_cache=${Date.now()}`, requestOptions);
            const deleteResponse:any = await deleteRequest.json();
            getTasks(deleteResponse.body)
        }
        deleteTask()
    }

    

    return (
        <div>
            <Grid className={'task-page'}>
                <Column lg={13} md={{span:6}} sm={4}>
                    <h1 >Hello Shankar</h1> 
                </Column>

                <Column lg={{span:2}} md={{span:2}} sm={4} >
                            <Button style={{'backgroundColor':'#8a3ffc'}} className={"create-button"} onClick={() =>  {
                                showModal(true)
                            }}>
                                <h6>Create Task</h6>
                                </Button>
                </Column>

            
                <Column lg={4} md={8} sm={4} >
                    {
                        <Grid>
                            <Column lg={4} md={8} sm={4}>
                               <Tile className={'new-task'}>
                               <h5>New</h5> 
                               </Tile>
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
                       <Tile className={'in-progress'}>
                       <h5>In-Progress</h5>
                       </Tile>
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
                       <Tile className={'backlog'}>
                       <h5>Backlog</h5>
                       </Tile>
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
                       <Tile className={'closed'}>
                       <h5>Closed</h5>
                       </Tile>
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