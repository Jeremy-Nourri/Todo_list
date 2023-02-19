/* eslint-disable linebreak-style */
// == Import npm
import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

// == Import components
import Header from 'src/components/Header';
import Form from 'src/components/Form';
import Counter from 'src/components/Counter';
import Tasks from 'src/components/Tasks';

// == Import utils
import { getId } from '../../utils/getId';

// == Import data
import tasks from 'src/data/tasks';

// == Import styles
import './styles.scss';

// == Component App
function App() {

  const [tasksList, setTaskList] = useState(tasks);
  const [maxTasks, setMaxTasks] = useState(false);

  // I want to add a task 
  const addTask = (task) => {
    const newTask = {
      id: getId(tasksList),
      text: task.text,
      done: false,
    };
    // I want to add the new task to the list
    const newTasksList = [...tasksList, newTask];
    // If the number of tasks is more than 8, 
    // I want to hide the form used to add a task
    if (newTasksList.length > 8) {
      setMaxTasks(true);
    } else {
      // else i add the task to the list
      setMaxTasks(false);
      setTaskList(newTasksList);
    }
  };

  // I want to delete a task 
  const deleteTask = (id) => {
    const taskListWithoutDeleteRow = tasksList.filter((task) => task.id !== id);
    setTaskList(taskListWithoutDeleteRow);
    // If the number of tasks is less than 8, I want to display the form to add a task
    if (taskListWithoutDeleteRow.length < 8) {
      setMaxTasks(false);
    }
  };

  // I want to toggle the done status of a task
  const toggleTask = (id) => {
    const newTasksList = [...tasksList];
    const taskToToggle = newTasksList.map((task) => {
    if (task.id === id) {
      return {
        ...task,
        done: !task.done,
      };
    }
    return task;
  });
    setTaskList(taskToToggle);
  };

  // I want to manage errors of the drag and drop (src: react-beautiful-dnd)
  const onDragEnd = (result) => {

    const { destination, source, draggableId } = result;
    // if the task is dropped outside the list
    if (!destination) {
      return;
    }
    // if the task is dropped in the same position
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const newTasksList = [...tasksList];
    // i want to remove the task from the old position
    const [movedTask] = newTasksList.splice(source.index, 1);
    // i want to add the task in the new position
    newTasksList.splice(destination.index, 0, movedTask);
    // i want to update the state
    setTaskList(newTasksList);
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Counter tasksList={tasksList}/>
        <Form 
          addTask={addTask} 
          tasksList={tasksList}
          maxTasks={maxTasks}  
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Tasks 
            tasksList={tasksList} 
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </DragDropContext>
      </main>
    </div>
  );
  
}

export default App;
