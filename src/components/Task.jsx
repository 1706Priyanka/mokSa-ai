import { useState } from 'react';
import '../styles/Task.css';

const Task = ({ task, columnId, onMoveTask, columns }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoveTask = (targetColumnId) => {
    if (targetColumnId !== columnId) {
      onMoveTask(task.id, columnId, targetColumnId);
    }
  };

  return (
    <div className="task" onClick={() => setIsExpanded(!isExpanded)}>
      <div className="task-header">
        <h4>{task.title}</h4>
        <div className="task-actions">
          <select
            value={columnId}
            onChange={(e) => handleMoveTask(Number(e.target.value))}
            onClick={(e) => e.stopPropagation()}
          >
            {columns.map(col => (
              <option key={col.id} value={col.id}>
                Move to {col.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {isExpanded && (
        <div className="task-details">
          <p>{task.description}</p>
          <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
        </div>
      )}
    </div>
  );
};

export default Task; 