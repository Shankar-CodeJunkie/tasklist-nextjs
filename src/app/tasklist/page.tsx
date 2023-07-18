'use client'
import Image from 'next/image'
//import styles from './../page.module.css';
import { useState, useEffect} from 'react';
import '../../../src/app/styles.scss';
import {Grid, Row, Column, Tile} from '@carbon/react';
import TaskItem from '../components/todoTask';

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
    useEffect(() => {
      async function fetchData()  {
        const data:Response = await fetch('/api/gettasks');
        const data1:any = await data.json();
        console.log('mongodb response', data1);
        getTasks(data1.body)
      }
      fetchData();

    }, [])

    return (
        <div>
            <Grid >
                <Column lg={{offset:2, span:14}} md={{offset:2, span:6}} sm={4}>
                    <h1>My Tasks</h1>
                </Column>


                <Column lg={4} md={8} sm={4}>
                    {
                        <div >
                            <h5>New</h5>
                            {
                               tasks.filter(x => x.taskStatus === 'New')
                               .map(x => {
                                console.log(x)
                                 return <TaskItem props={x} />
                               })
                            }
                        </div>
                    }


                </Column>

                <Column lg={4} md={8} sm={4}>
                {
                       <div >
                       <h5>In-Progress</h5>
                       {
                          tasks.filter(x => x.taskStatus === 'InProgress')
                          .map(x => {
                           console.log(x)
                            return <TaskItem props={x} />
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
                          .map(x => {
                           console.log(x)
                            return <TaskItem props={x} />
                          })
                       }
                   </div>
                    
                </Column>

                <Column lg={4} md={8} sm={4}>
                <div >
                       <h5>Closed</h5>
                       {
                          tasks.filter(x => x.taskStatus === 'Closed')
                          .map(x => {
                           console.log(x)
                            return <TaskItem props={x} />
                          })
                       }
                   </div>
                    
                </Column>
            </Grid>
        </div>
    )
}