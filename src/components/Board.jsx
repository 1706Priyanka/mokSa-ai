import Column from "./Column";
import { useState } from "react";
import '../styles/Board.css';

function Board (){
const [columns, setColumns] = useState([]);

function addColumn(){
    const newColumn = {
        id: Date.now(),
        title: "New Column",
        tasks: [],
    };
    setColumns([...columns, newColumn]);
}

    return(
        <>
        <div className="board">
      <div className="board-header">
        <h1>Task Management Board</h1>
        <button onClick={addColumn} className="add-column-btn">
          Add Column
        </button>
      </div>
      <div className="columns-container">
       <Column />
      </div>
    </div>
        </>
    )
}
export default Board;