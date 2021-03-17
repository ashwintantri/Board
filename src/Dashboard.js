import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import './App.css';
import { v4 as uuidv4 } from "uuid";

let taskList = [
  { id: uuidv4(), user: "Harvey", description:"When you're backed against the wall, break the goddamn thing down." },
  { id: uuidv4(), user: "Mike",  description:"You Put Your Interests Above Mine, And I’m Putting Them Back Up Next To Yours" },
  { id: uuidv4(), user: "Louis",description:"A weapon? They're my nail scissors you... . They're gold plated. They cost $2000.00." },
  { id: uuidv4(), user: "Jessica" , description:"When you work with tigers, once in a while they're gonna take a swipe at you."}
];

const columnList = {
  0: {
    name: "Requested",
    items: taskList
  },
  1: {
    name: "To do",
    items: []
  },
  2: {
    name: "In Progress",
    items: []
  },
  3: {
    name: "Done",
    items: []
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const containerStyle = {
   display: "flex", justifyContent: "center", height: "100%", background: "white" 
}

const columnContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const columnStyle = {
  padding: 4,
  width: 250,
  minHeight: 500
}

const taskStyle = {
  boxShadow: "0 2px 4px 0 rgba(0,0,0,0.2)",
                                      borderRadius: "6px",
                                      userSelect: "none",
                                      padding: 20,
                                      display:'flex',
                                      flexDirection:'column',
                                      margin: "0 0 5px 0",
                                      height: "fit-content",
                                      justifyContent:"space-around",
}

function Dashboard() {
  const [columns, setColumns] = useState(columnList);

  const editTasks = (e, columnIndex, taskIndex, key) => {
    const newColumns = columns;
    key == 0 ? newColumns.[columnIndex].items[taskIndex].user = e.target.value:newColumns.[columnIndex].items[taskIndex].description = e.target.value; 
    setColumns(newColumns)
  }

  return (
    <div style={containerStyle}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], columnIndex) => {
          return (
            <div
              style={columnContainerStyle}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={columnStyle}
                      >
                        {column.items.map(({ id, user, description }, index) => {
                          return (
                            <Draggable
                              disableInteractiveElementBlocking={false}
                              key={id}
                              draggableId={id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      
                                      backgroundColor: snapshot.isDragging
                                        ? "lightgrey"
                                        : "white",
                                      color: "black",
                                      ...provided.draggableProps.style,
                                      ...taskStyle
                                    }}
                                  >
                                    <textarea
                                      style={{border:"none", overflow:"hidden", fontFamily:"Arial", fontSize:"12px"}}
                                      type="text"
                                      rows={3}
                                      placeholder="Write a task name"
                                      defaultValue={description}
                                      onMouseOut={e=>editTasks(e, columnIndex, index, 1)}
                                    />
                                    <input
                                      style={{border:"none"}}
                                      type="text"
                                      placeholder="Write a task name"
                                      defaultValue={user}
                                      onMouseOut={e=>editTasks(e, columnIndex, index, 0)}
                                    />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
