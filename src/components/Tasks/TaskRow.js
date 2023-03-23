import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsCheckCircle, BsTrash, BsPencilSquare, BsCheckSquare, BsApp } from 'react-icons/bs';
import { Draggable } from 'react-beautiful-dnd';

import './style.scss';

function TaskRow({ id, index, text, done, deleteTask, toggleTask }) {

  const [isEditing, setIsEditing] = useState(false);
  const [taskText, setTaskText] = useState(text);

  const removeRow = () => {
    deleteTask(id);
  };

  // i want to edit the task
  const editRow = () => {
    setIsEditing(!isEditing);
  };

  // i want to toggle the task
  const toggleDone = () => {
    toggleTask(id);
  };

  // i write the new text of the task selected
  const writeNewtext = (event) => {
    setTaskText(event.target.value);
  };

  // on submit, i want to update the task
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEditing(!isEditing);
  };

  return (

    // i want to make the task row draggable (src: react-beautiful-dnd)
    <Draggable draggableId={id.toString()} index={index}>

      {provided => (

        <li 
          className='task-row'
          {...provided.draggableProps} 
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >

          { isEditing ? (
            // i want to display a form if the task is being edited
            <form className='task-row__form' onSubmit={handleSubmit}>
              <input
                className='task-row__input'
                type='text'
                value={taskText}
                onChange={writeNewtext}
                maxLength="50"
              />
              <button className='task-row__button' onClick={handleSubmit}>
                <BsCheckCircle className='task-row__button-icon'/> 
                <span className='task-row__button-text'>Valider le changement de texte</span>
              </button>
            </form>

          ) : (

            // i want to display the task text if the task is not being edited
            <div className='task-row__container'>
              <p className={done === true ? 'task-row__text task-row__text--done' : 'task-row__text'} >
                {taskText}
              </p>
              
              <div className='task-row__icons-container'>

                {/* I want to change the icon depending on the done value */}
                <button className='task-row__button' >
                  { done === true ?
                    <BsCheckSquare className='task-row__button-icon task-row__button-icon--done' onClick={toggleDone} />
                  :
                    <BsApp className='task-row__button-icon task-row__button-icon--undone' onClick={toggleDone} />
                  }
                  <span className='task-row__button-text'>Tâche réalisée</span>
                </button>

                <button className='task-row__button' onClick={editRow} >
                  <BsPencilSquare className='task-row__button-icon'/> 
                  <span className='task-row__button-text'>Éditer la tâche sélectionnée</span>
                </button>

                <button className='task-row__button' onClick={removeRow}>
                  <BsTrash className='task-row__button-icon'/>
                  <span className='task-row__button-text'>Supprimer la tâche sélectionnée</span>
                </button>

              </div>
            </div>
          )}
        </li>

      )}

    </Draggable>

  );
}

// i want to check the props
TaskRow.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,  
};

export default TaskRow;
