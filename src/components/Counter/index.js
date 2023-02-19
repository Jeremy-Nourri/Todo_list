import './style.scss';

function Counter({ tasksList }) {

  // I want to count the number of tasks undone
  const sumOfTasksUndone = tasksList.filter((task) => task.done === false).length

  return (
    <p className="counter">Vous avez {sumOfTasksUndone} tâches à réalisées</p>
  );
}

export default Counter;
