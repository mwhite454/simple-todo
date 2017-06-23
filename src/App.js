import React, { Component } from 'react';
import 'spectre.css';
import './App.css';
import AddTask from './components/AddTask';
import ToDoList from './components/ToDoList';
import '../node_modules/spectre.css/dist/spectre-icons.css';


function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      canStore : storageAvailable('localStorage'),
      todoList: [],
      todoneList: [],
      localStoreLength: Storage.length,
      filterTopic: null
    }
    this.addTask = this.addTask.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  addTask(task){
    let newList = this.state.todoList.slice()
    newList.push(task)
    this.setState({
      todoList: newList
    })
  }

  completeTask(index){
    let newList = this.state.todoList.slice();
    newList[index].isDone = true;
    let completedTasks = newList.slice(index, index + 1)
                                .concat(this.state.todoneList)
    newList.splice(index, 1);
     this.setState({
       todoList: newList,
       todoneList: completedTasks
     })

  }

  deleteTask(index){
    let completedTasks = this.state.todoneList.slice();
    completedTasks.splice(index, 1);
    this.setState({
      todoneList: completedTasks
    })
  }

  toggleFilter(topic){
    console.log(topic);
    let toggle = this.state.filterTopic === topic ? null : topic;
    console.log(toggle);
    this.setState({
      filterTopic: toggle
    })
  }

  render() {
    return (
      <div className="App">
          <section className='section section-header'>
            <section className='grid-header container grid-960'>
              <AddTask onClick={this.addTask}/>
            </section>
          </section>
          <div className='divider'></div>
          <section className='container grid-960 list-body'>
            <div className='columns'>
              <div className='column col-6 col-xs-12'>
                <ToDoList title='To Do'
                          filter={this.toggleFilter}
                          action={this.completeTask}
                          list={this.state.todoList.filter((x)=>{
                            if(this.state.filterTopic !== null){
                              if(x.topics.includes(this.state.filterTopic)){
                                return x;
                              }
                            } else {
                              return x;
                            }
                          })}
                           />
              </div>
              <div className='column col-6 hide-sm'>
                <ToDoList title='Done'
                          filter={this.toggleFilter}
                          action={this.deleteTask}
                          list={this.state.todoneList.filter((x)=>{
                            if(this.state.filterTopic !== null){
                              if(x.topics.includes(this.state.filterTopic)){
                                return x;
                              }
                            } else {
                              return x;
                            }
                          })} />
              </div>

            </div>
          </section>
          <footer className='bg-gray text-center'>
            <section className='section-footer'>
              Made with <a href='https://facebook.github.io/react/' >React</a> and <a href='https://picturepan2.github.io/spectre/index.html'>Spectre.css</a>
            </section>
          </footer>
      </div>
    );
  }
}

export default App;
