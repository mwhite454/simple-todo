import React from 'react';
import moment from 'moment';

function findTopics(string){
  let arr = string.split(' ')
                  .filter((x)=>{
                    if(x.includes('#')){
                      return x;
                    }
                  })
  return arr;
}

function stripHashTags(string){
  let clean = string.split(' ')
                  .filter((x)=>{
                    if(!x.includes('#')){
                      return x;
                    }
                  })
                  .join(' ');
  return clean;
}

function AddTask(props){
  function handleClick(e){
    e.preventDefault();
    let taskBar = document.getElementById('inputTask');
    let topics = findTopics(taskBar.value);
    let title = stripHashTags(taskBar.value);
    let newTask = {
      task: title,
      topics: topics,
      createDate: moment().format(),
      isDone: false
    }
    props.onClick(newTask);
    taskBar.value = '';
  }

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleClick(e);
    }
  }

  return(
      <div className='input-group'>
        <input className='form-input' type='text' id='inputTask' placeholder='New ToDo - Enter/Return to add' onKeyPress={handleKeyPress} />
        <button className='btn btn-primary input-group-btn' onClick={handleClick}>Add</button>
      </div>
  )
}

export default AddTask;
