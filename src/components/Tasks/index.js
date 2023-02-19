// == Import npm
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
// == Import components
import TaskRow from './TaskRow';
// == Import styles
import './style.scss';

// == Component Tasks
function Tasks({ tasksList, deleteTask, toggleTask }) {

  return ( 

    // i want to make the tasks list droppable (src: react-beautiful-dnd)
    <Droppable droppableId="column-1" > 
      {provided => ( 
        <ul 
          className="tasks-list"
          {...provided.droppableProps} 
          ref={provided.innerRef}
        >

          {/* // i do a map on the tasksList array to display each task */}
          {tasksList.map((task, index) => (
            <TaskRow
              key={task.id}
              index={index}
              deleteTask={deleteTask}
              toggleTask={toggleTask}
              {...task}
            />
          ))}
          {provided.placeholder}
        </ul>
        
      )}
    </Droppable>

    );
}

// i want to check the props
Tasks.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Tasks;
