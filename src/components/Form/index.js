import { useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';

import './style.scss';

function Form({ addTask, maxTasks }) {

  // i want to store the value of the input in a state
  const [formValue, setFormValue] = useState('');


  // i want to update the state of formValue 
  // when the input value changes
  const handleChange = (event) => {
    setFormValue(event.target.value);
  };

  // i want to add a new task when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    addTask({ text: formValue });
    setFormValue('');
  };

  return (
    <div>

      { maxTasks === false ? (
        <form className="form" onSubmit={handleSubmit} >
          <input 
            name="text"
            value={formValue}
            onChange={handleChange}
            className="form__input"
            placeholder="Ajouter une tâche - 50 caractères max"
            maxLength="50"
          />
          <button className="form__button" onClick={handleSubmit}>
            <BsPlusCircle className="form__button-icon"/>
            <span className="form__button-text">Ajouter</span>
          </button>  
        </form> 

      ) : (

          <div className='form__hide-message' >Vous avez atteint le nombre maximal de tâches</div>
      )}
      
    </div>
   
  );
}

export default Form;
