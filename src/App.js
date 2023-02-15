import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"; 

function App() {

const listItems = [];
for (let i = 1; i <= 10; i++) {
  listItems.push({ id: i.toString(), label: `Channel ${i}` });
}
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