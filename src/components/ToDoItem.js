import React from 'react';

export default function ToDoItem(props){
  function handleClick(e){
    e.preventDefault();
    props.action(props.dataIndex);
  }

  const topicList = props.taskData.topics.map((x, i)=>{
    return (
      <span className='chip rounded' key={i} id={x} onClick={e => props.filter(e.target.id)}>{x}</span>
    )
  })
  return (
    <div className='tile todo rounded'>
      <div className='tile-content'>
        <p className='tile-title'>{props.taskData.task}</p>
        <p className='tile-subtitle'>{topicList}</p>
      </div>
      <div className='tile-action'>
        <button className='btn btn-primary' onClick={handleClick}>{props.taskData.isDone? 'Delete' : 'Done'}</button>
      </div>

    </div>
  )
}
