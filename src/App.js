import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; 

function App() {
  const listItems = [ 
    { id: "1", label: "Channel One" },
    { id: "2", label: "Channel Two" },
    { id: "3", label: "Channel Three" },
    { id: "4", label: "Channel Four" },
    { id: "5", label: "Channel Five" },
  ];
  const [dragDropList, setDragDropList] = useState(listItems);

  const onDragComplete = (result) => {
    if (!result.destination) return;

    const DragMixer = [...dragDropList];


    let removedItem = DragMixer.splice(result.source.index, 1)[0];
    DragMixer.splice(result.destination.index, 0, removedItem);


    setDragDropList(DragMixer);
  };

  return (
    <div className="container">
      <div className="card">
        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided) => (
              <div
                className="drag-drop-list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {dragDropList.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.label}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="label">{item.label}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;