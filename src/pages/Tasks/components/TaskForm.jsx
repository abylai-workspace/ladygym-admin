import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskStatus, setTaskStatus] = useState('waiting');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        status: taskStatus,
      };
      addTask(newTask);
      setTaskTitle('');
      setTaskStatus('waiting');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
      />
    
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
