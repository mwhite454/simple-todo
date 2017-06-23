import React from 'react';
import ToDoItem from './ToDoItem';

export default function ToDoList(props){
  const todolist = props.list.map((x, i)=>{
    return (
      <ToDoItem key={i} taskData={x} dataIndex={i} action={props.action} filter={props.filter}/>
      );
  });

  return (
    <div className='panel'>
      <div className='panel-header text-center'>
        <div className='panel-title'>{props.title}</div>
      </div>
      <div className='divider'></div>
      <div className='panel-body'>
        {todolist}
      </div>

    </div>
  )
}
