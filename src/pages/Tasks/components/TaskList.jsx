import React from 'react';
import TaskForm from './TaskForm';

function TaskList({ tasks, updateTaskStatus ,addTask}) {
   
  return (
    <div className="TaskList">
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            {task.status === 'waiting' && (
              <button
                onClick={() => updateTaskStatus(task.id, 'inprogress')}
              >
                Start
              </button>
            )}
            {task.status === 'inprogress' && (
              <button
                onClick={() => updateTaskStatus(task.id, 'completed')}
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
      <TaskForm addTask={addTask}/>
    </div>
  );
}

export default TaskList;
