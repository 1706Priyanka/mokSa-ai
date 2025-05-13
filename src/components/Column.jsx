import { useState } from 'react';
import Task from './Task';
import '../styles/Column.css';

const Column = ({ column, onUpdateTitle, onAddTask, onMoveTask, onDeleteColumn, columns }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  const handleTitleSubmit = (e) => {
    e.preventDefault();
    onUpdateTitle(column.id, e.target.value);
    setIsEditing(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(column.id, {
        title: newTaskTitle,
        description: newTaskDescription,
        createdAt: new Date().toISOString()
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
    }
  };

  return (
    <div className="column">
      <div className="column-header">
        {isEditing ? (
          <input
            type="text"
            defaultValue={column.title}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit(e)}
            autoFocus
          />
        ) : (
          <h3 onClick={() => setIsEditing(true)}>{column.title}</h3>
        )}
        <button 
          className="delete-column-btn"
          onClick={() => onDeleteColumn(column.id)}
        >
          ×
        </button>
      </div>

      <div className="tasks-container">
        {column.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            onMoveTask={onMoveTask}
            columns={columns}
          />
        ))}
      </div>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Task description"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default Column; 