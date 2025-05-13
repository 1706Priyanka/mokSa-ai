import { useState, useEffect } from 'react';
import Column from './Column';
import '../styles/Board.css';

const Board = () => {
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('columns');
    return savedColumns ? JSON.parse(savedColumns) : [
      { id: 1, title: 'To Do', tasks: [] },
      { id: 2, title: 'In Progress', tasks: [] },
      { id: 3, title: 'Done', tasks: [] }
    ];
  });

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    const newColumn = {
      id: Date.now(),
      title: 'New Column',
      tasks: []
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumnTitle = (columnId, newTitle) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, title: newTitle } : col
    ));
  };

  const addTask = (columnId, task) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, { ...task, id: Date.now() }] }
        : col
    ));
  };

  const moveTask = (taskId, sourceColumnId, targetColumnId) => {
    const sourceColumn = columns.find(col => col.id === sourceColumnId);
    const task = sourceColumn.tasks.find(t => t.id === taskId);

    setColumns(columns.map(col => {
      if (col.id === sourceColumnId) {
        return {
          ...col,
          tasks: col.tasks.filter(t => t.id !== taskId)
        };
      }
      if (col.id === targetColumnId) {
        return {
          ...col,
          tasks: [...col.tasks, task]
        };
      }
      return col;
    }));
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  return (
    <div className="board">
      <div className="board-header">
        <h2>Task Management Board</h2>
        <button onClick={addColumn} className="add-column-btn">
          Add Column
        </button>
      </div>
      <div className="columns-container">
        {columns.map(column => (
          <Column
            key={column.id}
            column={column}
            onUpdateTitle={updateColumnTitle}
            onAddTask={addTask}
            onMoveTask={moveTask}
            onDeleteColumn={deleteColumn}
            columns={columns}
          />
        ))}
      </div>
    </div>
  );
};

export default Board; 